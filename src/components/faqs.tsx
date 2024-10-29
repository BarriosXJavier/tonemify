
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

const Faqs = () => {
  return (
    <CardContent className="w-full max-w-3xl mx-auto my-16">
      <Accordion type="single" collapsible className="space-y-4">
        {/* Components Preview Section */}
        <AccordionItem
          value="preview"
          className="border-primary/20 dark:border-primary/10 rounded-lg bg-background/50 dark:bg-background/20"
        >
          <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
            Components Preview
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground dark:text-muted-foreground/90 px-4 leading-relaxed">
            Explore the theming of various UI components below.
          </AccordionContent>
        </AccordionItem>

        {/* User Profile Card */}
        <AccordionItem
          value="user-profile"
          className="border-primary/20 dark:border-primary/10 rounded-lg bg-background/50 dark:bg-background/20"
        >
          <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
            User Profile
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground dark:text-muted-foreground/90 px-4 leading-relaxed">
            <div className="flex items-center space-x-4">
              <Avatar className="border-primary/20">
                <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-primary/10">U</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-foreground">John Doe</p>
                <p className="text-sm text-muted-foreground">
                  johndoe@example.com
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Settings Card */}
        <AccordionItem
          value="settings"
          className="border-primary/20 dark:border-primary/10 rounded-lg bg-background/50 dark:bg-background/20"
        >
          <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
            Settings
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground dark:text-muted-foreground/90 px-4 leading-relaxed">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">Notifications</Label>
                <Button
                  className="data-[state=checked]:bg-primary"
                  variant="outline"
                >
                  Toggle
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground">Theme</Label>
                <Button className="border-primary hover:bg-primary/10">
                  Select Theme
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Messages Card */}
        <AccordionItem
          value="messages"
          className="border-primary/20 dark:border-primary/10 rounded-lg bg-background/50 dark:bg-background/20"
        >
          <AccordionTrigger className="text-foreground hover:text-primary transition-colors px-4 py-2 text-lg font-medium">
            Messages
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground dark:text-muted-foreground/90 px-4 leading-relaxed">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <Avatar className="border-secondary/20">
                  <AvatarImage src="/path/to/avatar1.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-secondary/10">A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">Alice</p>
                  <p className="text-sm text-muted-foreground">
                    Hey, how are you?
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/5 hover:bg-secondary/10 transition-colors">
                <Avatar className="border-secondary/20">
                  <AvatarImage src="/path/to/avatar2.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-secondary/10">B</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">Bob</p>
                  <p className="text-sm text-muted-foreground">
                    Let&apos;s catch up soon!
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </CardContent>
  );
};

export default Faqs;
