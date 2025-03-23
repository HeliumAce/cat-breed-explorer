
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdoptionHeader = () => {
  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to All Breeds
          </Link>
        </Button>
        
        <h1 className="text-xl font-semibold text-foreground">Adopt a Cat</h1>
        
        <div className="w-[100px]">
          {/* Spacer div for centering the title */}
        </div>
      </div>
    </header>
  );
};
