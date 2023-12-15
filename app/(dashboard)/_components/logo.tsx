import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      priority
      height={200}
      width={200}
      alt="Company logo"
      className="px-4"
    />
  );
}
