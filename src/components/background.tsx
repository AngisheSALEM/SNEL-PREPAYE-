"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function DeepSpaceBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is the standard way to handle hydration in Next.js for client-only components
    // We set mounted to true after the component has mounted on the client
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#050505]" />;
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Noise Overlay */}
      <div className="noise-overlay absolute inset-0 z-0" />

      {/* Glowing Orbs */}
      <div className="absolute inset-0 z-0">
        {/* Cyan Orb */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-opere-cyan/20 rounded-full blur-[100px] opacity-50"
        />

        {/* Blue Orb */}
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 100, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-opere-blue/20 rounded-full blur-[100px] opacity-40"
        />

        {/* Emerald Orb */}
        <motion.div
          animate={{
            x: [0, 50, -100, 0],
            y: [0, 50, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[40%] right-[30%] w-[350px] h-[350px] bg-opere-emerald/20 rounded-full blur-[100px] opacity-30"
        />
      </div>
    </div>
  );
}
