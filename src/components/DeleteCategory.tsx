"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeleteCategory({
  id,
  icon,
  name,
}: {
  id: string;
  icon: string;
  name: string;
}) {
  const router = useRouter();

  const DeleteCategoryFnc = useMutation({
    mutationKey: ["CategoryDelete"],
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      router.refresh();
    },
    onError: () => {
      toast.error("Unable to  deleted Category!");
    },
  });

  return (
    <div>
      <div
        key={id}
        className="p-3 border rounded-lg flex gap-2  flex-col justify-center items-center"
      >
        <div className="text-center flex flex-col gap-2">
          <div className="text-5xl">{icon}</div>
          <div className="text-sm">{name}</div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"secondary"} className="">
              <Trash size={16} className="mr-2" /> Remove
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                category and remove your category data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  DeleteCategoryFnc.mutate(id);
                }}
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default DeleteCategory;
