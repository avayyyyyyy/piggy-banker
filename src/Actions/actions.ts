"use server";
import { auth, signIn, signOut } from "@/auth";
import prisma from "@/db";
export const signInGithub = async () => {
  await signIn("github");
};

export const signInGoogle = async () => {
  await signIn("google");
};

export const logout = async () => {
  await signOut();
};

export const saveCurrency = async (Usercurrency: string) => {
  try {
    const session = await auth();
    const currency = await prisma.user.update({
      where: {
        email: session?.user?.email!,
      },
      data: {
        currency: Usercurrency,
      },
    });

    return { status: "ok" };
  } catch (err) {
    throw new Error("Currency Not Updated");
  }
};
