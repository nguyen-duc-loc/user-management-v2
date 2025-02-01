"use client";

import React from "react";

import { createUser } from "@/actions/users";
import UserForm from "@/components/forms/UserForm";

const AddUserForm = () => {
  return (
    <UserForm
      formType="CREATE"
      defaultValues={{
        fullname: "",
        email: "",
        birthdate: new Date(2003, 7, 5),
        phone: "",
      }}
      onSubmit={async (data) => await createUser(data)}
    />
  );
};

export default AddUserForm;
