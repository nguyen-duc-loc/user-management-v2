"use client";

import React from "react";

import { deleteUserAvatar, updateUserAvatar } from "@/actions/users";
import AvatarForm from "@/components/forms/AvatarForm";

const UpdateAvatarForm = ({ user }: { user: User }) => {
  return (
    <AvatarForm
      user={user}
      onSubmit={async (data) => await updateUserAvatar(user.id, data)}
      onDelete={async () => await deleteUserAvatar(user.id)}
    />
  );
};

export default UpdateAvatarForm;
