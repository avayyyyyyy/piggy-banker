import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { ModeToggle } from "@/components/ui/ToggleTheme";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const userSession = await auth();

  if (userSession?.user?.email) {
    return redirect("/dashboard");
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Home Page
      </main>
    </>
  );
}
