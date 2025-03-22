import { useState, useEffect } from 'react';

interface UseScriptStatus {
  loaded: boolean;
  error: Error | null;
}

export function useScript(src: string, id?: string): UseScriptStatus {
  // Keep track of script status (loaded or error)
  const [status, setStatus] = useState<UseScriptStatus>({
    loaded: false,
    error: null
  });

  useEffect(() => {
    // Allow falsy src value if waiting on other data needed for src
    if (!src) {
      setStatus({ loaded: false, error: new Error('Script source is empty') });
      return;
    }

    // Check if the script already exists in the DOM
    const scriptId = id || `script-${src.replace(/[^a-zA-Z0-9]/g, '')}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      
      // Store status in state
      const setStateFromEvent = (event: Event) => {
        if (event.type === 'load') {
          setStatus({
            loaded: true,
            error: null
          });
        } else {
          setStatus({
            loaded: false,
            error: new Error(`Failed to load script: ${src}`)
          });
        }
      };

      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);
      
      // Add script to document body
      document.body.appendChild(script);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    } else {
      // Script already exists
      
      // If Google Maps, check if API is already loaded
      if (id === 'google-maps-script' && window.google && window.google.maps) {
        setStatus({ loaded: true, error: null });
        return;
      }
      
      // For other scripts, check if onload already fired
      if (script.hasAttribute('data-loaded')) {
        setStatus({ loaded: true, error: null });
      } else {
        // If the script is still loading, add event listeners
        const setStateFromEvent = (event: Event) => {
          if (event.type === 'load') {
            script.setAttribute('data-loaded', 'true');
            setStatus({
              loaded: true,
              error: null
            });
          } else {
            setStatus({
              loaded: false,
              error: new Error(`Failed to load script: ${src}`)
            });
          }
        };

        script.addEventListener('load', setStateFromEvent);
        script.addEventListener('error', setStateFromEvent);

        return () => {
          if (script) {
            script.removeEventListener('load', setStateFromEvent);
            script.removeEventListener('error', setStateFromEvent);
          }
        };
      }
    }
  }, [src, id]);

  return status;
}
