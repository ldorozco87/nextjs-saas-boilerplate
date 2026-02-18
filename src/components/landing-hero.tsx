"use client";

import { motion } from "motion/react";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function LandingHero({ title, subtitle, children }: Props) {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
      <motion.h1
        className="text-3xl font-bold tracking-tight md:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-3 max-w-md text-muted-foreground"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
