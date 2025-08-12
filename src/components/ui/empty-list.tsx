"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./card";
import { LinkIcon, MousePointerClick } from "lucide-react";

const items = Array.from({ length: 5 });

const EmptyList = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="w-full grid place-items-center">
      <div className="max-w-64 w-full h-36 overflow-hidden bg-white [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ y: "-50%" }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-col [animation-duration:10s] px-3">
          {items.map((_, i) => (
            <Card key={`first-${i}`} className="py-5 rounded-xl mt-4 shadow-lg">
              <CardContent className="px-3 flex items-center justify-between">
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
