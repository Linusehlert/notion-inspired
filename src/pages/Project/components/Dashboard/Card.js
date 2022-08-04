import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export const Card = ({ task, id }) => {
  const [color, setColor] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (task) {
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
    <Link
      to={`${task.id}?view=center`}
      state={{ background: location }}
      className="border-neutral-150 mb-2 flex cursor-pointer flex-col rounded-lg border bg-white
        py-2 px-3 shadow-md hover:bg-neutral-100 "
    >
      {/*Label*/}
      <h5 className="font-normal text-neutral-400">{task && task.label}</h5>
      {/*Title*/}
      <h3 className="mb-2 text-base font-bold text-neutral-700">
        {task && task.title}
      </h3>
      {/*Description*/}
      {/*<p className="mb-3 font-normal text-neutral-500">{task && task.id}</p>*/}
      {/*Assignes and priority*/}
      <div className="border-neutral-150 flex items-center border-b pb-3">
        {/*<div className="mr-2 h-5 w-5 rounded-full  bg-neutral-300" />*/}
        <div className={`${color} rounded  px-1.5 text-xs font-normal`}>
          {task && task.priority.length && task.priority}
        </div>
      </div>
      {/*comments*/}
      {/*<div className="mt-2 flex items-center">*/}
      {/*  <svg*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*    className="mr-1 h-4 w-4"*/}
      {/*    fill="none"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeWidth="2"*/}
      {/*  >*/}
      {/*    <path*/}
      {/*      strokeLinecap="round"*/}
      {/*      strokeLinejoin="round"*/}
      {/*      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*  <p className="text-xs text-neutral-500">*/}
      {/*    {task && task.comments.length}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </Link>
  );
};
