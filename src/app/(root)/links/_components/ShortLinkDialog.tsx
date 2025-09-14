"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { _config } from "@/lib/_config";
import { Button } from "@/components/ui/button";
import { CheckIcon, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Whatsapp from "@/components/ui/whatsapp";
import Facebook from "@/components/ui/facebook";
import Twitter from "@/components/ui/twitter";
import LinkedIn from "@/components/ui/linkedIn";
import Telegram from "@/components/ui/telegram";

const socialShare = [
  {
    _id: "1",
    title: "WhatsApp",
    icon: Whatsapp,
    handleShare: (url: string) => {
      window.open(`https://wa.me/?text=${url}`, "_blank");
    },
  },
  {
    _id: "2",
    title: "Facebook",
    icon: Facebook,
    handleShare: (url: string) => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?&quote=${url}`,
        "_blank"
      );
    },
  },
  {
    _id: "3",
    title: "Twitter",
    icon: Twitter,
    handleShare: (url: string) => {
      window.open(`https://x.com/intent/tweet?text=${url}`, "_blank");
    },
  },
  {
    _id: "4",
    title: "LinkedIn",
    icon: LinkedIn,
    handleShare: (url: string) => {
      window.open(`https://x.com/intent/tweet?text=${url}`, "_blank");
    },
  },
  {
    _id: "5",
    title: "Telegram",
    icon: Telegram,
    handleShare: (url: string) => {
      window.open(`https://t.me/share/url&text=${url}`, "_blank");
    },
  },
];

const ShortLinkDialog = ({
  data,
  openOnMount = false,
}: {
  data: TShortLink;
  openOnMount?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();

  const router = useRouter();

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("url");
    router.replace(`?${params.toString()}`, { scroll: false });

    setOpen(false);
  };

  const handleCopyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      toast.error(
        err instanceof Error
          ? `Failed to copy link: ${err.message}`
          : "Failed to copy short link"
      );
    }
  };

  useEffect(() => {
    if (openOnMount) {
      setOpen(true);
    }
  }, [openOnMount]);

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
          <DialogContent>
            <DialogHeader className="flex flex-col items-center justify-center space-y-1">
              <DialogTitle className="text-xl">
                Your Lite Link is Here 🎉
              </DialogTitle>
              <DialogDescription>
                Share your short link wherever you want.
              </DialogDescription>
            </DialogHeader>
            <div className="border bg-p-primary-light rounded-lg flex items-center overflow-hidden shadow-sm">
              <span className="flex-1 px-2">{`${_config.backend_url}/${data?.short_link_id}`}</span>

              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() =>
                  handleCopyToClipboard(
                    `${_config.backend_url}/${data?.short_link_id}`
                  )
                }
                className={cn(
                  "cursor-pointer size-14",
                  copied
                    ? "bg-green-100 text-green-500 hover:bg-green-100 hover:text-green-500"
                    : ""
                )}>
                {copied ? (
                  <CheckIcon className="size-5" />
                ) : (
                  <Copy className="size-5" />
                )}
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialShare.map((social) => (
                <Button
                  key={social._id}
                  variant={"outline"}
                  size={"icon"}
                  onClick={() =>
                    social.handleShare(
                      `${_config.backend_url}/${data?.short_link_id}`
                    )
                  }
                  className="cursor-pointer size-12">
                  <social.icon className="size-7" />
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ShortLinkDialog;
