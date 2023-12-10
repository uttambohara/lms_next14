"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderButtons() {
  const pathname = usePathname();

  const isTeacherMode = pathname.includes("/teacher");
  return (
    <div className="ml-auto">
      {isTeacherMode ? (
        <Link href="/">
          <Button variant="ghost">Guest mode</Button>
        </Link>
      ) : (
        <Link href="/teacher/create">
          <Button>Teacher Mode</Button>
        </Link>
      )}
    </div>
  );
}
