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
    <div className="flex h-3/5 h-full items-center justify-center py-8">
      <textarea
        ref={inputRef}
        onBlur={updateDescription}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="text here"
        className="mx-12  h-full w-full resize-none rounded   px-3  text-base font-normal text-neutral-500 outline-none"
      ></textarea>
    </div>
  );
};
