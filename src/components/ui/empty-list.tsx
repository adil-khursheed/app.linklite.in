"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./card";
import { LinkIcon, MousePointerClick } from "lucide-react";

const items = Array.from({ length: 3 });

const EmptyList = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  const duplicateCards = [...items, ...items];
  const cardHeight = 72;
  const totalHeight = items.length * cardHeight;

  return (
    <div className="grid w-full place-items-center">
      <div className="bg-background h-36 w-full max-w-64 overflow-hidden [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ y: [0, -totalHeight] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex flex-col px-3 [animation-duration:10s]"
        >
          {duplicateCards.map((_, i) => (
            <Card
              key={`${i}`}
              style={{ height: cardHeight - 16 }}
              className="mt-4 flex items-center rounded-xl py-3 shadow-lg"
            >
              <CardContent className="flex w-full flex-1 items-center justify-between px-3">
                <div className="flex flex-1 items-center gap-3">
                  <LinkIcon size={14} />
                  <div className="h-2 w-full max-w-28 rounded-full bg-slate-100"></div>
                </div>
                <MousePointerClick size={14} />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <h6 className="mt-5 text-center text-lg font-semibold">
        {title || "No links yet"}
      </h6>
      <p className="text-center text-sm text-neutral-500">
        {subtitle || "Start creating your links now."}
      </p>
    </div>
  );
};

export default EmptyList;
