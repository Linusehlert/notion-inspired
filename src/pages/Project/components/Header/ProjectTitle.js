import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDocument } from "../../../../hooks/firestore/useDocument";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";

export const ProjectTitle = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();
  const id =
    pathname.length >= 22
      ? pathname.substring(1, pathname.lastIndexOf("/"))
      : pathname;

  useDocument("projects", id);
  const inputRef = useRef();
  const { projectTitle } = useSelector((state) => state.project);
  const { updateDocument: updateProject } = useFirestore("projects");

  const updateTitle = () => {
    if (title !== "") updateProject(id, { title: title });
    else {
      setTitle(projectTitle);
    }
  };

  useEffect(() => {
    if (projectTitle) setTitle(projectTitle);
  }, [projectTitle]);

  return (
    <input
      ref={inputRef}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          inputRef.current.blur();
        }
      }}
      onBlur={updateTitle}
      onChange={(e) => setTitle(e.target.value)}
      value={title}
      placeholder={projectTitle}
      className="h-12 w-[calc(100vw-22rem)] grow-0 text-4xl font-bold text-neutral-700 outline-none md:w-[calc(100vw-40rem)]"
    ></input>
  );
};
