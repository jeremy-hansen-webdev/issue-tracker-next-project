"use client";

import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: Props) => {
  return <SimpleMDE value={value} onChange={onChange} />;
};

export default MarkdownEditor;
