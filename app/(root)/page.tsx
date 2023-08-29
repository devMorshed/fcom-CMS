import { UserButton, UserProfile } from "@clerk/nextjs";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-4xl">Admin Dashboard</h1>
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Home;
