import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IconType } from "react-icons";
interface CategoryItemProps {
  value: string;
  name: string;
  icon: IconType;
}

export default function CategoryItem({
  value,
  name,
  icon: Icon,
}: CategoryItemProps) {
  // Navigation
  const pathname = usePathname();
  const router = useRouter();
  const searchParms = useSearchParams();

  const currTitle = searchParms.get("title");
  const currCategoryId = searchParms.get("categoryId");
  const isActive = value === currCategoryId;

  function handleCategoryClick(value: string) {
    const query = queryString.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currTitle,
          categoryId: currCategoryId !== value ? value : "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    return router.push(query);
  }

  return (
    <button
      className={cn(
        "flex gap-2 items-center border border-slate-300 rounded-full py-1 px-2 transition cursor-pointer hover:bg-sky-100",
        isActive && "bg-sky-100"
      )}
      onClick={() => handleCategoryClick(value)}
    >
      <Icon size={25} />
      <span className="truncate"> {name}</span>
    </button>
  );
}
