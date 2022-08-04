import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFirestore } from "../../../hooks/firestore/useFirestore";

export const TaskStatus = ({ task, groupIndex, taskIndex }) => {
  const [status, setStatus] = useState({
    title: "untitled",
    bgColor: "bg-green-500",
  });
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const inputRef = useRef();

  const { updateDocument: updateProject } = useFirestore("projects");

  const { projectGroups, projectId } = useSelector((state) => state.project);

  const updateStatus = (newGroupIndex) => {
    //remove task from group
    const newGroups = structuredClone(projectGroups);
    let oldGroup = structuredClone(newGroups[groupIndex]);
    const oldTasks = structuredClone(oldGroup.tasks);
    oldTasks.splice(taskIndex, 1);
    newGroups[groupIndex] = { ...oldGroup, tasks: oldTasks };
    console.log(oldTasks);
    //add task to new group

    const newTasks = structuredClone(newGroups[newGroupIndex].tasks);
    newTasks.push(task);
    newGroups[newGroupIndex] = { ...newGroups[newGroupIndex], tasks: newTasks };

    updateProject(projectId, {
      groups: newGroups,
    });
  };

  useClickOutside(inputRef, () => {
    setIsOptionsOpen(false);
  });

  useEffect(() => {
    if (projectGroups[groupIndex]) {
      setStatus({
        title: projectGroups[groupIndex].title,
        bgColor: projectGroups[groupIndex].bgColor,
      });
    }
  }, [groupIndex, projectGroups]);

  return (
    <div className="relative  mb-1 flex">
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
        className={`relative ml-2 box-border flex w-full cursor-pointer flex-col items-center items-center justify-start rounded px-2  font-normal text-neutral-700 outline-none hover:bg-neutral-200 
          
        `}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <div className="flex h-full w-full items-center justify-start">
          <p
            className={` flex h-5  items-center px-2 py-0.5 text-xs font-semibold text-white ${
              status && status.bgColor
            }  relative rounded`}
          >
            {status && status.title}
          </p>
        </div>
        {isOptionsOpen && (
          <div
            tabIndex={-1}
            className="border-neutral-150 absolute top-7 z-50 box-border w-full rounded border bg-white   shadow-lg"
          >
            {projectGroups &&
              projectGroups.map((group, index) => (
                <div
                  onClick={() => updateStatus(index)}
                  key={index}
                  className={`flex h-full w-full items-center justify-start ${
                    index !== 0 ? "border-t border-neutral-100" : ""
                  } hover:bg-neutral-200`}
                >
                  <p
                    className={` mx-2 my-1 flex h-5 items-center px-2 py-0.5 text-xs font-semibold text-white ${
                      group && group.bgColor
                    }  relative rounded`}
                  >
                    {group.title}
                  </p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
