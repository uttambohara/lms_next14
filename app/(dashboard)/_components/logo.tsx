import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={`/`}>
      <Image
        src="/logo.svg"
        priority
        height={200}
        width={200}
        alt="Company logo"
        className="px-4"
      />
    </Link>
  );
}
