"use client";

import React from "react";
import ShortLinkDialog from "./ShortLinkDialog";

const DialogWrapper = ({ data }: { data: TShortLink }) => {
  return <ShortLinkDialog data={data} openOnMount />;
};

export default DialogWrapper;
