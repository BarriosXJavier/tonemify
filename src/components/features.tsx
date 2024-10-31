import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Paintbrush,
  Sliders,
  Moon,
  Clipboard,
  Palette,
  Share2,
  Layers,
} from "lucide-react";

import { FC } from "react";

interface FeatureItemProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const FeatureItem: FC<FeatureItemProps> = ({ icon: Icon, title, description, color }) => (
  <li className="group p-4 rounded-lg bg-background/50 dark:bg-background/20 border border-primary/10 dark:border-primary/5 hover:border-primary/20 dark:hover:border-primary/10 transition-all">
    <div className="flex items-start space-x-4">
      <div
        className={`flex-shrink-0 p-2 rounded-md bg-${color}/10 dark:bg-${color}/5 group-hover:bg-${color}/20 dark:group-hover:bg-${color}/10 transition-colors`}
      >
        <Icon className={`h-5 w-5 text-${color} dark:text-${color}/90`} />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-foreground dark:text-foreground/90 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </li>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Paintbrush,
      title: "Intuitive Theme Generation",
      description:
        "Create stunning custom themes with our user-friendly interface. Perfect for both beginners and experienced developers.",
      color: "primary",
    },
    {
      icon: Sliders,
      title: "Advanced Customization",
      description:
        "Fine-tune every aspect of your theme with precise controls. Adjust colors, spacing, and more with real-time preview.",
      color: "primary",
    },

    {
      icon: Moon,
      title: "Dark Mode Support",
      description:
        "Built-in dark mode support ensures your themes look great in both light and dark environments.",
      color: "primary",
    },
    {
      icon: Clipboard,
      title: "Quick Export",
      description:
        "Copy your theme directly to clipboard in various formats. Seamlessly integrate with your existing projects.",
      color: "primary",
    },
    {
      icon: Palette,
      title: "Color Harmonies",
      description:
        "Generate beautiful color palettes with our color harmony system. Create cohesive and balanced designs.",
      color: "primary",
    },

    {
      icon: Share2,
      title: "Easy Sharing",
      description:
        "Share your themes with team members or the community. Collaborate on design systems effortlessly.",
      color: "primary",
    },
    {
      icon: Layers,
      title: "Component Preview",
      description:
        "Preview your theme across all ShadcnUI components in real-time. Ensure consistency throughout your design.",
      color: "primary",
    },
  ];

  return (
    <Card className="border border-primary/20 dark:border-primary/10 bg-background/95 dark:bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10 transition-all">
      <CardHeader className="space-y-4">
        <CardTitle className="text-4xl font-bold text-center text-primary/80 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
          Features
        </CardTitle>
        <p className="text-lg text-center text-muted-foreground dark:text-muted-foreground/90">
          Everything you need to create and manage beautiful themes for your
          next project
        </p>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeaturesSection;
