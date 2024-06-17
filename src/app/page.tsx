import { signInGoogle } from "../lib/actions";
import { auth } from "@/auth";
import AnimatedGradientText from "@/components/Custom/animated-gradient-text";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
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
      <main className="flex min-h-[80vh] m-auto flex-col items-center justify-between z-10">
        <div className="flex flex-col my-10  items-center ">
          <AnimatedGradientText>
            🚀 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-400" />{" "}
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              Introducing Piggy Banker
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          <div className="md:text-7xl text-3xl shadow-lg  text-center font-bold bg-gradient-to-br from-white to-white/30 bg-clip-text text-transparent  max-w-[80vw] mt-10">
            Master your money.
            <br /> Track and grow effortlessly.
          </div>
          <form action={signInGoogle}>
            <Button
              type="submit"
              className="rounded-full mt-4 md:mt-8"
              variant={"secondary"}
            >
              <span className="text-xs md:text-lg">
                Create Your First Transaction Now!
              </span>
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </form>
          <Image
            src="https://utfs.io/f/aff53f48-4837-46e2-9b10-7afdeb746b8c-ler19.webp"
            alt="Hero Image"
            className="mx-auto z-30 p-4 rounded-lg"
            width={800}
            height={800}
          />
        </div>
      </main>
    </>
  );
}
