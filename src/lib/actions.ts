"use server";
import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import getFinancialAdvice from "./FinanceAdvisor";
import { User } from "lucide-react";
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

    // console.log(Usercurrency);

    if (Usercurrency == "") {
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

    // console.log(Usercurrency);

    return { status: "ok" };
  } catch (err) {
    throw new Error("Select a valid currency.");
  }
};

type SaveCategoryParams = {
  title: string;
  icon: string;
};

export const saveCategoryExpense = async ({
  title,
  icon,
}: SaveCategoryParams) => {
  try {
    const session = await auth();

    if (!title || !icon) {
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

    const category = await prisma.category.create({
      data: {
        name: title,
        icon: icon,
        userId: user.id,
        type: "expense",
      },
    });

    return { success: "ok", category };
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error("Unable to create category.");
  }
};

export const saveCategoryIncome = async ({
  title,
  icon,
}: SaveCategoryParams) => {
  try {
    const session = await auth();

    if (!title || !icon) {
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

    const category = await prisma.category.create({
      data: {
        name: title,
        icon: icon,
        userId: user.id,
        type: "income",
      },
    });

    return { success: "ok", category };
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error("Unable to create category.");
  }
};

export const getExpenseCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    const filtered = categories.filter((e) => e.type !== "income");
    return filtered;
  } catch (err) {
    throw new Error("Unable To fectch categories");
  }
};

export const getIncomeCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    const filtered = categories.filter((e) => e.type === "income");
    return filtered;
  } catch (err) {
    throw new Error("Unable To fectch categories");
  }
};

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        icon: true,
        name: true,
        id: true,
      },
    });
    return categories;
  } catch (err) {
    throw new Error("Unable To fectch categories");
  }
};

export async function getTransactionsSummary() {
  try {
    var trans = await getTransaction();
    const session = await auth();

    // console.log(trans);

    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email!,
      },
    });

    if (trans.length <= 6) {
      await prisma.user.update({
        where: {
          id: user?.id!,
        },
        data: {
          summary: "You have less than 6 transactions to provide advice 🚀.",
        },
      });
    } else {
      var summaryToSave;
      getFinancialAdvice()
        .then((advice) => {
          summaryToSave = advice;
          return summaryToSave;
        })
        .then(async (summaryToSave) => {
          // console.log(summaryToSave);
          const saved = await prisma.user.update({
            where: {
              id: user?.id!,
            },
            data: {
              summary: summaryToSave!,
            },
          });
        });
    }
    return { status: "ok" };
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

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

    const catIcon = body.category.split(" ")[0];
    const cat = body.category.split(" ")[1] || body.category.split(" ")[2];

    // console.log(cat);
    // console.log(catIcon);

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
        category: cat,
        categoryIcon: catIcon,
        userId: user.id,
      },
    });

    await getTransactionsSummary();

    return { status: "ok" };
  } catch (err) {
    throw new Error("Unable to create income, Please try again.");
  }
};

export const saveExpense = async (body: {
  desc: string;
  price: string;
  category: string;
  date: Date | undefined;
}) => {
  try {
    const session = await auth();
    // console.log(body);

    if (!body.category || !body.date || !body.desc || !body.price) {
      throw new Error("Please enter valid inputs");
    }

    const catIcon = body.category.split(" ")[0];
    const cat = body.category.split(" ")[1] || body.category.split(" ")[2];

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

    const expense = await prisma.transaction.create({
      data: {
        amount: parseFloat(body.price),
        description: body.desc,
        date: body.date,
        category: cat,
        categoryIcon: catIcon,
        type: "expense",
        userId: user.id,
      },
    });
    await getTransactionsSummary();

    return { status: "ok" };
  } catch (err) {
    throw new Error("Unable to create income, Please try again.");
  }
};

export const getTransaction = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: [
      {
        date: "desc",
      },
    ],
  });

  return transactions;
};

export const getUserDetails = async () => {
  const session = await auth();

  return session;
};

export const deleteCategory = async (id: string) => {
  try {
    const deleted = await prisma.category.delete({
      where: {
        id,
      },
    });
    return deleted;
  } catch (err) {
    throw new Error("Unable to delete category!");
  }
};

export const deleteTransaction = async (id: string) => {
  try {
    const trans = await prisma.transaction.delete({
      where: {
        id,
      },
    });

    return trans;
  } catch (err) {
    throw new Error("Unable to delete.");
  }
};
