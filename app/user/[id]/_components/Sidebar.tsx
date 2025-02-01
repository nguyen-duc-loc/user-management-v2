"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { removeKeysFromQuery, formUrlQuery } from "@/lib/url";

import { TabName } from "../page";

const Sidebar = ({ currentTab }: { currentTab: TabName }) => {
  const tabs: TabName[] = ["profile", "avatar"];
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSwitchTab(tab: TabName) {
    let newUrl: string;

    if (tab === "profile") {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["tab"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "tab",
        value: tab,
      });
    }

    router.push(newUrl, { scroll: false });
  }

  return (
    <nav className="flex flex-wrap gap-2 lg:flex-col">
      {tabs.map((tab) => (
        <Button
          key={tab}
          variant={currentTab === tab ? "secondary" : "ghost"}
          className="grow capitalize lg:mb-2 lg:grow-0 lg:justify-start"
          onClick={() => handleSwitchTab(tab)}
        >
          {tab}
        </Button>
      ))}
    </nav>
  );
};

export default Sidebar;
