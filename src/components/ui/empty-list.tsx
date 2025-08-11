"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./card";
import { LinkIcon, MousePointerClick } from "lucide-react";

const items = Array.from({ length: 5 });

const EmptyList = () => {
  return (
    <div className="w-full grid place-items-center">
      <div className="max-w-3xs w-full max-h-36 h-full overflow-hidden bg-white [mask-image:linear-gradient(transparent,black_10%,black_90%,transparent)]">
        <motion.div
          animate={{ y: "-50%" }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex flex-col space-y-3">
          {items.map((_, i) => (
            <Card key={`first-${i}`} className="py-4 rounded-md">
              <CardContent className="px-2 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <LinkIcon size={14} />
                  <div className="max-w-28 w-full h-2 rounded-full bg-slate-100"></div>
                </div>
                <MousePointerClick size={14} />
              </CardContent>
            </Card>
          ))}
          {items.map((_, i) => (
            <Card key={`second-${i}`} className="py-3 rounded-md">
              <CardContent className="px-2 flex items-center justify-between">
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

      <h6 className="font-semibold text-lg text-center mt-5">No links yet</h6>
    </div>
  );
};

export default EmptyList;
