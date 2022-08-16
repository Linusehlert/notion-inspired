import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const TaskPriority = ({ task, updateTask }) => {
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const inputRef = useRef();

  const updatePriority = (prio) => {
    let newTask = structuredClone(task);
    newTask.priority = prio;
    updateTask(newTask);
  };

  useClickOutside(inputRef, () => {
    setIsOptionsOpen(false);
  });

  useEffect(() => {
    if (task) {
      setPriority(task.priority);
      switch (task.priority) {
        case "Low":
          setColor("bg-green-100 text-green-500");
          break;
        case "Mid":
          setColor("bg-yellow-100 text-yellow-600");
          break;
        case "High":
          setColor("bg-red-100 text-red-600");
          break;
        case "None":
          setColor("bg-indigo-100 text-indigo-500");
          break;
        default:
          setColor("bg-indigo-100 text-indigo-500");
      }
    }
  }, [task]);

  return (
    <div className="mb-1 flex">
      {/*property*/}
      <div className="flex w-32 cursor-pointer items-center rounded py-1 px-1 hover:bg-neutral-200  md:w-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="ml-2 ">Priority</p>
      </div>
      {/*React Select*/}
      <div
        ref={inputRef}
        className={`relative ml-2 box-border flex w-full w-full cursor-pointer flex-col items-center items-center justify-start 
        rounded px-2 font-normal  text-neutral-700 outline-none hover:bg-neutral-200 
        `}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        <div className="flex h-full w-full items-center justify-start  ">
          <p
            className={` relative flex  h-5 items-center rounded px-2 py-0.5 text-xs font-semibold text-white ${color}`}
          >
            {priority}
          </p>
        </div>
        {isOptionsOpen && (
          <div
            tabIndex={-1}
            className="border-neutral-150 absolute top-7 box-border w-full rounded border bg-white   shadow-lg"
          >
            <div
              onClick={() => updatePriority("None")}
              className="flex h-full w-full items-center justify-start border-t border-neutral-100
              hover:bg-neutral-200"
            >
              <p
                className=" text- relative mx-2 my-1 flex h-5 items-center rounded bg-indigo-100 px-2
                    py-0.5 text-xs font-semibold text-indigo-500"
              >
                None
              </p>
            </div>

            <div
              onClick={() => updatePriority("Low")}
              className="flex h-full w-full items-center justify-start border-t border-neutral-100
              hover:bg-neutral-200"
            >
              <p
                className=" relative mx-2 my-1 flex h-5 items-center rounded bg-green-100 px-2 py-0.5
                    text-xs font-semibold text-green-500"
              >
                Low
              </p>
            </div>
            <div
              onClick={() => updatePriority("Mid")}
              className="flex h-full w-full items-center justify-start border-t border-neutral-100
              hover:bg-neutral-200"
            >
              <p
                className=" relative mx-2 my-1 flex h-5 items-center rounded bg-yellow-100 px-2 py-0.5 text-xs
                    font-semibold text-yellow-600"
              >
                Mid
              </p>
            </div>

            <div
              onClick={() => updatePriority("High")}
              className="flex h-full w-full items-center justify-start border-t border-neutral-100
              hover:bg-neutral-200"
            >
              <p
                className=" relative mx-2 my-1 flex h-5 items-center rounded bg-red-100 px-2 py-0.5 text-xs
                    font-semibold text-red-500"
              >
                High
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
