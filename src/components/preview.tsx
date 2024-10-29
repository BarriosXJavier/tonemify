"use client"

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Clipboard,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const DocumentationPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [date, setDate] = useState<Date>();
  const [progress, setProgress] = useState(60);
  const { toast } = useToast();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);

    const handleThemeApplication = (event: CustomEvent) => {
      styleSheet.textContent = event.detail;
    };

    window.addEventListener(
      "apply-theme",
      handleThemeApplication as EventListener
    );

    return () => {
      window.removeEventListener(
        "apply-theme",
        handleThemeApplication as EventListener
      );
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
    };
  }, []);

  const handleToggleNotifications = (pressed: boolean) => {
    setNotifications(pressed);
    toast({
      title: "Notifications",
      description: pressed ? "Notifications enabled" : "Notifications disabled",
    });
  };

  const handleCopyToClipboard = () => {
    const themeStyles = document.querySelector("style")?.textContent || "";
    navigator.clipboard.writeText(themeStyles).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: "Theme CSS has been copied successfully!",
      });
    });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
    document.documentElement.setAttribute("data-theme", value);
    toast({
      title: "Theme Changed",
      description: `Switched to ${value} mode`,
    });
  };

  return (
    <div className="min-h-screen p-8 space-y-12 bg-background/80 dark:bg-background/90 backdrop-blur-sm">
      {/* Components Preview Section */}
      <Card className="border-2 border-accent/20 bg-background/95 dark:bg-background/80 shadow-lg hover:shadow-accent/10 transition-all">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-accent dark:text-accent/80">
            Components Preview
          </CardTitle>
          <CardDescription className="text-lg text-primary dark:text-foreground/50">
            Explore the theming of various UI components below.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Components Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <Card className="border border-primary/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary dark:text-primary/80">
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 justify-center">
              <Avatar className="border-2 border-primary/20 shadow-inner dark:shadow-none dark:border-primary/10">
                <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
                <AvatarFallback className="bg-primary/10 dark:bg-primary/20 text-primary">
                  U
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-foreground dark:text-foreground/80">
                  John Doe
                </p>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                  johndoe@example.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Card */}
        <Card className="border border-secondary/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-secondary dark:text-secondary/80">
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              selected={date}
              onSelect={(newDate) => setDate(newDate)}
              className="rounded-lg border border-secondary/20 dark:border-secondary/10 shadow-inner dark:shadow-none"
            />
          </CardContent>
        </Card>

        {/* Project Progress Card */}
        <Card className="border border-accent/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-accent dark:text-accent/80">
              Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress
              value={progress}
              className="h-2 bg-accent/20 dark:bg-accent/30 shadow-inner dark:shadow-none"
            />
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card className="border border-primary/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary dark:text-primary/80">
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground dark:text-muted-foreground/70">
                  Notifications
                </Label>
                <Switch
                  checked={notifications}
                  onCheckedChange={handleToggleNotifications}
                  className="data-[state=checked]:bg-primary shadow-inner dark:shadow-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-muted-foreground dark:text-muted-foreground/70">
                  Theme
                </Label>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-32 border-primary/20 shadow-inner dark:border-primary/10 dark:shadow-none">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages Card */}
        <Card className="border border-secondary/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-secondary dark:text-secondary/80">
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/5 dark:bg-secondary/10 hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors shadow-inner dark:shadow-none">
                <Avatar className="border-2 border-secondary/20 dark:border-secondary/10">
                  <AvatarImage src="/path/to/avatar1.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-secondary/10 dark:bg-secondary/20">
                    A
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-foreground/80">
                    Alice
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                    Hey, how are you?
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 rounded-lg bg-secondary/5 dark:bg-secondary/10 hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors shadow-inner dark:shadow-none">
                <Avatar className="border-2 border-secondary/20 dark:border-secondary/10">
                  <AvatarImage src="/path/to/avatar2.jpg" alt="User Avatar" />
                  <AvatarFallback className="bg-secondary/10 dark:bg-secondary/20">
                    B
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-foreground/80">
                    Bob
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">
                    Let&apos;s catch up soon!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Statistics Card */}
        <Card className="border border-primary/10 bg-background/90 dark:bg-background/80 hover:bg-background/95 dark:hover:bg-background/75 transition-all shadow-sm hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary dark:text-primary/80">
              User Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors shadow-inner dark:shadow-none">
                <Label className="text-muted-foreground dark:text-muted-foreground/70">
                  Posts
                </Label>
                <Badge className="bg-primary/20 dark:bg-primary/30 text-primary">
                  120
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors shadow-inner dark:shadow-none">
                <Label className="text-muted-foreground dark:text-muted-foreground/70">
                  Followers
                </Label>
                <Badge className="bg-primary/20 dark:bg-primary/30 text-primary">
                  300
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors shadow-inner dark:shadow-none">
                <Label className="text-muted-foreground dark:text-muted-foreground/70">
                  Following
                </Label>
                <Badge className="bg-primary/20 dark:bg-primary/30 text-primary">
                  180
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="col-span-full flex flex-wrap gap-4 justify-center mt-8">
          <Button
            variant="outline"
            onClick={() => handleThemeChange("light")}
            className="border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
          >
            <Sun className="h-4 w-4 mr-2" /> Light Theme
          </Button>
          <Button
            variant="outline"
            onClick={() => handleThemeChange("dark")}
            className="border-primary hover:bg-primary/10 dark:hover:bg-primary/20"
          >
            <Moon className="h-4 w-4 mr-2" /> Dark Theme
          </Button>

          {/* Copy Theme Button */}
          <Button
            variant="outline"
            onClick={handleCopyToClipboard}
            className="border-accent hover:bg-accent/10 dark:hover:bg-accent/20 shadow-md dark:shadow-none"
          >
            <Clipboard className="h-4 w-4 mr-2" /> Copy Theme
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
