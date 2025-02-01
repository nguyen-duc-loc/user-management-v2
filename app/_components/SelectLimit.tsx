"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { removeKeysFromQuery, formUrlQuery } from "@/lib/url";

const SelectLimit = ({ currentLimit }: { currentLimit: number }) => {
  const defaultLimit = 5;
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (value: string) => {
    let newUrl: string;

    if (Number(value) === defaultLimit) {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["limit"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "limit",
        value,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currentLimit.toString()}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder={`${currentLimit} / page`} />
      </SelectTrigger>
      <SelectContent align="start">
        {[5, 10, 20].map((pageSize) => (
          <SelectItem
            key={`page-size-${pageSize}`}
            value={pageSize.toString()}
            className="capitalize"
          >
            {`${pageSize} / page`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectLimit;
