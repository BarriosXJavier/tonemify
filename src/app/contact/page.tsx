"use client";

import { Mail, MessageCircle, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function ContactMePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 50);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !showContent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className={`text-center space-y-6 transition-opacity duration-500 ${
            !isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary animate-bounce" />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 animate-pulse">
              HTTP 200: Developer Found ✨
            </h2>

            <div className="flex justify-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: "0s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div
        className={`max-w-md w-full space-y-8 transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Card className="bg-secondary/50 backdrop-blur-sm rounded-lg p-8 shadow-xl border-2 border-secondary hover:border-primary/50 transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-secondary-foreground">
              Hey, I&apos;m David 👋
            </h2>
          </div>
          <div className="space-y-4 text-secondary-foreground">
            <p className="text-lg"></p>
            <div className="text-sm bg-muted/50 p-4 rounded-md font-mono">
              <code>currentStatus = &quot;Building cool stuff ⚡️&quot;;</code>
            </div>
            <p className="text-lg">
              Let&apos;s create something awesome together. 🚀
            </p>
          </div>
        </Card>

        <div className="space-y-4">
          <Button
            className="w-full text-lg h-14 group hover:scale-105 transition-transform duration-200"
            onClick={() =>
              (window.location.href = "mailto:muriithid05@gmail.com")
            }
          >
            <Mail className="mr-2 h-6 w-6 group-hover:animate-bounce" />
            Drop me an Email
          </Button>

          <Button
            className="w-full text-lg h-14 group hover:scale-105 transition-transform duration-200"
            onClick={() =>
              window.open(
                "https://x.com/messages/compose?recipient_id=1803751087003848704",
                "_blank"
              )
            }
            variant="outline"
          >
            <MessageCircle className="mr-2 h-6 w-6 group-hover:animate-spin" />
            DM on X
          </Button>
        </div>

        <p className="text-center text-lg text-muted-foreground animate-pulse">
          PS: On weekdays I respond faster than a useEffect cleanup function! 😉
        </p>
      </div>
    </div>
  );
}
