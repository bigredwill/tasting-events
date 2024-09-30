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

export let clientLoader: LoaderFunction = async ({ params }) => {
  try {
    const user = await pb
      .collection("users")
      .getOne(pb?.authStore?.model.id, {});
    const userEvents = await pb.collection("Event").getList(1, 20, {
      filter: `id = "${user.events}"`,
    });

    // filter by future date
    const publicEvents = await pb.collection("Event").getList(1, 20, {});
    return {
      user,
      userEvents,
      publicEvents,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default function Event(props) {
  const loaderData = useLoaderData();
  console.log(loaderData);
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
                    <TableRow key={event.id}>
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
                      <TableCell className="text-right">{event.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
