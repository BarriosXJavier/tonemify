"use client";

import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <Card className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              About this project
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This started as a tool I needed for my own projects. The shadcn
              theme system is great, but manually adjusting HSL values and
              seeing how they work together was tedious. I made this to speed
              things up.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If it&apos;s useful to you, that&apos;s great. If something&apos;s
              broken or could be better, let me know and I&apos;ll see what I
              can do.
            </p>
          </div>

          <div className="pt-4 border-t space-y-3">
            <p className="text-sm font-medium text-foreground">Reach me:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() =>
                  (window.location.href = "mailto:muriithid05@gmail.com")
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>

              <Button
                className="flex-1"
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://x.com/messages/compose?recipient_id=1803751087003848704",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />X / Twitter
              </Button>
            </div>
          </div>
        </Card>
        <p className="text-sm text-muted-foreground text-center">
          I usually respond within a day or two.
        </p>
      </div>
    </div>
  );
}
