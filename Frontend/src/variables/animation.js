    // import { view } from "framer-motion";

export const motion_bottom_to_top = {
        initial: { opacity: 0, y: 10 },
        whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } ,
        viewport: { once: false, amount: 0.2 },
    };  

    
export const motion_top_to_bottom = {
    initial: { opacity: 0, y: -50 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } ,
    viewport: { once: false, amount: 0.2 },
};  

export const motion_left_to_right = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        viewport:  { once: false, amount: 0.2 },
    };

    export const motion_right_to_left = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        viewport: { once: false, amount: 0.2 },
    };

export const fadein = {
    initial: { opacity: 0, scale: 1.20 },
    whileInView: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: false, amount: 0.1 }
};

export const button_hover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.80 },
    transition: { duration: 0.2 }
};

export const sidebar = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: 0.5 }
};

export const banner = {
    animate: { y: [0, -5, 0] },
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
};

export const translate_x = {
    initial: { x: "0%" },
    animate: { x: "20%" },
    transition: { 
        duration: 2,  // Smooth transition duration
        ease: "linear", // Smooth motion
        repeat: Infinity, // Infinite loop
        repeatType: "reverse" // Wapas 0% aane ke liye
    }
};
export const placeholderAnimation = {
    animate: { x: ["0%", "100%"] }, // Move from 0% to 100%
    transition: { 
        duration: 2, 
        ease: "linear", 
        repeat: Infinity, 
        repeatType: "reverse" 
    }
};



// <motion.div
//     variants={containerVariants}
//     initial="hidden"
//     animate="visible"
//   ></motion.div>

export const containerVariants = {
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    hidden: { opacity: 0 },
  };
  
  export const itemVariants_bottom = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  

  ////////////////////////////
