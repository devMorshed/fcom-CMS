import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center gap-4 px-10 border-b h-16">
        <p>Store Switcher</p>

        <MainNav />

        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </>
  );
}
