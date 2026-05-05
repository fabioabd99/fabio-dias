"use client";

import React from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  y?: number;
}

export default function InView({ children, delay = 0, className, as = "div", y = 24 }: Props) {
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.6, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
