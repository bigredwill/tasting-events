import { Link } from "@remix-run/react";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import pb from '@/lib/pocketbase';

export function MainNav({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Tasting Events</span>
        </Link>
        <Link
          to="/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>
        <Link
          to="/events"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Events
        </Link>
        <Link
          to="/favorites"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Favorites
        </Link>
      </nav>
      {/* Mobile nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Tasting Events</span>
            </Link>
            <Link to="#" className="hover:text-foreground">
              Home
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Events
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Favorites
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Customers
            </Link>
            <Link
              to="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {/* <CircleUser className="h-5 w-5" /> */}
              <Avatar className="hidden h-5 w-5 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{pb?.authStore?.model?.name.slice(0,2) ?? '  '}</AvatarFallback>
                </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link to='/logout'><DropdownMenuItem>Logout</DropdownMenuItem></Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
