"use server";
import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
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

    console.log(Usercurrency);

    if (Usercurrency === "") {
      throw new Error("Select a valid currency.");
    }
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
    throw new Error("Select a valid currency.");
  }
};

type SaveCategoryParams = {
  title: string;
  icon: string;
};

export const saveCategory = async ({ title, icon }: SaveCategoryParams) => {
  console.log(title, icon);
  try {
    const session = await auth();

    if (!title || !icon) {
      console.log(title, icon);

      throw new Error("Input Fields are required!");
    }

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    console.log(user);

    const category = await prisma.category.create({
      data: {
        name: title,
        icon: icon,
        userId: user.id,
      },
    });

    console.log(category);
    return { success: "ok" };
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error("Unable to create category.");
  }
};

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    console.log(categories);
    return categories;
  } catch (err) {
    throw new Error("Unable To fectch categories");
  }
};

export const saveIncome = async (body: {
  desc: string;
  price: string;
  category: string;
  date: Date | undefined;
}) => {
  try {
    const session = await auth();

    if (!body.category || !body.date || !body.desc || !body.price) {
      throw new Error("Please enter valid inputs");
    }

    console.log(body);

    const catIcon = body.category.split(" ")[0];

    console.log(catIcon);

    if (!session?.user?.email) {
      throw new Error("User is not authenticated");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const income = await prisma.transaction.create({
      data: {
        amount: parseFloat(body.price),
        description: body.desc,
        date: body.date,
        category: body.category,
        categoryIcon: catIcon,
        userId: user.id,
      },
    });

    return { status: "ok" };
  } catch (err) {
    throw new Error("Unable to create income, Please try again.");
  }
};
