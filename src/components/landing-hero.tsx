"use client";

import { motion } from "motion/react";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function LandingHero({ title, subtitle, children }: Props) {
  return (
    <section className="flex w-full max-w-full flex-1 flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16">
      <motion.h1
        className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="mt-3 max-w-md px-1 text-base text-muted-foreground sm:text-[length:inherit]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        className="mt-6 flex w-full max-w-md flex-wrap justify-center gap-3 px-2 sm:mt-8 sm:px-0"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
