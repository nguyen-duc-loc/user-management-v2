import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

const Header = ({ totalUsers }: { totalUsers: number }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h3 className="text-xl font-semibold tracking-tight">
        Number of users:{" "}
        <span className="text-muted-foreground">{totalUsers}</span>
      </h3>
      <Button asChild>
        <Link href="/user/new">
          <Plus />
          Add user
        </Link>
      </Button>
    </div>
  );
};

export default Header;
