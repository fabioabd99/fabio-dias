"use client";

import { motion } from "framer-motion";

interface Props {
  line1: string;
  line2: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const STAGGER = 0.04;

export default function AnimatedHeroTitle({ line1, line2 }: Props) {
  const dotDelay = (line1.length + line2.length) * STAGGER + 0.05;

  return (
    <h1
      className="relative uppercase text-[clamp(64px,18vw,280px)] max-md:text-[clamp(80px,24vw,280px)]"
      style={{
        fontFamily: "var(--font-archivo)",
        lineHeight: 0.85,
        letterSpacing: "-0.04em",
      }}
    >
      {/* Linha 1 */}
      <span className="md:[-webkit-text-stroke:10px_var(--color-ink)]">
        {line1.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * STAGGER, duration: 0.5, ease: EASE }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      <br />

      {/* Linha 2 + ponto */}
      <span className="text-transparent [-webkit-text-stroke:4px_var(--color-ink)] md:[-webkit-text-stroke:10px_var(--color-ink)]">
        {line2.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (line1.length + i) * STAGGER, duration: 0.5, ease: EASE }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </span>

      <motion.span
        className="text-accent italic"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: dotDelay, duration: 0.35, ease: EASE }}
        style={{ display: "inline-block" }}
      >
        .
      </motion.span>
    </h1>
  );
}
