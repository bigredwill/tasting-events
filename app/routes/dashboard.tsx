import { Link, useLoaderData } from "@remix-run/react";
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

export let clientLoader: LoaderFunction = async ({ request }) => {
  try {
    const user = await pb
      .collection("users")
      .getOne(pb?.authStore?.model.id, {});
    const events = await pb.collection("Event").getList(1, 20, {
      filter: `id = "${user.events}"`,
    });
    console.log("loader", events);
    return {
      user,
      events,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default function Dashboard(props) {
  const loaderData = useLoaderData();
  console.log(loaderData);
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
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loaderData.events.items.map((event) => (
                    <Link 
                      to={`/event/${event.id}`} 
                      key={event.id} 
                      className="flex table-row cursor-pointer hover:bg-gray-100"
                    >
                      <TableCell>
                        <div className="font-medium">{event.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {event.location}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        {event.type}
                      </TableCell>
                      <TableCell className="hidden xl:table-column">
                        <Badge className="text-xs" variant="outline">
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {event.date}
                      </TableCell>
                    </Link>
                  ))}
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
