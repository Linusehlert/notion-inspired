import { useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const TaskStatus = ({ task, updateTask }) => {
  const [status, setStatus] = useState({
    title: "untitled",
    bgColor: "bg-green-500",
  });
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const inputRef = useRef();

  const { projectGroups } = useSelector((state) => state.project);

  const updateStatus = () => {
    let newTask = structuredClone(task);
    newTask.status = status;
    updateTask(newTask);
  };

  useClickOutside(inputRef, () => {
    setIsOptionsOpen(false);
  });

  // useEffect(() => {
  //   if (task) {
  //     setStatus(task.status);
  //   }
  // }, [task]);

  return (
    <div className="mb-1 flex">
      {/*property*/}
      <div className="flex w-40 cursor-pointer items-center rounded py-1 px-1  hover:bg-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
        <p className="ml-2 ">Status</p>
      </div>
      {/*React Select*/}
      <div
        ref={inputRef}
        className={`relative ml-2 box-border flex w-full w-full cursor-pointer flex-col items-center items-center justify-start rounded px-2  font-normal text-neutral-700 outline-none hover:bg-neutral-200 
          
        `}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <div className="flex h-full w-full items-center justify-start">
          <p
            className={` flex h-5 w-32 items-center px-2 py-0.5 text-[10px] text-white ${
              status && status.bgColor
            }  relative rounded`}
          >
            {status.title}
          </p>
        </div>
        {isOptionsOpen && (
          <ul
            tabIndex={-1}
            className="border-neutral-150 absolute top-7 box-border w-full rounded border bg-white  py-0.5 shadow-xl"
          >
            {projectGroups &&
              projectGroups.map((group, index) => (
                <li
                  onClick={() => setStatus(group)}
                  key={index}
                  className="rounded py-0.5 pl-2 hover:bg-neutral-200"
                >
                  <p
                    className={` flex h-4 w-32 items-center px-2 text-[10px] text-white ${
                      group && group.bgColor
                    } rounded`}
                  >
                    {group.title}
                  </p>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
