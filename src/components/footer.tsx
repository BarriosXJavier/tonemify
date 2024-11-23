import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="font-mono bg-background py-10 sm:py-12 px-6 md:px-16 lg:px-24  pt-8 mt-8 text-center border-t border-muted">
      <div className="grid gap-8 md:grid-cols-2 lg:gap-16 justify-center max-w-3xl mx-auto ">
        <div className="">
          <header>
            <h1 className="text-primary dark:text-foreground text-2xl font-semibold mb-4">
              Quick Links
            </h1>
          </header>
          <ul className="space-y-3 md:space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Faqs", href: "#faqs" },
            ].map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="md:hover:text-primary text-muted-foreground text-sm md:text-base transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools Used Section */}
        <div>
          <header>
            <h1 className="text-primary dark:text-foreground text-2xl font-semibold mb-4">
              Tools Used
            </h1>
          </header>
          <ul className="space-y-3 md:space-y-4">
            {[
              { name: "Next.js", href: "https://nextjs.org/" },
              { name: "React", href: "https://reactjs.org/" },
              { name: "Tailwind CSS", href: "https://tailwindcss.com/" },
              { name: "ShadCN", href: "https://ui.shadcn.com/" },
            ].map((platform, index) => (
              <li key={index}>
                <Link
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:hover:text-primary text-muted-foreground text-sm md:text-base transition-all"
                >
                  {platform.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="border-t border-muted pt-8 mt-8 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base flex items-center gap-2 justify-center">
          &copy; TonemifyLabs {new Date().getFullYear()}. All rights reserved.{" "}
          <Link
            href="https://x.com/barrios__x"
            className="flex items-center gap-1"
            target="_blank noopener"
          >
            <Image src="/x.png" alt="x logo" width={20} height={20} />
            barriös__x
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
