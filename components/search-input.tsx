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
      { skipEmptyString: true, skipNull: true }
    );

    router.push(query);
  }, [debouncedValue, currCategoryId, pathname, queryString]);

  return (
    <div className="relative">
      <Search className="absolute top-3 left-4" size={17} color="gray" />

      <input
        type="text"
        placeholder="Search for a course..."
        className="border border-gray-200 px-9 py-2 rounded-full  outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 w-full lg:w-[18rem]"
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
