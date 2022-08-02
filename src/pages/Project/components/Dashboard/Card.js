import { useTask } from "../../../../hooks/firestore/useTask";
import { Link, useLocation } from "react-router-dom";

export const Card = ({ taskId }) => {
  const location = useLocation();
  const { isPending, error, task } = useTask(taskId);

  if (isPending)
    return (
      <div
        className="border-neutral-150 mb-2 flex cursor-pointer flex-col rounded-lg border bg-white
        py-2 px-3 shadow-md hover:bg-neutral-100 "
      >
        Loading...
      </div>
    );

  return (
    <Link
      to={`${taskId}?view=center`}
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
      <p className="mb-3 font-normal text-neutral-500">{task && task.id}</p>
      {/*Assignes and priority*/}
      <div className="border-neutral-150 flex items-center border-b pb-3">
        {/*<div className="mr-2 h-5 w-5 rounded-full  bg-neutral-300" />*/}
        <div className="rounded  bg-yellow-500/20 px-1.5 text-xs font-normal text-yellow-600">
          {task && task.priority.length && task.priority}
        </div>
      </div>
      {/*comments*/}
      <div className="mt-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
        <p className="text-xs text-neutral-500">
          {task && task.comments.length}
        </p>
      </div>
    </Link>
  );
};
