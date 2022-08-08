import { useEffect, useRef, useState } from "react";

export const TaskDescription = ({ task, updateTask }) => {
  const [description, setDescription] = useState("");
  const inputRef = useRef();

  const updateDescription = () => {
    let newTask = structuredClone(task);
    newTask.description = description;
    updateTask(newTask);
  };

  useEffect(() => {
    if (task) {
      setDescription(task.description);
    }
  }, [task]);

  return (
    <div className="flex h-[calc(5/6*100vh-303px)] h-full items-center justify-center">
      <textarea
        ref={inputRef}
        onBlur={updateDescription}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="text here"
        className="h-full  w-full resize-none rounded px-14 py-6  text-base font-normal text-neutral-500 outline-none scrollbar-thin scrollbar-thumb-neutral-200"
      ></textarea>
    </div>
  );
};
