"use client";

import useDebounce from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce({ input });

  // Navigation
  const pathname = usePathname();
  const router = useRouter();
  const searchParms = useSearchParams();

  const currCategoryId = searchParms.get("categoryId");

  useEffect(() => {
    const query = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          title: debouncedValue,
          categoryId: currCategoryId,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(query);
  }, [debouncedValue, currCategoryId, pathname, router]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3" size={17} color="gray" />

      <input
        type="text"
        placeholder="Search for a course..."
        className="w-full rounded-full border border-gray-200 px-9  py-2 outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 lg:w-[18rem]"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
