import { useEffect, useRef, useState } from "react";

export const TaskLabel = ({ task, updateTask }) => {
  const [label, setLabel] = useState("");
  const inputRef = useRef();

  const updateLabel = () => {
    let newTask = structuredClone(task);
    newTask.label = label;
    updateTask(newTask);
  };

  useEffect(() => {
    if (task) {
      setLabel(task.label);
    }
  }, [task]);

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
          <path
            fillRule="evenodd"
            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        <p className="ml-2 ">Label</p>
      </div>
      {/*value*/}

      <input
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            inputRef.current.blur();
          }
        }}
        onBlur={updateLabel}
        onChange={(e) => setLabel(e.target.value)}
        value={label}
        placeholder={task && task.label}
        className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-normal text-neutral-700 outline-none hover:bg-neutral-200 "
      ></input>
    </div>
  );
};
