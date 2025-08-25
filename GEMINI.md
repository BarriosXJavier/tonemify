# GEMINI.md

## Project Context
Tonemify is a theme generator for shadcn/ui. Its primary function is to take user-selected base colors and generate a complete, valid Tailwind CSS theme configuration, formatted specifically for shadcn/ui's component-based theming.

## Goal
The goal of this agent is to help me refactor, add new features, and troubleshoot the core theme generation logic. The generated code must be **production-quality** and adhere to the project's established conventions.

## Core Directives
1.  **Prioritize Clarity:** All generated code must be well-structured and easy to read.
2.  **Adhere to conventions:** Use TypeScript. Do not introduce new dependencies unless absolutely necessary.
3.  **Produce Valid Output:** The final output must be valid that is, can be directly consumed by a Next.js/shadcn project.

## Tech Stack
* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS, shadcn/ui
* **Utility Libraries:**
    * `react-color`: For color picker components.
    * `tailwind-merge`: for merging Tailwind classes.
    * `class-variance-authority`: for component styling.
* **Core Logic:** The theme generation logic relies on custom functions to transform hex colors into a full palette of 9 shades, along with `foreground` and `accent` colors, following shadcn's naming conventions (`--background`, `--foreground`, etc.).

## Project Structure
* `app/`: Main Next.js routing.
* `lib/`: Core logic and utility functions. This is where the theme generation functions live.
* `components/`: Reusable React components.

