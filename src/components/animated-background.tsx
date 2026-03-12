"use client";


export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated gradient orbs - more subtle */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse [animation-duration:10s] [animation-delay:2s]" />

      {/* Animated beams */}
      <AnimatedBeams />
    </div>
  );
}

function AnimatedBeams() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for horizontal beam */}
        <linearGradient id="beam-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>

        {/* Gradient for vertical beam */}
        <linearGradient id="beam-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>

        {/* Flowing gradient for animated line */}
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0">
            <animate
              attributeName="offset"
              values="-1;1"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6">
            <animate
              attributeName="offset"
              values="-0.5;1.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0">
            <animate
              attributeName="offset"
              values="0;2"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Static grid lines with subtle glow */}
      <g className="opacity-10 dark:opacity-20">
        {/* Vertical lines */}
        <line x1="20%" y1="0" x2="20%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="40%" y1="0" x2="40%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="60%" y1="0" x2="60%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="80%" y1="0" x2="80%" y2="100%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        
        {/* Horizontal lines */}
        <line x1="0" y1="25%" x2="100%" y2="25%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      </g>

      {/* Animated flowing beams */}
      <g filter="url(#glow)">
        {/* Horizontal beam 1 */}
        <rect x="0" y="25%" width="100%" height="1" fill="url(#beam-gradient-h)" className="opacity-30">
          <animate
            attributeName="opacity"
            values="0.1;0.4;0.1"
            dur="4s"
            repeatCount="indefinite"
          />
        </rect>

        {/* Horizontal beam 2 */}
        <rect x="0" y="75%" width="100%" height="1" fill="url(#beam-gradient-h)" className="opacity-20">
          <animate
            attributeName="opacity"
            values="0.05;0.3;0.05"
            dur="5s"
            repeatCount="indefinite"
            begin="1s"
          />
        </rect>

        {/* Vertical beam 1 */}
        <rect x="20%" y="0" width="1" height="100%" fill="url(#beam-gradient-v)" className="opacity-20">
          <animate
            attributeName="opacity"
            values="0.1;0.35;0.1"
            dur="6s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </rect>

        {/* Vertical beam 2 */}
        <rect x="80%" y="0" width="1" height="100%" fill="url(#beam-gradient-v)" className="opacity-20">
          <animate
            attributeName="opacity"
            values="0.05;0.25;0.05"
            dur="7s"
            repeatCount="indefinite"
            begin="2s"
          />
        </rect>
      </g>

      {/* Traveling light particles */}
      <g>
        <TravelingBeam delay={0} startX="0%" endX="100%" y="25%" duration={4} />
        <TravelingBeam delay={2} startX="100%" endX="0%" y="75%" duration={5} />
        <TravelingBeamVertical delay={1} startY="0%" endY="100%" x="20%" duration={6} />
        <TravelingBeamVertical delay={3} startY="100%" endY="0%" x="80%" duration={5} />
      </g>

      {/* Intersection dots */}
      <g className="opacity-40">
        <IntersectionDot cx="20%" cy="25%" delay={0} />
        <IntersectionDot cx="80%" cy="25%" delay={1} />
        <IntersectionDot cx="20%" cy="75%" delay={2} />
        <IntersectionDot cx="80%" cy="75%" delay={0.5} />
        <IntersectionDot cx="40%" cy="50%" delay={1.5} />
        <IntersectionDot cx="60%" cy="50%" delay={2.5} />
      </g>
    </svg>
  );
}

function TravelingBeam({ 
  delay, 
  startX, 
  endX, 
  y, 
  duration 
}: { 
  delay: number; 
  startX: string; 
  endX: string; 
  y: string; 
  duration: number;
}) {
  return (
    <circle r="2" fill="hsl(var(--primary))" filter="url(#glow)" className="opacity-60">
      <animate
        attributeName="cx"
        values={`${startX};${endX}`}
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="cy"
        values={y}
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="opacity"
        values="0;0.8;0.8;0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </circle>
  );
}

function TravelingBeamVertical({ 
  delay, 
  startY, 
  endY, 
  x, 
  duration 
}: { 
  delay: number; 
  startY: string; 
  endY: string; 
  x: string; 
  duration: number;
}) {
  return (
    <circle r="2" fill="hsl(var(--primary))" filter="url(#glow)" className="opacity-60">
      <animate
        attributeName="cy"
        values={`${startY};${endY}`}
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="cx"
        values={x}
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
      <animate
        attributeName="opacity"
        values="0;0.7;0.7;0"
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
      />
    </circle>
  );
}

function IntersectionDot({ 
  cx, 
  cy, 
  delay 
}: { 
  cx: string; 
  cy: string; 
  delay: number;
}) {
  return (
    <g>
      {/* Outer pulse ring */}
      <circle cx={cx} cy={cy} r="0" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5">
        <animate
          attributeName="r"
          values="0;12;12"
          dur="3s"
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
        <animate
          attributeName="opacity"
          values="0.6;0;0"
          dur="3s"
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
      {/* Core dot */}
      <circle cx={cx} cy={cy} r="2" fill="hsl(var(--primary))" filter="url(#glow)">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
        <animate
          attributeName="opacity"
          values="0.4;0.8;0.4"
          dur="2s"
          repeatCount="indefinite"
          begin={`${delay}s`}
        />
      </circle>
    </g>
  );
}

export function HeroBeams() {
  return (
    <svg
      className="absolute inset-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="hero-beam-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-beam-2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(265 70% 55%)" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(265 70% 55%)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </linearGradient>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Diagonal beams */}
      <path
        d="M 0 100 Q 50 50 100 0"
        fill="none"
        stroke="url(#hero-beam-1)"
        strokeWidth="2"
        filter="url(#hero-glow)"
        className="opacity-40"
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 1000;500 500;1000 0"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>

      <path
        d="M 100 100 Q 50 50 0 0"
        fill="none"
        stroke="url(#hero-beam-2)"
        strokeWidth="2"
        filter="url(#hero-glow)"
        className="opacity-30"
        vectorEffect="non-scaling-stroke"
      >
        <animate
          attributeName="stroke-dasharray"
          values="0 1000;500 500;1000 0"
          dur="5s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
    </svg>
  );
}
