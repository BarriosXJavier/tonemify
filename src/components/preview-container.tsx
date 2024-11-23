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
import TremorCharts from "./tremor-charts";

export default function PreviewContainer() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
              <div className="h-[80px] mt-4">
                <div className="w-full h-full bg-muted rounded-md" />
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-1">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Sofia Davis", "Jackson Lee", "Isabella Nguyen"].map(
                  (name, index) => (
                    <div
                      key={name}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
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
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {name.toLowerCase().replace(" ", "")}@example.com
                          </p>
                        </div>
                      </div>
                      <Select defaultValue={index === 0 ? "owner" : "member"}>
                        <SelectTrigger className="w-[110px]">
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

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex space-x-4">
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Card
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Image
                          src="/paypal.png"
                          height={20}
                          width={20}
                          alt="paypal logo"
                        />
                        PayPal
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Apple className="mr-2 h-4 w-4" />
                        Apple
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="First Last" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="number">Card number</Label>
                    <Input id="number" placeholder="" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="month">Expires</Label>
                      <Select>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i} value={`${i + 1}`}>
                              {`${i + 1}`.padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="year">Year</Label>
                      <Select>
                        <SelectTrigger id="year">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent position="popper">
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
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="CVC" />
                    </div>
                  </div>
                  <Button className="w-full">Continue</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>{transaction.status}</TableCell>
                      <TableCell>{transaction.email}</TableCell>
                      <TableCell className="text-right">
                        ${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">•••</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report an issue</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="area">Area</Label>
                      <Select defaultValue="billing">
                        <SelectTrigger id="area">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="billing">Billing</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="severity">Security Level</Label>
                      <Select defaultValue="2">
                        <SelectTrigger id="severity">
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="1">Severity 1</SelectItem>
                          <SelectItem value="2">Severity 2</SelectItem>
                          <SelectItem value="3">Severity 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="I need help with..." />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Please include all information relevant to your issue."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <TremorCharts />
      </div>
    </>
  );
}
