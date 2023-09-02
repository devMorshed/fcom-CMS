import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitch from "./store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <>
      <div className="flex items-center gap-4 px-10 border-b h-16">
        <StoreSwitch items={stores} />
        <MainNav />
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </>
  );
}
