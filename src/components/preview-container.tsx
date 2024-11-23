"use client";

import { Calendar } from "@/components/ui/calendar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Checkbox } from "@/components/ui/checkbox";

export default function ShadcnComponentsDemo() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Interactions
            </h2>
            <div className="space-y-4">
              <Command className="rounded-lg border border-primary/20 shadow-md">
                <CommandInput
                  placeholder="Type a command..."
                  className="text-foreground"
                />
                <CommandList className="max-h-32 bg-card">
                  <CommandEmpty className="text-muted-foreground">
                    No results found.
                  </CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem className="hover:bg-primary/10 text-foreground">
                      Calendar
                    </CommandItem>
                    <CommandItem className="hover:bg-primary/10 text-foreground">
                      Search
                    </CommandItem>
                    <CommandItem className="hover:bg-primary/10 text-foreground">
                      Settings
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>

              <div className="flex gap-4 flex-wrap">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary"
                    >
                      Hover
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-64 bg-card p-4 rounded-lg shadow">
                    <div className="flex gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>HS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">
                          Hover Card
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Quick preview on hover
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary"
                    >
                      Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-card p-4 rounded-lg shadow">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-foreground">
                        Dimensions
                      </h4>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-2">
                          <Label
                            htmlFor="width"
                            className="text-xs text-foreground"
                          >
                            Width
                          </Label>
                          <Input
                            id="width"
                            defaultValue="100%"
                            className="col-span-2 h-8 bg-input text-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Calendar
            </h2>
            <Calendar
              mode="single"
              className="rounded-md border border-primary text-foreground w-full max-w-[300px] mx-auto"
            />
          </div>

          {/* User Profile Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              User Profile
            </h2>
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-9 bg-background rounded-md">
                <TabsTrigger value="tab1" className="text-xs text-primary">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="tab2" className="text-xs text-primary">
                  Settings
                </TabsTrigger>
                <TabsTrigger value="tab3" className="text-xs text-primary">
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-2">
                <div className="flex items-center gap-3 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-primary">
                      John Doe
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      john@example.com
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab2" className="mt-2">
                <div className="space-y-2">
                  <div>
                    <Label
                      htmlFor="username"
                      className="text-xs text-foreground"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      className="h-8 mt-1 bg-input text-foreground border border-primary"
                      placeholder="Username"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch id="notifications" />
                    <Label
                      htmlFor="notifications"
                      className="text-xs text-foreground"
                    >
                      Enable notifications
                    </Label>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tab3" className="mt-2">
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
                >
                  Show Notification
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* FAQ Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">FAQ</h2>
            <Accordion type="single" collapsible className="space-y-2">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-sm text-primary">
                  What is shadcn/ui?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground">
                  A library of accessible and styled components for React.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm text-primary">
                  How do I use it?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground">
                  Install the library and use the pre-built components in your
                  project.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Controls Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Controls
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm text-foreground">Adjust Volume</Label>
                <Slider defaultValue={[50]} className="w-full" />
                <Progress value={50} className="h-2 bg-primary" />
              </div>

              <RadioGroup defaultValue="option1" className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1" className="text-sm text-foreground">
                    Option 1
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2" className="text-sm text-foreground">
                    Option 2
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Interactive Elements Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Interactive Elements
            </h2>
            <div className="flex flex-wrap gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/80"
                  >
                    Menu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card border border-primary/20 rounded-lg shadow">
                  <DropdownMenuLabel className="text-foreground">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:bg-primary/10 text-foreground">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 text-foreground">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-primary/10 text-foreground">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/80"
                  >
                    Sheet
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-card p-4 rounded-lg shadow">
                  <SheetHeader>
                    <h3 className="text-lg font-semibold text-foreground">
                      Example Sheet
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      This is a sheet component
                    </p>
                  </SheetHeader>
                </SheetContent>
              </Sheet>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
                  >
                    Alert
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-card border border-red-500 rounded-lg shadow">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold text-foreground">
                      Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-primary text-primary-foreground hover:bg-primary/80">
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Common Elements Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Common Elements
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Badge className="justify-center bg-primary text-primary-foreground">
                  Badge
                </Badge>
                <Toggle
                  size="sm"
                  className="bg-secondary text-secondary-foreground"
                >
                  Toggle
                </Toggle>
                <div className="flex justify-center">
                  <Checkbox id="terms" className="text-primary" />
                </div>
              </div>

              <Select>
                <SelectTrigger className="h-8 bg-input text-foreground border border-primary">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-primary/20 rounded-lg shadow">
                  <SelectItem value="1" className="text-foreground">
                    Option 1
                  </SelectItem>
                  <SelectItem value="2" className="text-foreground">
                    Option 2
                  </SelectItem>
                </SelectContent>
              </Select>

              <Card className="bg-card rounded-lg shadow">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm text-foreground">
                    Card Title
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Card Description
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-foreground">
                  Content
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Table Card */}
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">
              Data Table
            </h2>
            <div className="rounded-md border border-primary">
              <Table className="min-w-full">
                <TableHeader className="bg-primary/10">
                  <TableRow>
                    <TableHead className="h-9 text-xs text-foreground">
                      Name
                    </TableHead>
                    <TableHead className="h-9 text-xs text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="h-9 text-xs text-foreground">
                      Role
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-primary/5">
                    <TableCell className="h-9 text-xs text-foreground">
                      Alice
                    </TableCell>
                    <TableCell className="h-9 text-xs">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/20 text-primary"
                      >
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="h-9 text-xs text-foreground">
                      Admin
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-primary/5">
                    <TableCell className="h-9 text-xs text-foreground">
                      Bob
                    </TableCell>
                    <TableCell className="h-9 text-xs">
                      <Badge
                        variant="secondary"
                        className="text-xs bg-secondary/20 text-secondary"
                      >
                        Offline
                      </Badge>
                    </TableCell>
                    <TableCell className="h-9 text-xs text-foreground">
                      User
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
