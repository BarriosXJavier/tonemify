"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  BellIcon, // Used in a new button
  PlusCircledIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ThemeShowcase = () => {
  const [sliderValue, setSliderValue] = useState([50]);
  const [progress] = useState(66);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFramework, setSelectedFramework] = useState("");

  const frameworks = [
    { value: "next.js", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxt.js", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ];

  return (
    <section className="container mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Theme preview</h2>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex w-full h-auto">
          <TabsTrigger
            value="overview"
            className="flex-1 data-[state=active]:w-full"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="buttons"
            className="flex-1 data-[state=active]:w-full"
          >
            Buttons
          </TabsTrigger>
          <TabsTrigger
            value="inputs-controls"
            className="flex-1 data-[state=active]:w-full"
          >
            Inputs
          </TabsTrigger>
          <TabsTrigger
            value="display"
            className="flex-1 data-[state=active]:w-full"
          >
            Display
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">User Profile</CardTitle>
                <CardDescription>Avatar with dropdown menu</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://placehold.co/40x40?text=JD"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <GearIcon className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Command Menu</CardTitle>
                <CardDescription>Searchable command palette</CardDescription>
              </CardHeader>
              <CardContent>
                <Command className="border rounded-lg">
                  <CommandInput placeholder="Search commands..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                      <CommandItem>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Calendar</span>
                      </CommandItem>
                      <CommandItem>
                        <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
                        <span>Search</span>
                      </CommandItem>
                      <CommandItem>
                        <GearIcon className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Data Table</CardTitle>
                <CardDescription>Structured data display</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">John Doe</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell className="font-medium">Jane Smith</TableCell>
                      <TableCell>
                        <Badge>Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Progress & Metrics</CardTitle>
                <CardDescription>Visual progress indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Storage Used</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Volume: {sliderValue[0]}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buttons" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Button Variants</CardTitle>
                <CardDescription>Different button styles</CardDescription>
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

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Button Sizes</CardTitle>
                <CardDescription>Various button dimensions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" className="w-full">
                  Small Button
                </Button>
                <Button size="default" className="w-full">
                  Default Button
                </Button>
                <Button size="lg" className="w-full">
                  Large Button
                </Button>
                <div className="flex gap-2 justify-center">
                  <Button size="icon">
                    <PlusCircledIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <GearIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Interactive Buttons</CardTitle>
                <CardDescription>Buttons with hover effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <HeartIcon className="h-4 w-4 mr-2" />
                      Hover Me
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Button Info</h4>
                        <p className="text-sm">
                          This button shows additional context on hover.
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Button variant="ghost" className="w-full">
                  <RocketIcon className="h-4 w-4 mr-2" />
                  Launch Action
                </Button>

                <Button variant="secondary" className="w-full">
                  <BellIcon className="h-4 w-4 mr-2" />
                  Get Notifications
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="w-full">
                      <DotsHorizontalIcon className="h-4 w-4 mr-2" />
                      More Options
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PersonIcon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GearIcon className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                      Messages
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="inputs-controls" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Form Inputs</CardTitle>
                <CardDescription>Various input field types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Name</Label>
                  <Input id="text-input" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-input">Email</Label>
                  <Input
                    id="email-input"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search-input">Search</Label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search-input"
                      placeholder="Search..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textarea-input">Message</Label>
                  <Textarea
                    id="textarea-input"
                    placeholder="Your message..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Selection Controls</CardTitle>
                <CardDescription>
                  Checkboxes, radios, and switches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox1" />
                    <Label htmlFor="checkbox1">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox2" />
                    <Label htmlFor="checkbox2">Option 2</Label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="switch1">Email Notifications</Label>
                  <Switch id="switch1" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="switch2">Dark Mode</Label>
                  <Switch id="switch2" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Advanced Controls</CardTitle>
                <CardDescription>
                  Sliders, selects, and date pickers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Volume: {sliderValue[0]}</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Framework</Label>
                  <Select
                    value={selectedFramework}
                    onValueChange={setSelectedFramework}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select framework..." />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.map((framework) => (
                        <SelectItem
                          key={framework.value}
                          value={framework.value}
                        >
                          {framework.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate} // setDate can now handle undefined
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="display" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Status Badges</CardTitle>
                <CardDescription>Visual status indicators</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
                <Badge className="bg-success hover:bg-success/80 text-success-foreground">
                  Success
                </Badge>
                <Badge className="bg-warning hover:bg-warning/80 text-warning-foreground">
                  Warning
                </Badge>
                <Badge className="bg-info hover:bg-info/80 text-info-foreground">
                  Info
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Notification Alerts</CardTitle>
                <CardDescription>System messages and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Alert>
                  <InfoCircledIcon className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Your account has been updated successfully.
                  </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <Cross2Icon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to save changes. Please try again.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">User Avatars</CardTitle>
                <CardDescription>Profile pictures and initials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    {/* Updated src to a theme-neutral placeholder image URL */}
                    <AvatarImage
                      src="https://placehold.co/40x40?text=JD"
                      alt="User 1"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      Product Manager
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    {/* Updated src to a theme-neutral placeholder image URL */}
                    <AvatarImage
                      src="https://placehold.co/40x40?text=JS"
                      alt="User 2"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Jane Smith</p>
                    <p className="text-xs text-muted-foreground">Designer</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback>+3</AvatarFallback>
                  </Avatar>
                </div>
              </CardContent>
            </Card>

            <Card className="hidden md:block">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Scroll Area</CardTitle>
                <CardDescription>Scrollable content regions</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72 w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <h4 className="mb-4 text-sm font-medium leading-none">
                      Recent Activity
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        <strong>July 4, 2025:</strong> User &apos;Alice&apos; logged in
                        from a new device.
                      </p>
                      <p>
                        <strong>July 3, 2025:</strong> Document &apos;Project X
                        Proposal&apos; was updated.
                      </p>
                      <p>
                        <strong>July 3, 2025:</strong> New task &apos;Review Q3
                        Budget&apos; assigned to &apos;Bob&apos;.
                      </p>
                      <p>
                        <strong>July 2, 2025:</strong> User &apos;Charlie&apos; changed
                        their profile picture.
                      </p>
                      <p>
                        <strong>July 2, 2025:</strong> System maintenance
                        completed successfully.
                      </p>
                      <p>
                        <strong>July 1, 2025:</strong> New user &apos;Diana&apos;
                        registered an account.
                      </p>
                      <p>
                        <strong>July 1, 2025:</strong> Reminder: Meeting with
                        &apos;Eve&apos; at 10 AM tomorrow.
                      </p>
                      <p>
                        <strong>June 30, 2025:</strong> &apos;Frank&apos; commented on
                        &apos;Design Mockup V2&apos;.
                      </p>
                      <p>
                        <strong>June 29, 2025:</strong> Data backup initiated
                        and completed.
                      </p>
                      <p>
                        <strong>June 28, 2025:</strong> &apos;Grace&apos; uploaded 5 new
                        files to &apos;Shared Drive&apos;.
                      </p>
                      <p>
                        <strong>June 27, 2025:</strong> Security patch applied
                        to server infrastructure.
                      </p>
                      <p>
                        <strong>June 26, 2025:</strong> &apos;Heidi&apos; updated her
                        contact information.
                      </p>
                      <p>
                        <strong>June 25, 2025:</strong> New feature &apos;Dark Mode&apos;
                        deployed to production.
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ThemeShowcase;
