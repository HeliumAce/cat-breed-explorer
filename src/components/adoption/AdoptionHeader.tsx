
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AdoptionHeader() {
  return (
    <div className="mb-6">
      <Link to="/">
        <Button variant="ghost" size="sm" className="mb-2">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Button>
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
          Adopt a Cat
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Find animal shelters, humane societies, and pet stores near you where you can adopt a cat.
        </p>
      </motion.div>
    </div>
  );
}
