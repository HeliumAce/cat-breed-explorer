
import { useState, useEffect } from 'react';

interface UseScriptStatus {
  loaded: boolean;
  error: Error | null;
}

export function useScript(src: string): UseScriptStatus {
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
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement;

    if (!script) {
      // Create script
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      
      // Mark when script is loaded
      script.setAttribute('data-status', 'loading');
      
      // Add script to document body
      document.body.appendChild(script);

      // Store status in state
      const setStateFromEvent = (event: Event) => {
        if (event.type === 'load') {
          script.setAttribute('data-status', 'loaded');
          script.setAttribute('data-loaded', 'true');
          setStatus({
            loaded: true,
            error: null
          });
        } else {
          script.setAttribute('data-status', 'error');
          setStatus({
            loaded: false,
            error: new Error(`Failed to load script: ${src}`)
          });
        }
      };

      script.addEventListener('load', setStateFromEvent);
      script.addEventListener('error', setStateFromEvent);

      // Remove event listeners on cleanup
      return () => {
        if (script) {
          script.removeEventListener('load', setStateFromEvent);
          script.removeEventListener('error', setStateFromEvent);
        }
      };
    } else {
      // Script already exists, check if it's already loaded
      const dataStatus = script.getAttribute('data-status');
      if (dataStatus === 'loaded' || script.getAttribute('data-loaded') === 'true') {
        setStatus({ loaded: true, error: null });
      } else if (dataStatus === 'error') {
        setStatus({ 
          loaded: false, 
          error: new Error(`Script previously failed to load: ${src}`) 
        });
      } else {
        // If the script is still loading, add event listeners
        const setStateFromEvent = (event: Event) => {
          setStatus({
            loaded: event.type === 'load',
            error: event.type === 'error' ? new Error(`Failed to load script: ${src}`) : null
          });
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
  }, [src]);

  return status;
}
