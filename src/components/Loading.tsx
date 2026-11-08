
import { WhiskerCIcon } from "./WhiskerCIcon";

export function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4" role="status" aria-live="polite" aria-atomic="true">
        <WhiskerCIcon size={40} />
        <div className="text-lg font-medium text-foreground">Loading...</div>
      </div>
    </div>
  );
}

export function LoadingInline() {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="flex flex-col items-center gap-2" role="status" aria-live="polite" aria-atomic="true">
        <WhiskerCIcon size={32} />
        <div className="text-sm font-medium text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}
