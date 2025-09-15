import React from "react";
import ShortLinkDialog from "./ShortLinkDialog";
import { shortenLink } from "../_actions/shortenLink";

const DialogWrapper = async ({ url }: { url: string | string[] }) => {
  const data = await shortenLink(decodeURIComponent(url as string));
  const urlData = data.url;

  return <ShortLinkDialog data={urlData} openOnMount />;
};

export default DialogWrapper;
