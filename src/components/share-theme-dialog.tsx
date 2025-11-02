"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ColorConfig } from "@/lib/types";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { generateShareableURL, copyShareableURL } from "@/lib/url-sharing";

interface ShareThemeDialogProps {
  lightColors: Record<string, ColorConfig>;
  darkColors: Record<string, ColorConfig>;
}

export default function ShareThemeDialog({
  lightColors,
  darkColors,
}: ShareThemeDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareURL, setShareURL] = useState("");

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Generate URL when dialog opens
      const url = generateShareableURL(lightColors, darkColors);
      setShareURL(url);
      setCopied(false);
    }
  };

  const handleCopyURL = async () => {
    const success = await copyShareableURL(lightColors, darkColors);
    if (success) {
      setCopied(true);
      toast.success("Shareable link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleOpenInNewTab = () => {
    window.open(shareURL, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span>Share Theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Theme</DialogTitle>
          <DialogDescription>
            Anyone with this link can view and use your theme
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* URL Display */}
          <div className="space-y-2">
            <Label htmlFor="share-url">Shareable Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareURL}
                readOnly
                className="font-mono text-sm"
                onClick={(e) => e.currentTarget.select()}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleCopyURL}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-lg bg-muted p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">URL Length:</span>
              <span className="font-mono">{shareURL.length} characters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format:</span>
              <span>Base64 encoded</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleOpenInNewTab}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
            <Button className="flex-1" onClick={handleCopyURL}>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
          </div>

          {/* Sharing Tips */}
          <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
            <p className="font-medium">💡 Sharing Tips:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>The link contains your entire theme configuration</li>
              <li>Share on social media, forums, or with your team</li>
              <li>Recipients can instantly preview and apply your theme</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
