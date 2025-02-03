"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Trash2, CornerUpLeft, FilePenLine } from "lucide-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { AvatarSchema } from "@/lib/schema";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type AvatarData = z.infer<typeof AvatarSchema>;

interface AvatarProps {
  user: User;
  onSubmit: (data: AvatarData) => Promise<{ success: boolean }>;
  onDelete: () => Promise<{ success: boolean }>;
  className?: string;
}

const AvatarForm = ({ user, onSubmit, onDelete, className }: AvatarProps) => {
  const form = useForm<AvatarData>({
    resolver: zodResolver(AvatarSchema),
  });

  const [deleting, startDeleteUser] = useTransition();

  const defaultImgUrl = user.avatar ?? undefined;
  const [imgUrl, setImgUrl] = useState<string | undefined>(defaultImgUrl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      setImgUrl(defaultImgUrl);
      return;
    }

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setImgUrl(defaultImgUrl);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImgUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (data: AvatarData) => {
    const result = await onSubmit(data);
    if (!result.success) {
      toast.error("Failed to update avatar. Try again later.");
      return;
    }

    form.reset();
    toast.success("Updated avatar successfully!");
  };

  const handleDelete = () => {
    startDeleteUser(async () => {
      const result = await onDelete();
      if (!result.success) {
        toast.error(`Failed to delete avatar. Try again later.`);
        return;
      }

      setImgUrl(defaultImgUrl);
      toast.success("Deleted avatar successfully!");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`${className}`}
      >
        <FormField
          name="image"
          control={form.control}
          render={() => (
            <div className="mb-8 flex flex-col items-center gap-4">
              <Avatar className="size-48">
                <AvatarImage src={imgUrl} className="object-cover" />
                <AvatarFallback className="text-4xl">
                  {user.fullname[0]}
                </AvatarFallback>
              </Avatar>
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...form.register("image")}
                    onChange={handleChange}
                    className="w-60"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <div className="flex justify-between max-[420px]:flex-col-reverse max-[420px]:gap-4">
          <Button
            type="button"
            variant="secondary"
            className="mr-auto text-red-500"
            disabled={deleting}
            onClick={handleDelete}
          >
            {deleting ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
            {deleting ? "Deleting" : "Delete"} avatar
          </Button>
          <div>
            <Button type="button" variant="outline" className="mr-4" asChild>
              <Link href="/">
                <CornerUpLeft />
                Back
              </Link>
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <FilePenLine />
              )}
              {form.formState.isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AvatarForm;
