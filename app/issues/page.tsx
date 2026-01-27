"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
const Issues = () => {
  const [value, setValue] = useState("");
  return (
    <div className="p-5">
      <h1 className="text-pr-1">Issue Page</h1>
      <form className="flex mt-4" action="POST">
        <div>
          <div>
            <label className="text-label" htmlFor="title">
              Title
            </label>
            <input className="input" type="text" />
          </div>
          <div className="mt-3">
            <label className="text-label mt-6" htmlFor="description">
              Description
            </label>
            <SimpleMDE value={value} onChange={setValue} />
          </div>
          <button className="btn-pr-1">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Issues;
