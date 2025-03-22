
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function AdoptButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Link to="/adopt">
        <Button className="bg-amber-600 hover:bg-amber-700 gap-2 font-medium">
          <Heart className="w-4 h-4" />
          Adopt a Cat
        </Button>
      </Link>
    </motion.div>
  );
}
