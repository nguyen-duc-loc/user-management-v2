import React from "react";

import AddUserForm from "./_components/AddUserForm";
import Header from "../_components/Header";

const Page = () => {
  return (
    <>
      <Header title="Add new user" />
      <AddUserForm />
    </>
  );
};

export default Page;
