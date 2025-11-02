"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ColorConfig } from "@/lib/types";
import { Eye, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { 
  generateAccessibilityReport, 
  getColorPairName,
  ContrastResult 
} from "@/lib/accessibility";
import { Progress } from "@/components/ui/progress";

interface AccessibilityCheckerProps {
  lightColors: Record<string, ColorConfig>;
  darkColors: Record<string, ColorConfig>;
  activeMode: "light" | "dark";
}

export default function AccessibilityChecker({
  lightColors,
  darkColors,
  activeMode,
}: AccessibilityCheckerProps) {
  const [open, setOpen] = useState(false);

  const currentColors = activeMode === "light" ? lightColors : darkColors;
  const report = generateAccessibilityReport(currentColors);

  const getScoreColor = (score: string) => {
    switch (score) {
      case "aaa":
        return "text-green-500";
      case "aa":
        return "text-yellow-500";
      default:
        return "text-red-500";
    }
  };

  const getScoreIcon = (score: string) => {
    switch (score) {
      case "aaa":
        return <CheckCircle2 className="w-4 h-4" />;
      case "aa":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getOverallBadgeVariant = (score: string) => {
    switch (score) {
      case "excellent":
        return "default";
      case "good":
        return "secondary";
      default:
        return "destructive";
    }
  };

  const renderContrastCheck = (key: string, result: ContrastResult) => {
    const names = getColorPairName(key);
    
    return (
      <Card key={key} className="border">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">
                  {names.background} / {names.foreground}
                </span>
                <div className={`flex items-center gap-1 ${getScoreColor(result.score)}`}>
                  {getScoreIcon(result.score)}
                  <span className="text-xs font-bold uppercase">
                    {result.score === "aaa" ? "AAA" : result.score === "aa" ? "AA" : "FAIL"}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Ratio: </span>
                  <span className="font-mono font-medium">{result.ratio.toFixed(2)}:1</span>
                </div>
                <div className="flex gap-2">
                  {result.passAA ? (
                    <Badge variant="outline" className="text-xs bg-green-500/10">
                      ✓ AA
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-red-500/10">
                      ✗ AA
                    </Badge>
                  )}
                  {result.passAAA ? (
                    <Badge variant="outline" className="text-xs bg-green-500/10">
                      ✓ AAA
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-red-500/10">
                      ✗ AAA
                    </Badge>
                  )}
                </div>
              </div>

              {result.recommendation && (
                <p className="text-xs text-muted-foreground">
                  💡 {result.recommendation}
                </p>
              )}
            </div>

            {/* Color preview */}
            <div className="flex gap-1">
              <div
                className="w-8 h-8 rounded border"
                style={{
                  backgroundColor: `hsl(${currentColors[names.background.toLowerCase()]?.hue ?? 0}, ${currentColors[names.background.toLowerCase()]?.saturation ?? 0}%, ${currentColors[names.background.toLowerCase()]?.lightness ?? 0}%)`,
                }}
                title={names.background}
              />
              <div
                className="w-8 h-8 rounded border"
                style={{
                  backgroundColor: `hsl(${currentColors[`${names.foreground.toLowerCase().replace(" text", "")}-foreground`]?.hue ?? 0}, ${currentColors[`${names.foreground.toLowerCase().replace(" text", "")}-foreground`]?.saturation ?? 0}%, ${currentColors[`${names.foreground.toLowerCase().replace(" text", "")}-foreground`]?.lightness ?? 0}%)`,
                }}
                title={names.foreground}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye className="w-4 h-4" />
          <span>Accessibility</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Accessibility Report</DialogTitle>
          <DialogDescription>
            WCAG 2.0 contrast ratio compliance for {activeMode} mode
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Overall Score</h3>
                  <Badge 
                    variant={getOverallBadgeVariant(report.overallScore)}
                    className="text-sm capitalize"
                  >
                    {report.overallScore.replace("-", " ")}
                  </Badge>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-3xl font-bold">
                    {report.passPercentage}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Compliant color pairs
                  </p>
                </div>
              </div>
              <Progress value={report.passPercentage} className="mt-4" />
            </CardContent>
          </Card>

          {/* WCAG Guidelines */}
          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <p className="font-medium">📋 WCAG 2.0 Guidelines:</p>
            <ul className="space-y-1 text-muted-foreground ml-4">
              <li>• <strong>AA Normal Text:</strong> 4.5:1 minimum contrast ratio</li>
              <li>• <strong>AA Large Text:</strong> 3:1 minimum contrast ratio</li>
              <li>• <strong>AAA Normal Text:</strong> 7:1 minimum contrast ratio</li>
              <li>• <strong>AAA Large Text:</strong> 4.5:1 minimum contrast ratio</li>
            </ul>
          </div>

          {/* Contrast Checks */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Color Pair Analysis</h3>
            {Object.entries(report)
              .filter(([key]) => key.includes("_"))
              .map(([key, result]) => renderContrastCheck(key, result as ContrastResult))}
          </div>

          {/* Summary */}
          <div className="rounded-lg border p-4 bg-card">
            <p className="text-sm text-muted-foreground">
              {report.overallScore === "excellent" && (
                "🎉 Excellent! All color pairs meet AAA standards for maximum accessibility."
              )}
              {report.overallScore === "good" && (
                "✅ Good job! Most color pairs are accessible. Consider the suggestions above for AAA compliance."
              )}
              {report.overallScore === "needs-improvement" && (
                "⚠️ Some color pairs need improvement. Follow the recommendations to enhance accessibility."
              )}
              {report.overallScore === "poor" && (
                "❌ Several color pairs fail accessibility standards. Please adjust contrasts for better readability."
              )}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
