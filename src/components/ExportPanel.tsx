"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface ExportPanelProps {
  palette: string[];
}

export function ExportPanel({ palette }: ExportPanelProps) {
  const [format, setFormat] = useState("css");

  const formats = {
    css: `
:root {
  --color-primary: ${palette[0]};
  --color-secondary: ${palette[1]};
  --color-accent: ${palette[2]};
}`,
    scss: `
$color-primary: ${palette[0]};
$color-secondary: ${palette[1]};
$color-accent: ${palette[2]};`,
    less: `
@color-primary: ${palette[0]};
@color-secondary: ${palette[1]};
@color-accent: ${palette[2]};`,
    json: JSON.stringify(
      {
        primary: palette[0],
        secondary: palette[1],
        accent: palette[2],
      },
      null,
      2,
    ),
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formats[format as keyof typeof formats]);
    toast.success("Copied to clipboard!");
  };

  return (
    <Tabs value={format} onValueChange={setFormat}>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="css">CSS</TabsTrigger>
        <TabsTrigger value="scss">SCSS</TabsTrigger>
        <TabsTrigger value="less">LESS</TabsTrigger>
        <TabsTrigger value="json">JSON</TabsTrigger>
      </TabsList>

      {Object.entries(formats).map(([key, value]) => (
        <TabsContent key={key} value={key}>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <pre className="font-mono text-sm">{value}</pre>
          </ScrollArea>
          <Button onClick={copyToClipboard} className="mt-4">
            Copy to Clipboard
          </Button>
        </TabsContent>
      ))}
    </Tabs>
  );
}
