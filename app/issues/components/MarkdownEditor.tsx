"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useMemo } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
};

export default function MarkdownEditor({ value, onChange, options }: Props) {
  const memoizedOptions = useMemo(
    () => ({
      spellChecker: true,
      ...options,
    }),
    [options],
  );

  return (
    <SimpleMDE value={value} onChange={onChange} options={memoizedOptions} />
  );
}
