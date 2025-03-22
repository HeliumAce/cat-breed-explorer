
import { motion } from "framer-motion";

const AdoptHeader = () => {
  return (
    <header className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold tracking-tight text-foreground mb-2"
      >
        Find a Shelter to Adopt a Cat
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-xl mx-auto text-base text-muted-foreground mb-6"
      >
        Discover local animal shelters, humane societies, and adoption centers where you can find your perfect feline companion.
      </motion.p>
    </header>
  );
};

export default AdoptHeader;
