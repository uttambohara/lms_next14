import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";

type QuillProps = {
  value: string;
};

export function QuillReader({ value }: QuillProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return <ReactQuill theme="bubble" readOnly value={value} className="p-0" />;
}
