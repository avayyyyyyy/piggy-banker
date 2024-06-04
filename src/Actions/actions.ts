"use server";
import { signIn, signOut } from "@/auth";
export const signInGithub = async () => {
  await signIn("github");
};

export const signInGoogle = async () => {
  await signIn("google");
};

export const logout = async () => {
  await signOut();
};
