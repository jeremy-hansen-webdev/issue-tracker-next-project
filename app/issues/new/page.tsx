"use client";

// import IssueForm from "@/app/issues/components/IssueForm";

import dynamic from "next/dynamic";
import LoadingForm from "../components/LoadingForm";

const IssueForm = dynamic(() => import("@/app/issues/components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingForm />,
});

const Issues = () => {
  return (
    <div>
      <h1 className="text-pr-2 mb-4">Issues Page</h1>
      <IssueForm />
    </div>
  );
};

export default Issues;
