"use client"

import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactMePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <header>
          <p className="mt-2 text-center text-muted-foreground">
            Get in touch via email or X
          </p>
        </header>

        <div className="bg-secondary rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-secondary-foreground">
            Hello, I&apos;m David.
          </h2>
          <p className="text-secondary-foreground">
            I&apos;m a frontend javascript developer specializing in React and
            Next.js. With a passion for creating responsive and user-friendly
            web applications, I build cool stuff like this one : )
          </p>
          <p className="mt-4 text-secondary-foreground">
            If you have a project in mind or just want to connect, I&apos;m
            always open to new opportunities and collaborations.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            className="w-full text-lg h-14"
            onClick={() =>
              (window.location.href = "mailto:muriithid05@gmail.com")
            }
          >
            <Mail className="mr-2 h-6 w-6" />
            Send an Email
          </Button>
          <Button
            className="w-full text-lg h-14"
            onClick={() =>
              window.open(
                "https://twitter.com/messages/compose?recipient_id=1803751087003848704",
                "_blank"
              )
            }
            variant="outline"
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Send a DM on X
          </Button>
        </div>
      </div>
    </div>
  );
}
