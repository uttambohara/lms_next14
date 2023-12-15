import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid h-[40rem] place-content-center">
      <Loader2 className="animate-spin" size={50} color="purple" />
    </div>
  );
}
