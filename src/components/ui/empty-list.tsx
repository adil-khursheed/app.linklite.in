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
    <div className="w-full grid place-items-center">
      <div className="max-w-64 w-full h-36 overflow-hidden bg-white [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ y: [0, -totalHeight] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="flex flex-col [animation-duration:10s] px-3">
          {duplicateCards.map((_, i) => (
            <Card
              key={`${i}`}
              style={{ height: cardHeight - 16 }}
              className="rounded-xl mt-4 shadow-lg py-3 flex items-center">
              <CardContent className="px-3 flex-1 w-full flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <LinkIcon size={14} />
                  <div className="max-w-28 w-full h-2 rounded-full bg-slate-100"></div>
                </div>
                <MousePointerClick size={14} />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      <h6 className="font-semibold text-lg text-center mt-5">
        {title || "No links yet"}
      </h6>
      <p className="text-center text-sm text-neutral-500">
        {subtitle || "Start creating your links now."}
      </p>
    </div>
  );
};

export default EmptyList;
