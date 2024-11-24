"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { BarChart, CreditCard, Apple } from "lucide-react";
import Image from "next/image";

import dynamic from "next/dynamic";

const AnalyticsDashboard = dynamic(() => import("./tremor-charts"), {
  ssr: false,
});

export default function PreviewContainer() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 space-y-6 max-w-7xl">
        {/* Top row cards */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Subscriptions Card */}
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium truncate">
                Subscriptions
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate">+2350</div>
              <p className="text-xs text-muted-foreground truncate">
                +180.1% from last month
              </p>
              <div className="h-[80px] mt-4">
                <div className="w-full h-full bg-muted rounded-md" />
              </div>
            </CardContent>
          </Card>

          {/* Calendar Card */}
          <Card className="w-full">
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

          {/* Analytics Dashboard */}
          <Card className="w-full lg:col-span-1 overflow-hidden">
            <AnalyticsDashboard />
          </Card>
        </div>

        {/* Middle row */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {/* Team Members Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent className="overflow-auto">
              <div className="space-y-4">
                {["Sofia Davis", "Jackson Lee", "Isabella Nguyen"].map(
                  (name, index) => (
                    <div
                      key={name}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="flex-shrink-0">
                          <AvatarImage
                            src={`/placeholder-${index + 1}.svg`}
                            alt={name}
                          />
                          <AvatarFallback>
                            {name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-none truncate">
                            {name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {name.toLowerCase().replace(" ", "")}@example.com
                          </p>
                        </div>
                      </div>
                      <Select defaultValue={index === 0 ? "owner" : "member"}>
                        <SelectTrigger className="w-[130px] flex-shrink-0">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">Owner</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button variant="outline" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Card</span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Image
                      src="/paypal.png"
                      height={20}
                      width={20}
                      alt="paypal logo"
                      className="mr-2 flex-shrink-0"
                    />
                    <span className="truncate">PayPal</span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Apple className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">Apple</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="First Last"
                      className="mt-1.5 w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="number">Card number</Label>
                    <Input 
                      id="number" 
                      placeholder="" 
                      className="mt-1.5 w-full" 
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Label htmlFor="month">Expires</Label>
                      <Select>
                        <SelectTrigger id="month" className="mt-1.5 w-full">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                              {`${i + 1}`.padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      <Label htmlFor="year">Year</Label>
                      <Select>
                        <SelectTrigger id="year" className="mt-1.5 w-full">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => (
                            <SelectItem
                              key={i}
                              value={`${new Date().getFullYear() + i}`}
                            >
                              {new Date().getFullYear() + i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        placeholder="CVC" 
                        className="mt-1.5 w-full" 
                      />
                    </div>
                  </div>
                </div>
                <Button className="w-full">Continue</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {/* Recent Transactions Card */}
          <Card className="w-full">
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

          {/* Report Issue Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Report an issue</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="area">Area</Label>
                    <Select defaultValue="billing">
                      <SelectTrigger id="area" className="mt-1.5 w-full">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity">Security Level</Label>
                    <Select defaultValue="2">
                      <SelectTrigger id="severity" className="mt-1.5 w-full">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Severity 1</SelectItem>
                        <SelectItem value="2">Severity 2</SelectItem>
                        <SelectItem value="3">Severity 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="I need help with..."
                    className="mt-1.5 w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Please include all information relevant to your issue."
                    className="mt-1.5 min-h-[100px] w-full"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                  <Button type="submit" className="w-full sm:w-auto">Submit</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}