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

    // filter by future date
    const event = await pb.collection("Event").getOne(params.id, {});
    return {
      user,
      event,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

export default function Event(props) {
  const { user, event } = useLoaderData();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card x-chunk="A card showing the details of the event.">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{new Date(event.date).toDateString()}</CardTitle>
              <Martini className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event.name}</div>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <p className="text-sm text-muted-foreground">{event.type}</p>
              <Badge className="text-xs" variant="outline">
                {event.status}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
