import { House } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const NotFoundPage = ({ message }: { message: string }) => {
  return (
    <div className="mt-32 space-y-24">
      <div className="flex items-center justify-center">
        <span className="border-r-2 py-2 pr-8 text-2xl font-semibold">404</span>
        <p className="pl-8 text-sm">{message}</p>
      </div>
      <div className="text-center">
        <Button asChild variant="outline">
          <Link href="/">
            <House />
            Go home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
