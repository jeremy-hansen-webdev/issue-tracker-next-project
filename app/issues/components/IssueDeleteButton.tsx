"use client";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import IssueDelete from "./IssueDelete";

interface Props {
  id: number;
  text: string;
}

const IssueDeleteButton = ({ id, text }: Props) => {
  const [visable, setVisable] = useState(false);

  const onCancel = () => {
    setVisable(false);
  };

  return (
    <div>
      {visable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <IssueDelete id={id} onCancel={onCancel} />
        </div>
      )}
      <button
        className="btn-pr-1 bg-red-700 hover:bg-red-800 space-x-2"
        onClick={() => setVisable(true)}
      >
        <span>{text}</span>
        <MdDelete />
      </button>
    </div>
  );
};

export default IssueDeleteButton;
