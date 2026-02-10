"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  price: string;
  index: number;
}

export default function ServiceCard({
  icon: Icon,
  name,
  description,
  price,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className="group relative flex flex-col rounded-lg border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
        <Icon size={24} />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">
        {name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <p className="mt-5 font-heading text-sm font-medium text-primary">
        {price}
      </p>
      {/* Bottom border accent on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
    </motion.div>
  );
}
