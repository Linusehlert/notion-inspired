import { db } from "../../../firebase/config";
import { useCollection } from "../../../hooks/firestore/useCollection";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { ProjectBlock } from "./ProjectBlock";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";

export const Workspace = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userId } = useSelector((state) => state.user);

  //firestore
  const { addDocument: addProject } = useFirestore("projects");
  const { documents: projects } = useCollection(
    query(
      collection(db, "projects"),
      where("users", "array-contains", userId),
      orderBy("createdAt", "desc")
    )
  );

  return (
    <div className="px-2 pt-2">
      <div className="mb-2 flex items-center py-1 pl-1 pr-2 font-semibold text-neutral-500">
        <p
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer rounded px-1 hover:bg-gray-200 hover:text-neutral-600"
        >
          Workspace
        </p>
        {/*Create new Project*/}
        <button
          onClick={() => addProject()}
          className="ml-auto rounded p-1 text-blue-500 hover:bg-blue-200 hover:text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen &&
        projects &&
        projects.map((project) => (
          <ProjectBlock key={project.id} project={project} />
        ))}
    </div>
  );
};
