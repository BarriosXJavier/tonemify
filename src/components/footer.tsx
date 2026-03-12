import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto border-t border-border/40">
      <div className="bg-background/80 backdrop-blur-sm py-6 px-6 md:px-16 lg:px-24">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo and copyright */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  className="text-primary-foreground"
                >
                  <path
                    fill="currentColor"
                    d="M0 6h4l3 8.6L0 6zM16 6h-4l-3 8.6L16 6zM8 15 5 6h6l-3 9zM4 5H0l2-3 2 3zM16 5h-4l2-3 2 3zM10 5H6l2-3 2 3zM3.34 2H7L5 5 3.34 2zM9 2h4l-2 3-2-3z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm text-foreground">Tonemify</span>
                <span className="text-xs text-muted-foreground">
                  &copy; {new Date().getFullYear()}
                </span>
              </div>
            </div>


            {/* Social links */}
            <div className="flex items-center gap-2">
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link
                href="https://x.com/barrios__x"
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <Image 
                  src="/x.png" 
                  alt="x logo" 
                  width={16} 
                  height={16}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
