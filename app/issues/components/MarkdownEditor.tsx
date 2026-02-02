"use client";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>;
};

export default function MarkdownEditor({ options }: Props) {
  return (
    <SimpleMDE
      options={{
        spellChecker: true,
        ...options,
      }}
    />
  );
}
