import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";

export const ProjectTitle = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();
  const id =
    pathname.length >= 22
      ? pathname.substring(1, pathname.lastIndexOf("/"))
      : pathname;

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
    if (projectTitle) {
      setTitle(projectTitle);
    }
    setTimeout(() => {
      if (projectTitle === "untitled") inputRef.current.focus();
    }, 100);
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
      className="h-12  w-[calc(100vw-13rem)] grow-0 text-4xl font-bold text-neutral-700 outline-none"
    ></input>
  );
};
