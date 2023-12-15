"use client";

import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/is-teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function HeaderButtons() {
  const { userId } = useAuth();

  if (!userId) redirect("/");
  const pathname = usePathname();

  const isTeacherMode = pathname.includes("/teacher");

  return (
    <div className="ml-auto flex items-center gap-2">
      {isTeacher(userId) ? (
        isTeacherMode ? (
          <Link href="/">
            <Button variant="ghost">Guest mode</Button>
          </Link>
        ) : (
          <Link href="/teacher/course">
            <Button>Teacher Mode</Button>
          </Link>
        )
      ) : (
        ""
      )}

      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
