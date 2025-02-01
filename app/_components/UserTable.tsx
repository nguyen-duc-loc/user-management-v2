import { format } from "date-fns";
import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const UserTable = ({ users }: { users: User[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User ID</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(({ id, fullname, email, birthdate, phone, avatar }) => (
          <TableRow key={`user-${id}`}>
            <TableCell className="text-center">{id}</TableCell>
            <TableCell className="text-center">
              <Link
                href={`/user/${id}`}
                className="group flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage
                    src={avatar ?? undefined}
                    className="object-cover"
                  />
                  <AvatarFallback>{fullname[0]}</AvatarFallback>
                </Avatar>
                <span className="group-hover:underline group-hover:underline-offset-4">
                  {fullname}
                </span>
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {format(birthdate, "dd/MM/yyyy")}
            </TableCell>
            <TableCell className="text-center">{email}</TableCell>
            <TableCell className="text-center">{phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
