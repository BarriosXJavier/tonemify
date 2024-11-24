import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Coffee } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function SupportDropdown() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyPaypal = () => {
    navigator.clipboard.writeText("muriithid05@gmail.com");
    toast.success("PayPal email copied to clipboard");
  };

  if (!isClient) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-primary dark:text-primary-foreground hover:text-secondary dark:hover:text-secondary-foreground max-md:bg-secondary"
        >
          <span className="max-md:text-base">Support project</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuItem asChild>
          <Link
            href="https://buymeacoffee.com/barrios"
            className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-primary dark:text-primary-foreground hover:bg-gray-100 dark:hover:bg-dark-hover"
          >
            <Coffee className="h-4 w-4" />
            <span className="font-medium">Buy Me a Coffee</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyPaypal}
          className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-primary dark:text-primary-foreground hover:bg-gray-100 dark:hover:bg-dark-hover"
        >
          <Image src="/paypal.png" alt="PayPal Logo" width={20} height={20} />
          <span className="font-medium">Copy PayPal Email</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
