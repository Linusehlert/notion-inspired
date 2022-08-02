import { useDocument } from "../../../../hooks/firestore/useDocument";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const [title, setTitle] = useState("");
  const { pathname } = useLocation();
  const id =
    pathname.length >= 22
      ? pathname.substring(1, pathname.lastIndexOf("/"))
      : pathname.slice(1);

  useDocument("projects", id);
  const inputRef = useRef();
  const { projectTitle } = useSelector((state) => state.project);
  const { updateDocument: updateProject } = useFirestore("projects");

  const updateTitle = () => {
    if (title && title !== "") updateProject(id, { title: title });
    else {
      setTitle(projectTitle);
    }
  };

  useEffect(() => {
    if (projectTitle) setTitle(projectTitle);
  }, [projectTitle]);

  return (
    <div>
      <div className="w-100 max-w-screen px-12 pt-6">
        <div className="flex items-center">
          {/*Title Input*/}
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
          <div className="shrink-1 z-101 ml-auto flex grow-0">
            {/*Team Members*/}
            <div className="border-neutral-150 flex border-r pr-4 ">
              <div className="flex">
                <div className="h-8 w-8 rounded-3xl bg-neutral-300" />
                <div className="h-8 w-8 rounded-3xl bg-neutral-300" />
              </div>
              <button
                className="ml-2   flex items-center rounded-3xl bg-blue-100 px-3 font-semibold text-blue-500
                        hover:bg-blue-200 hover:text-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Invite
              </button>
            </div>
            {/*Dark Mode*/}
            <div className="ml-4 flex rounded-3xl bg-neutral-200 p-1">
              <button className="mr-1 rounded-3xl bg-white py-1 px-1.5 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button className="rounded-3xl py-1 px-1.5 text-neutral-400 hover:bg-white hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
