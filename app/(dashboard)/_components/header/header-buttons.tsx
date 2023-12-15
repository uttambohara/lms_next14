"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderButtons() {
  const pathname = usePathname();

  const isTeacherMode = pathname.includes("/teacher");
  return (
    <div className="ml-auto flex items-center gap-2">
      {isTeacherMode ? (
        <Link href="/">
          <Button variant="ghost">Guest mode</Button>
        </Link>
      ) : (
        <Link href="/teacher/course">
          <Button>Teacher Mode</Button>
        </Link>
      )}
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
