"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import SupportDropdown from "./support";

const Faqs = () => {
  return (
    <CardContent className="w-full max-w-3xl mx-auto my-16">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to some questions
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="what-is-tonemify"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              What is Tonemify?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Tonemify is a tool designed to help users generate, prototype, and
              manage ShadCN themes effortlessly. With a user-friendly interface
              and powerful features, Tonemify allows you to fine-tune your
              themes with ease.
              <br />
              <br />
              Does what it says on the tin.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="create-theme"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              How does it work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Paste your current ShadCN theme. It will immediately update the
              color cards. Click on the cards to adjust the colors as desired
              and preview the changes you made in the components. Once
              you&apos;re satisfied with your new cool theme, save it for future
              use.
              <br />
              <br />
              You can also paste a single color to generate a theme based on
              that. It will act as the primary color.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="manage-themes"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              How can I manage my themes?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Access your saved themes to edit or delete them as needed. You can
              also export your themes directly to the clipboard in various
              formats.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="dark-mode-support"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              Does Tonemify support dark mode?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Yes, Tonemify has built-in dark mode support to ensure your themes
              look great in both light and dark environments.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="support-project"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              How can I support the project?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Tonemify is free and opensource but if you enjoy using it and want
              to support the project, you can buy me a beer (or coffee)! Click
              the link below to show your support 😊
              <div className="mt-4">
                <SupportDropdown />
              </div>
              <div className="mt-4">
                If you are a developer and would like to contribute to the
                project, feel free to check out the GitHub repository and submit
                a pull request. Your contributions are greatly appreciated!
                <Link
                  href="https://github.com/BarriosXJavier/tonemify"
                  className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/github.png"
                    alt="Contribute on GitHub"
                    className="h-6 w-6"
                    height={24}
                    width={24}
                  />
                  <span className="text-sm">Contribute on GitHub</span>
                </Link>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="open-to-work"
            className="border-primary dark:border-primary/10 rounded-lg bg-background/90 dark:bg-dark-background/90"
          >
            <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
              Are you open to work?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground px-4 leading-relaxed">
              Yes, I am open to new opportunities and collaborations. If you
              have an exciting project or job offer, feel free to reach out to
              me through my{" "}
              <Link
                href="/contact"
                className="text-primary hover:text-secondary"
              >
                contact page
              </Link>
              . I look forward to hearing from you!
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </CardContent>
  );
};

export default Faqs;
