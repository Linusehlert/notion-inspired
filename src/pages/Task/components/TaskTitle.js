import { useEffect, useRef, useState } from "react";

export const TaskTitle = ({ task, updateTask }) => {
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  const updateTitle = () => {
    let newTask = structuredClone(task);
    newTask.title = title;
    updateTask(newTask);
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      if (task.title === "untitled") {
        inputRef.current.focus();
      }
    }
  }, [task]);

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
      placeholder={task && task.title}
      className="mt-1 mb-3 w-[700px] px-3 text-3xl font-bold text-neutral-700 outline-none"
    ></input>
  );
};
