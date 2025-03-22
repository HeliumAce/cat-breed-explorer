
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { MAPS_API_KEY } from '@/config/maps-config';
import { useToast } from '@/hooks/use-toast';

export function ApiKeyManager() {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Get stored API key on component mount
    const storedKey = localStorage.getItem('GOOGLE_MAPS_API_KEY');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('GOOGLE_MAPS_API_KEY', apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your Google Maps API key has been saved. Please refresh the page.",
        variant: "default", // Changed from "success" to "default" as it's a valid variant
      });
      setOpen(false);
      
      // Force refresh to apply the new API key
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  const clearApiKey = () => {
    localStorage.removeItem('GOOGLE_MAPS_API_KEY');
    setApiKey('');
    toast({
      title: "API Key Removed",
      description: "Your Google Maps API key has been removed.",
      variant: "default",
    });
    setOpen(false);
    
    // Force refresh to apply the change
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="fixed bottom-4 right-4 z-50 bg-white shadow-md"
        onClick={() => setOpen(true)}
      >
        {localStorage.getItem('GOOGLE_MAPS_API_KEY') ? 'Update Maps API Key' : 'Add Maps API Key'}
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Google Maps API Key</DialogTitle>
            <DialogDescription>
              Enter your Google Maps API key to enable the maps functionality.
              Make sure your API key has HTTP referrer restrictions set to the domain where you're running this app.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Google Maps API key"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              Current status: {MAPS_API_KEY && MAPS_API_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY_HERE' 
                ? <span className="text-green-500">API key found</span> 
                : <span className="text-amber-500">No valid API key</span>}
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={clearApiKey}
              disabled={!localStorage.getItem('GOOGLE_MAPS_API_KEY')}
            >
              Clear API Key
            </Button>
            <Button type="submit" onClick={saveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
