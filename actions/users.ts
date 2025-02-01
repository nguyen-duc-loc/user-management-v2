"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { AvatarSchema, UserSchema } from "@/lib/schema";

export const createUser = async (
  data: z.infer<typeof UserSchema>
): Promise<{ success: boolean; data: User | null }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const result: { success: boolean; data: User | null } = await response.json();

  if (result.success) {
    revalidatePath("/");
  }

  return result;
};

export const updateUserById = async (
  id: number,
  data: z.infer<typeof UserSchema>
): Promise<{ success: boolean; data: User | null }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const result: { success: boolean; data: User | null } = await response.json();

  if (result.success) {
    revalidatePath(`/user/${id}`);
  }

  return result;
};

export const deleteUserById = async (
  id: number
): Promise<{ success: boolean }> => {
  const response = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return {
      success: false,
    };
  } else {
    revalidatePath("/");
  }

  return { success: response.status === 204 };
};

export const updateUserAvatar = async (
  userId: number,
  data: z.infer<typeof AvatarSchema>
): Promise<{ success: boolean; data: { avatarUrl: string | null } | null }> => {
  const formData = new FormData();
  formData.append("image", data.image[0]);

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/users/${userId}/avatar`,
    {
      method: "PUT",
      body: formData,
    }
  );

  const result: {
    success: boolean;
    data: { avatarUrl: string | null } | null;
  } = await response.json();

  if (result.success) {
    revalidatePath(`/user/${userId}`);
  }

  return result;
};

export const deleteUserAvatar = async (
  userId: number
): Promise<{ success: boolean }> => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/users/${userId}/avatar`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return {
      success: false,
    };
  } else {
    revalidatePath("/");
    revalidatePath(`/users/${userId}`);
  }

  return { success: response.status === 204 };
};
