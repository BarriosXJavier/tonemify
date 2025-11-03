import {
  Calendar,
  ChevronUp,
  Home,
  Inbox,
  LogIn,
  Plus,
  Projector,
  Search,
  Settings,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
      <Sidebar collapsible="icon" className="!relative !inset-auto !h-full border-r bg-sidebar">
        <SidebarHeader className="p-4 border-b bg-sidebar">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="font-semibold">
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">D</span>
                  </div>
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator className="bg-sidebar-border" />
        <SidebarContent className="bg-sidebar">
          <SidebarGroup className="px-2 py-4">
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.title === "Inbox" && (
                      <SidebarMenuBadge className="bg-primary text-primary-foreground">21</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup className="px-2 py-2">
              <SidebarGroupLabel asChild className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">
                <CollapsibleTrigger className="flex items-center justify-between w-full hover:text-sidebar-foreground transition-colors">
                  Teams <ChevronUp className="h-3.5 w-3.5 transition-transform group-data-[state=closed]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2">
                          <Projector className="h-4 w-4" />
                          Engineering
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="/" className="flex items-center gap-3 px-3 py-2">
                          <Plus className="h-4 w-4" />
                          Design
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <SidebarGroup className="px-2 py-2">
            <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wider mb-2">Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2">
                      <Projector className="h-4 w-4" />
                      Resources
                    </Link>
                  </SidebarMenuButton>
                  <SidebarMenuSub className="ml-4 mt-1 space-y-1 border-l border-sidebar-border pl-2">
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
                          <span className="text-xs">Documents</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
                          <span className="text-xs">Templates</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                        <Link href="/" className="flex items-center gap-2 px-2 py-1.5">
                          <span className="text-xs">Media</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4 border-t border-sidebar-border bg-sidebar">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="hover:bg-sidebar-accent">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-xs font-semibold">JD</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">John Doe</p>
                        <p className="text-xs text-sidebar-foreground/60 truncate">john@example.com</p>
                      </div>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4 flex-shrink-0" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="end" className="w-56">
                  <DropdownMenuItem className="cursor-pointer">
                    <User2 className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
};

export default AppSidebar;
