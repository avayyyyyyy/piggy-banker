"use client";
import EmojiPicker from "emoji-picker-react";
import {
  Calendar as CalendarIcon,
  PlusSquare,
  UploadCloudIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import React, { useState } from "react";

import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getExpenseCategories,
  getIncomeCategories,
  saveCategoryExpense,
  saveCategoryIncome,
} from "@/actions/actions";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

function NewIncomeManage() {
  const router = useRouter();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryInfo, setCategoryInfo] = useState({
    title: "",
    icon: "",
  });
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const { mutate: saveCategoryFnc, isPending: categoryLoading } = useMutation({
    mutationKey: ["saveCategoryExpense"],
    mutationFn: async () => {
      await saveCategoryExpense(categoryInfo);
    },

    onSuccess: () => {
      toast.success("Category added successfully! 🎉");
      setCategoryOpen(false);
      setCategoryInfo({
        title: "",
        icon: "",
      });
      router.refresh();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleCategorySubmit(e: FormEvent) {
    e.preventDefault();
    saveCategoryFnc();
  }

  return (
    <div>
      <Dialog open={categoryOpen} onOpenChange={setCategoryOpen}>
        <DialogTrigger asChild>
          <Button size={"sm"} className="flex gap-2 items-center">
            <PlusSquare />
            Create Category
          </Button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[425px] max-w-[80vw] ">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter the name and icon for the new category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCategorySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Input
                  placeholder="Name of your category"
                  onChange={(e) =>
                    setCategoryInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="col-span-4"
                  id="categoryName"
                />
              </div>
              <div className=" w-full  items-center grid-cols-4 gap-4">
                <div className="flex flex-col w-[100%] p-4 rounded-lg hover:bg-primary/20 cursor-pointer border-primary/40 border border-dashed  justify-center items-center">
                  {categoryInfo.icon === "" ? (
                    <div
                      onClick={() => {
                        setEmojiPickerOpen(true);
                      }}
                      className="flex flex-col items-center  w-full"
                    >
                      {emojiPickerOpen ? (
                        <EmojiPicker
                          open={emojiPickerOpen}
                          onEmojiClick={(e) => {
                            setCategoryInfo((prev) => ({
                              ...prev,
                              icon: e.emoji,
                            }));
                            setEmojiPickerOpen(false);
                          }}
                        />
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <UploadCloudIcon />
                          <p className="text-right">Select Icon</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-3xl">{categoryInfo.icon}</div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button disabled={categoryLoading} type="submit">
                Save{" "}
                {categoryLoading && (
                  <Loader className="animate-spin ml-2" size={18} />
                )}
              </Button>
              <div>
                <Button
                  onClick={() => {
                    setCategoryOpen(false);
                    setCategoryInfo({
                      title: "",
                      icon: "",
                    });
                  }}
                  variant="outline"
                  type="reset"
                  className="w-full mb-2"
                >
                  Cancel
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewIncomeManage;
