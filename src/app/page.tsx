import Image from "next/image";
import UserList from "./components/UserList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-10">
      <h1 className="text-2xl fond-bold">Users</h1>
      <UserList />
    </main>
  );
}
