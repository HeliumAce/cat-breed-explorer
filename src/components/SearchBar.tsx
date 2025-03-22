
import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "Search cat breeds...", className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div 
      className={`relative mx-auto w-full max-w-2xl transition-all duration-300 ${
        isFocused ? "scale-[1.02]" : ""
      } ${className}`}
    >
      <div className={`
        flex items-center h-12 w-full px-4 rounded-full
        bg-white border border-amber-100
        shadow-sm transition-shadow duration-300
        ${isFocused ? "shadow-md border-amber-200" : ""}
      `}>
        <Search 
          className={`h-5 w-5 mr-2 transition-colors duration-300 ${
            isFocused ? "text-amber-500" : "text-muted-foreground"
          }`} 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="p-1 rounded-full text-muted-foreground hover:text-foreground focus-ring"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
