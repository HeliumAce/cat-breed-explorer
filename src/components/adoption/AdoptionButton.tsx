
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function AdoptionButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button 
        asChild
        className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 rounded-full px-4 py-2"
      >
        <Link to="/adopt">
          <Heart className="h-4 w-4" />
          <span>Adopt a Cat</span>
        </Link>
      </Button>
    </motion.div>
  );
}
