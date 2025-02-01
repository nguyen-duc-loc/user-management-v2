import { notFound } from "next/navigation";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/data/users";

import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";
import UpdateAvatarForm from "./_components/UpdateAvatarForm";
import UpdateProfileForm from "./_components/UpdateProfileForm";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    return {
      title: "404: User not found",
    };
  }
  return {
    title: user.fullname,
  };
};

export type TabName = "profile" | "avatar";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    notFound();
  }

  const { tab = "" } = await searchParams;
  const defaultTab: TabName = "profile";
  const currentTab = (tab as TabName) || defaultTab;

  return (
    <>
      <Header title="Settings" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1px_3fr] lg:gap-6">
        <Sidebar currentTab={currentTab} />
        <Separator orientation="vertical" className="max-lg:hidden" />
        {currentTab === "profile" ? (
          <UpdateProfileForm user={user} />
        ) : (
          <UpdateAvatarForm user={user} />
        )}
      </div>
    </>
  );
};

export default Page;
