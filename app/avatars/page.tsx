import { format } from "date-fns";
import { Archive, CalendarDays, FolderOpen, KeyRound } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

import { getAvatars } from "@/data/avatars";

export const metadata: Metadata = {
  title: "Avatars",
  description: "All users' avatar",
};

export const dynamic = "force-dynamic";

const Page = async () => {
  const data = await getAvatars();
  if (!data) {
    return null;
  }

  const { bucketName, numberOfObjects, objects } = data;
  objects.sort((obj1, obj2) => {
    return (
      new Date(obj2.LastModified).getTime() -
      new Date(obj1.LastModified).getTime()
    );
  });

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold">
        Bucket name: <span className="text-muted-foreground">{bucketName}</span>
      </h3>
      <h3 className="mb-10 text-lg font-semibold">
        Number of objects:{" "}
        <span className="text-muted-foreground">{numberOfObjects}</span>
      </h3>

      {objects?.map(({ Url, Key, LastModified, Size, StorageClass }) => (
        <div
          className="mx-auto mb-6 flex w-fit items-center gap-10 rounded-lg border p-6 text-sm max-sm:flex-col [&_svg]:size-5"
          key={Key}
        >
          <Image
            src={Url}
            alt={Key}
            width={160}
            height={160}
            className="rounded object-cover"
          />
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <KeyRound className="text-red-500" />
              <div>
                <span className="font-semibold">Key: </span>
                {Key}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <CalendarDays className="text-blue-500" />
              <div>
                <span className="font-semibold">Last modified: </span>
                {format(LastModified, "dd/MM/yyyy 'at' HH:mm")}
              </div>
            </li>
            <li className="flex items-center gap-2">
              <FolderOpen className="text-yellow-500" />
              <div>
                <span className="font-semibold">Size: </span>
                {(Size / 1024).toFixed(1)}KB
              </div>
            </li>
            <li className="flex items-center gap-2">
              <Archive className="text-green-500" />
              <div>
                <span className="font-semibold">Storage class: </span>
                {StorageClass}
              </div>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
};

export default Page;
