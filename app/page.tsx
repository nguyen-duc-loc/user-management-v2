import React from "react";

import { getUsers } from "@/data/users";

import Header from "./_components/Header";
import TablePagination from "./_components/Pagination";
import SelectLimit from "./_components/SelectLimit";
import UserTable from "./_components/UserTable";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) => {
  const { page = "", limit = "" } = await searchParams;
  const defaultCurrentLimit = 5;
  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.max(
    Number(limit) || defaultCurrentLimit,
    defaultCurrentLimit
  );

  const { totalUsers, users } = await getUsers(currentPage, currentLimit);

  return (
    <>
      <Header totalUsers={totalUsers} />
      <UserTable users={users} />
      <div className="mt-6 flex items-center justify-between pb-6">
        <SelectLimit currentLimit={currentLimit} />
        <TablePagination
          count={totalUsers}
          currentLimit={currentLimit}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Page;
