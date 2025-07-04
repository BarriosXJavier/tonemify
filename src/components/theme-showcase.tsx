"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  RocketIcon,
  HeartIcon,
  InfoCircledIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

const ThemeShowcase = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [progress, setProgress] = useState(66);

  return (
    <section className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Theme Showcase</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-min">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Buttons</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Badges</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Error</Badge>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch id="demo-switch" />
              <Label htmlFor="demo-switch" className="text-sm">
                Toggle
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Toggle aria-label="Bold" size="sm">
                B
              </Toggle>
              <Toggle aria-label="Italic" size="sm">
                I
              </Toggle>
              <Toggle aria-label="Underline" size="sm">
                U
              </Toggle>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <h4 className="font-semibold">Heading</h4>
            <p className="text-sm">Regular text</p>
            <p className="text-sm text-muted-foreground">Muted text</p>
            <p className="text-xs">Small text</p>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">States</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-green-600" />
              <span className="text-sm">Success</span>
            </div>
            <div className="flex items-center gap-2">
              <Cross2Icon className="h-4 w-4 text-red-600" />
              <span className="text-sm">Error</span>
            </div>
            <div className="flex items-center gap-2">
              <InfoCircledIcon className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Info</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Text input" />
            <Textarea placeholder="Textarea" rows={2} />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Value: {sliderValue[0]}</Label>
              <Slider
                value={[Number(sliderValue)]}
                onValueChange={(value) => setSliderValue(value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Button Sizes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button size="sm" className="w-full">
              Small
            </Button>
            <Button size="default" className="w-full">
              Default
            </Button>
            <Button size="lg" className="w-full">
              Large
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Badge Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-1">
              <Badge variant="default">New</Badge>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <div className="flex gap-1">
              <Badge variant="outline">Draft</Badge>
              <Badge variant="destructive">Error</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  General information content
                </p>
              </TabsContent>
              <TabsContent value="details" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Detailed view content
                </p>
              </TabsContent>
              <TabsContent value="settings" className="mt-3">
                <p className="text-sm text-muted-foreground">
                  Configuration options
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Mini Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Username" />
            <Input placeholder="Password" type="password" />
            <Button size="sm" className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert>
              <InfoCircledIcon className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong with your request.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              <HeartIcon className="h-3 w-3 mr-1" />
              Like
            </Button>
            <Button variant="ghost" size="sm" className="w-full">
              <RocketIcon className="h-3 w-3 mr-1" />
              Share
            </Button>
            <Button variant="secondary" size="sm" className="w-full">
              <InfoCircledIcon className="h-3 w-3 mr-1" />
              Info
            </Button>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Complete Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm">
                    Name
                  </Label>
                  <Input id="name" placeholder="Enter name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-sm">Role</Label>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">Developer</Badge>
                    <Badge variant="outline">Designer</Badge>
                    <Badge variant="outline">Manager</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm">
                    Newsletter
                  </Label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="feedback" className="text-sm">
                    Feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Your thoughts..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-3">
            <div className="flex gap-2 ml-auto">
              <Button variant="outline">Cancel</Button>
              <Button>Submit</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ThemeShowcase;
