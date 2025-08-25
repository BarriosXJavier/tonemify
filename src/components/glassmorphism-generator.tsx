"use client";

import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const HexColorPicker = dynamic(
    () => import("react-colorful").then((mod) => mod.HexColorPicker),
    { ssr: false },
);

export default function GlassmorphismGenerator() {
    const [blur, setBlur] = useState(10);
    const [opacity, setOpacity] = useState(0.2);
    const [color, setColor] = useState("#ffffff");

    const generatedCss = useMemo(() => {
        const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
            color.slice(3, 5),
            16,
        )}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;

        return `backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
background-color: ${rgba};
border-radius: 10px;
border: 1px solid rgba(255, 255, 255, 0.3);`;
    }, [blur, opacity, color]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCss);
        toast.success("Copied to clipboard!");
    };

    const getPreviewStyle = () => {
        const rgba = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
            color.slice(3, 5),
            16,
        )}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;

        return {
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            backgroundColor: rgba,
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.3)",
        };
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 p-4 md:p-8">
            <div className="flex-1 flex flex-col gap-4 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Glassmorphism</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label htmlFor="blur" className="block text-sm font-medium">
                                Blur: {blur}px
                            </label>
                            <Slider
                                id="blur"
                                min={0}
                                max={50}
                                step={1}
                                value={[blur]}
                                onValueChange={(value) => setBlur(value[0])}
                            />
                        </div>
                        <div>
                            <label htmlFor="opacity" className="block text-sm font-medium">
                                Opacity: {opacity.toFixed(2)}
                            </label>
                            <Slider
                                id="opacity"
                                min={0}
                                max={1}
                                step={0.05}
                                value={[opacity]}
                                onValueChange={(value) => setOpacity(value[0])}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="color" className="block text-sm font-medium">
                                Color
                            </label>
                            <HexColorPicker
                                color={color}
                                onChange={setColor}
                                className="w-full"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="lg:hidden">
                    <CardHeader>
                        <CardTitle>Generated CSS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <textarea
                            readOnly
                            className="w-full h-32 p-2 border rounded-md bg-card text-card-foreground"
                            value={generatedCss}
                        />
                        <Button onClick={copyToClipboard} className="mt-4">
                            Copy to Clipboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
            <div className="flex-1">
                <div
                    className="w-full h-64 sm:h-80 md:h-96 rounded-lg flex items-center justify-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div
                        className="w-48 h-32 sm:w-56 sm:h-36 md:w-64 md:h-40 rounded-lg"
                        style={getPreviewStyle()}
                    ></div>
                </div>
                <pre className="w-full h-32 p-2 border rounded-md bg-card text-card-foreground overflow-auto hidden lg:block">
                    {generatedCss}
                </pre>
            </div>
        </div >
    );
}
