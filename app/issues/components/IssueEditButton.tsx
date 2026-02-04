import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

interface Props {
    id: number,
    text: string
}

const IssuesEditButton = ({ id, text }: Props ) => {
  return (
    <Link href={`/issues/${id}/edit`}>
      <button className="btn-pr-1 space-x-2">
        {" "}
        <span>{text}</span>
        <FiEdit2 />
      </button>
    </Link>
  );
};

export { IssuesEditButton };
