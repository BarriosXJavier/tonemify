"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, CreditCard, Apple, Plus, Share2, Settings, User, Bell, Search } from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const UserProfileCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Profile</CardTitle>
      <CardDescription>Update your profile information.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="john.doe" />
      </div>
      <Button className="w-full">Save</Button>
    </CardContent>
  </Card>
);

const SettingsCard = () => {
    const { toast } = useToast();
    return (
        <Card>
            <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
            </div>
            <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-2">
                <Label>Storage Usage</Label>
                <Progress value={33} />
            </div>
            <Button variant="secondary" className="w-full" onClick={() => toast({ title: "Settings Saved!", description: "Your new settings have been applied." })}>Save Settings</Button>
            </CardContent>
        </Card>
    )
};

const InteractiveElementsCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Explore various interactive components.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="forms">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="overlays">Overlays</TabsTrigger>
                    <TabsTrigger value="data">Data</TabsTrigger>
                </TabsList>
                <TabsContent value="forms" className="pt-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms">Accept terms and conditions</Label>
                        </div>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select a fruit" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea placeholder="Type your message here." />
                    </div>
                </TabsContent>
                <TabsContent value="overlays" className="pt-4 space-x-2">
                    <Dialog>
                        <DialogTrigger asChild><Button>Dialog</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Dialog Title</DialogTitle>
                            </DialogHeader>
                            <p>This is a dialog. You can put any content you want here.</p>
                        </DialogContent>
                    </Dialog>
                    <Popover>
                        <PopoverTrigger asChild><Button variant="outline">Popover</Button></PopoverTrigger>
                        <PopoverContent className="w-80">
                            <p>This is a popover. It's great for displaying extra information.</p>
                        </PopoverContent>
                    </Popover>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild><Button variant="ghost">Tooltip</Button></TooltipTrigger>
                            <TooltipContent><p>This is a tooltip.</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Sheet>
                        <SheetTrigger asChild><Button>Sheet</Button></SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Sheet Title</SheetTitle>
                            </SheetHeader>
                            <p>This is a sheet. It slides in from the side.</p>
                        </SheetContent>
                    </Sheet>
                </TabsContent>
                <TabsContent value="data" className="pt-4">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>Yes. It comes with default styles that matches the other components' aesthetics.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);

const DataTableCard = () => (
    <Card>
        <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>A list of your most recent orders.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Liam Johnson</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Olivia Smith</TableCell>
                        <TableCell>Pending</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Noah Williams</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell className="text-right">$350.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const NavigationCard = () => (
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>Explore different navigation styles.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center">
            <Menubar className="mb-4">
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New Tab</MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger>Edit</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Undo</MenubarItem>
                        <MenubarItem>Redo</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#" className="font-medium">Home</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#" className="font-medium">About</NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href="#" className="font-medium">Contact</NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </CardContent>
    </Card>
);

export default function PreviewContainer() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Component Showcase</h1>
            <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon"><Search className="h-5 w-5"/></Button>
                <Button variant="ghost" size="icon"><Bell className="h-5 w-5"/></Button>
                <Button variant="ghost" size="icon"><User className="h-5 w-5"/></Button>
            </div>
        </header>
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <UserProfileCard />
            <SettingsCard />
            <NavigationCard />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <InteractiveElementsCard />
            <DataTableCard />
            <Card>
                <CardHeader>
                    <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center p-0 overflow-auto">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md max-w-full"
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Status</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                    <TableHead className="text-right w-[60px]">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    {
                                        status: "Processing",
                                        email: "monserrat44@gmail.com",
                                        amount: 837,
                                    },
                                    {
                                        status: "Failed",
                                        email: "carmella@hotmail.com",
                                        amount: 721,
                                    },
                                    {
                                        status: "Completed",
                                        email: "sofia@example.com",
                                        amount: 532,
                                    },
                                    {
                                        status: "Processing",
                                        email: "jackson@example.com",
                                        amount: 975,
                                    },
                                ].map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">
                                            {transaction.status}
                                        </TableCell>
                                        <TableCell className="truncate max-w-[200px]">
                                            {transaction.email}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            ${transaction.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">•••</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
