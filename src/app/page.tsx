import { signInGoogle } from "../lib/actions";
import { auth } from "@/auth";
import AnimatedGradientText from "@/components/Custom/animated-gradient-text";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          <Link
            className="mb-6"
            href={"https://peerlist.io/avayyyyyyy/project/piggy-banker"}
          >
            <Image
              src={"https://peerlist.io/images/Launch_Badge_Dark.svg"}
              width={150}
              height={150}
              alt="peerlist"
            />
          </Link>
          <AnimatedGradientText>
            🚀 <hr className="mx-2  h-4 w-[1px] shrink-0 bg-gray-400" />{" "}
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
          <div className="relative mt-6 md:mt-0  flex md:max-w-6xl max-w-[80%] justify-center overflow-hidden">
            <Image
              src="https://utfs.io/f/aff53f48-4837-46e2-9b10-7afdeb746b8c-ler19.webp"
              alt="hero-section"
              width={800}
              height={800}
              className="h-full w-full rounded-lg object-cover md:w-[1300px]"
              style={{
                maskImage: `linear-gradient(to top, transparent, black 90%)`,
              }}
            />
          </div>
        </div>
      </main>
    </>
  );
}
