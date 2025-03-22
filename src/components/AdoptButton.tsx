
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function AdoptButton() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/adopt">
        <Button 
          className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2 rounded-full px-4 py-2"
        >
          <Heart className="h-4 w-4" />
          Adopt a Cat
        </Button>
      </Link>
    </motion.div>
  );
}
