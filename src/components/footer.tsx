import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="font-mono bg-background py-10 sm:py-12 px-6 md:px-16 lg:px-24  pt-8 mt-8 text-center border-t border-muted">
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
    </footer>
  );
};

export default Footer;
