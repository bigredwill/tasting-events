import { Link } from "@remix-run/react";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Martini,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import pb from "@/lib/pocketbase";

export const description = "";

// export const iframeHeight = "825px"

export const containerClassName = "w-full h-full";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="A card showing the total revenue in USD and the percentage difference from last month.">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Event</CardTitle>
              <Martini className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Mezcal Tasting</div>
              <p className="text-xs text-muted-foreground">
                {`In ${Math.ceil(
                  (new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).getTime() -
                    Date.now()) /
                    (24 * 60 * 60 * 1000)
                )} days`}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2"
            x-chunk="A card showing a table of recent transactions with a link to view all transactions."
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Events</CardTitle>
                <CardDescription>
                  Future or past events you've signed up for.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to="/events">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="hidden xl:table-column">
                      Type
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Status
                    </TableHead>
                    <TableHead className="hidden xl:table-column">
                      Amount
                    </TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Mezcal Tasting</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        5678 Broadway, New York, NY 10036
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      Sale
                    </TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">2024-12-20</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card x-chunk="A card showing a list of recent sales with customer names and email addresses.">
            <CardHeader>
              <CardTitle>Recent Favorites</CardTitle>
              <CardDescription>
                Notable products you've liked at events.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>WM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Wahaka Mezcal Espadín
                  </p>
                  <p className="text-sm text-muted-foreground">Wahaka Mezcal</p>
                </div>
                <div className="ml-auto font-medium">$40</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
