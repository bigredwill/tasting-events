import { redirect } from "@remix-run/react";
import pb from '@/lib/pocketbase';

export let clientLoader = async () => {
  pb.authStore.clear();
  return redirect("/login");
};

export default function Logout() {
  return null;
}
