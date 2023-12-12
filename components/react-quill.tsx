import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

type QuillProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Quill({ value, onChange }: QuillProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className="bg-white"
    />
  );
}
