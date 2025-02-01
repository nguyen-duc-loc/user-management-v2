"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  CornerUpLeft,
  FilePenLine,
  LoaderCircle,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { DefaultValues, Path, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { UserSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type UserData = z.infer<typeof UserSchema>;

interface UserFormProps {
  defaultValues: UserData;
  formType: "CREATE" | "UPDATE";
  onSubmit: (data: UserData) => Promise<{ success: boolean }>;
  onDelete?: () => Promise<{ success: boolean }>;
  className?: string;
}

const UserForm = ({
  defaultValues,
  formType,
  onSubmit,
  onDelete,
  className,
}: UserFormProps) => {
  const buttonText =
    formType.charAt(0).toUpperCase() + formType.slice(1).toLowerCase();

  const form = useForm<UserData>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultValues as DefaultValues<UserData>,
  });

  const [deleting, startDeleteUser] = useTransition();
  const router = useRouter();

  const handleSubmit = async (data: UserData) => {
    const result = await onSubmit(data);
    if (!result.success) {
      toast.error(`Failed to ${buttonText.toLowerCase()}. Try again later.`);
      return;
    }

    if (formType === "CREATE") {
      form.reset();
    }

    toast.success(`${buttonText}d successfully!`);
  };

  const handleDelete = () => {
    startDeleteUser(async () => {
      if (!onDelete) return;

      const result = await onDelete();
      if (!result.success) {
        toast.error(`Failed to delete user. Try again later.`);
        return;
      }

      toast.success("Deleted user successfully!");
      router.push("/");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        noValidate
        className={`${className}`}
      >
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<UserData>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block capitalize">
                    {field.name === "email"
                      ? "email address"
                      : field.name === "birthdate"
                      ? "date of birth"
                      : field.name}
                  </FormLabel>
                  <FormControl>
                    {field.name === "birthdate" ? (
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            captionLayout="dropdown-buttons"
                            defaultMonth={field.value as Date}
                            fromYear={1900}
                            toMonth={new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    ) : (
                      <Input
                        required
                        {...field}
                        value={field.value as string | number}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-between max-[420px]:flex-col-reverse max-[420px]:gap-4">
          {formType === "UPDATE" && (
            <Button
              type="button"
              variant="secondary"
              className="mr-auto text-red-500"
              disabled={deleting}
              onClick={handleDelete}
            >
              {deleting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Trash2 />
              )}
              {deleting ? "Deleting" : "Delete"} user
            </Button>
          )}
          <div className="[420px]:ml-auto">
            <Button type="button" variant="outline" className="mr-4" asChild>
              <Link href="/">
                <CornerUpLeft />
                Back
              </Link>
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : formType === "CREATE" ? (
                <Plus />
              ) : (
                <FilePenLine />
              )}
              {form.formState.isSubmitting
                ? `${buttonText.slice(0, -1)}ing...`
                : buttonText}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
