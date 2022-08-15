import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../hooks/firestore/useFirestore";

export const TaskLabel = ({ task, updateTask }) => {
  const [labels, setLabels] = useState([""]);
  const [labelOptions, setLabelOptions] = useState([""]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { projectLabels, projectId } = useSelector((state) => state.project);

  const inputRef = useRef();
  const dropdownRef = useRef();

  const { updateDocument: updateProject } = useFirestore("projects");

  const changeLabels = (newLabel) => {
    if (newLabel !== "") {
      let newTask = structuredClone(task);
      newTask.labels = [...labels, newLabel];
      updateTask(newTask);
      if (!labelOptions.includes(newLabel)) {
        const newLabelOptions = [...labelOptions, newLabel];
        console.log(newLabelOptions);
        updateProject(projectId, {
          labelOptions: newLabelOptions,
        });
      }
    }
  };

  const addLabel = (newLabel) => {
    if (!labels.includes(newLabel)) {
      let newTask = structuredClone(task);
      newTask.labels = [...labels, newLabel];
      updateTask(newTask);
    }
  };
  const removeLabel = (label) => {
    let newTask = structuredClone(task);
    newTask.labels = labels.filter((l) => l !== label);
    updateTask(newTask);
  };

  const removeLabelOption = (label) => {
    let newLabelOptions = labelOptions.filter((l) => l !== label);
    updateProject(projectId, {
      labelOptions: newLabelOptions,
    });
  };

  useEffect(() => {
    setLabels([]);
    if (task && task.labels) {
      task.labels.forEach((label, index) => {
        console.log(label, index);
        if (label !== "") {
          setLabels((prevState) => [...prevState, label]);
        }
      });
    }
    setLabelOptions(projectLabels);
  }, [task]);

  useClickOutside(dropdownRef, () => {
    setIsOptionsOpen(false);
  });

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
      <div
        className="relative ml-2 box-border flex w-full w-full cursor-pointer flex-col items-center items-center justify-start rounded
        font-normal  text-neutral-700 outline-none hover:bg-neutral-200 "
        onClick={() => {
          setIsOptionsOpen(!isOptionsOpen);
          if (!isOptionsOpen) {
            setTimeout(() => {
              inputRef.current.focus();
            }, 50);
          }
        }}
      >
        <div
          ref={dropdownRef}
          className="group-1 flex h-full w-full cursor-pointer items-center  rounded font-semibold text-neutral-700 outline-none hover:bg-neutral-200"
        >
          <div className="flex items-center">
            {/*input*/}
            {isOptionsOpen && (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                }}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    changeLabels(e.target.innerText);
                    e.target.innerText = "";
                    inputRef.current.blur();
                  }
                }}
                contentEditable
                suppressContentEditableWarning={true}
                className=" text- relative z-40 mx-2 my-1 flex h-5 items-center rounded bg-neutral-200 px-2 py-0.5
                    text-xs font-semibold text-neutral-600 outline-none group-1-hover:bg-neutral-300 "
              ></p>
            )}
            {labels &&
              labels.map((label) => (
                <p
                  onClick={(e) => {
                    if (isOptionsOpen) {
                      e.stopPropagation();
                      removeLabel(label);
                    }
                  }}
                  className="relative z-50 mx-2 my-1 flex h-5 items-center rounded bg-neutral-200 px-2 py-0.5
                    text-xs font-semibold text-neutral-600 group-1-hover:bg-neutral-300 group-1-hover:text-neutral-700"
                >
                  {label}
                </p>
              ))}
          </div>
          {isOptionsOpen && labelOptions.length > 0 && (
            <div
              tabIndex={-1}
              className="border-neutral-150 absolute top-7 z-50  box-border w-full rounded border bg-white  shadow-lg"
            >
              {labelOptions.map((label) => (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    addLabel(label);
                  }}
                  className=" group flex h-full w-full items-center justify-start border-t border-neutral-100
              hover:bg-neutral-200"
                >
                  <p
                    className="mx-2 my-1 flex h-5 items-center rounded bg-neutral-200 px-2 py-0.5
                    text-xs font-semibold text-neutral-600 group-hover:bg-neutral-300"
                  >
                    {label}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeLabelOption(label);
                    }}
                    className="ml-auto mr-2 rounded p-0.5 text-neutral-500 hover:bg-neutral-300 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
