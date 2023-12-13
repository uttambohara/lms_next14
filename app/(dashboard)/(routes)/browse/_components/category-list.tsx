"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcBinoculars,
  FcCalculator,
  FcCompactCamera,
  FcFilmReel,
  FcMultipleDevices,
  FcSportsMode,
} from "react-icons/fc";
import { PiBowlFoodDuotone } from "react-icons/pi";
import CategoryItem from "./category-item";

//Icon map
const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  Accounting: FcCalculator,
  Filming: FcFilmReel,
  Engineering: FcBinoculars,
  Photography: FcCompactCamera,
  Fitness: FcSportsMode,
  Cooking: PiBowlFoodDuotone,
};

type CategoryListProps = {
  category: Category[];
};

export default function CategoryList({ category }: CategoryListProps) {
  return (
    <div className="flex items-center lg:gap-4 flex-wrap gap-2 text-xs md:text-sm">
      {category.map((item) => (
        <CategoryItem
          key={item.id}
          value={item.id}
          name={item.name}
          icon={iconMap[item.name]}
        />
      ))}
    </div>
  );
}
