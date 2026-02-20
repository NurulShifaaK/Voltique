import React from "react";
import { motion } from "framer-motion";

const Brands = () => {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/7/7e/CeraVe_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/2d/The_Ordinary_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/COSRX_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/45/La_Roche-Posay_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/2/24/Olaplex_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Eucerin_logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Neutrogena_logo.png",
  ];

  return (
    <div className="overflow-hidden bg-white py-12 mt-10">
      <h2 className="text-center text-2xl font-semibold mb-8">
        Trusted Brands
      </h2>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="brand logo"
              className="h-[60px] object-contain opacity-70 hover:opacity-100 transition duration-300"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Brands;
