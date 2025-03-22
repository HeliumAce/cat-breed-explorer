
import { Cat } from "lucide-react";

export function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Cat className="h-10 w-10 text-amber-500 animate-pulse-soft" />
        <div className="text-lg font-medium text-foreground animate-pulse-soft">Loading...</div>
      </div>
    </div>
  );
}

export function LoadingInline() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="flex flex-col items-center gap-2">
        <Cat className="h-8 w-8 text-amber-500 animate-pulse-soft" />
        <div className="text-sm font-medium text-muted-foreground animate-pulse-soft">Loading...</div>
      </div>
    </div>
  );
}
