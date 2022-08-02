import { useTask } from "../../hooks/firestore/useTask";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskModal = () => {
  const modalRef = useRef();
  const navigate = useNavigate();
  const { projectId } = useSelector((state) => state.project);
  const { pathname } = useLocation();
  const taskId = pathname.substring(22, pathname.length);
  const { isPending, error, task } = useTask(taskId);

  // close modal when click outside
  useClickOutside(modalRef, () => {
    navigate("/" + projectId, { replace: true });
  });

  return ReactDOM.createPortal(
    <div className="col z-999 fixed inset-0 flex flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="h-5/6 w-[800px] rounded bg-white text-sm font-semibold text-neutral-500"
      >
        {/*top section*/}
        <div className="px-12 py-4">
          {/*header*/}
          <div className="flex items-center p-2 text-sm  ">
            <button className="mr-2 rounded p-1 hover:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
            {/*path*/}
            <p className="font-normal">
              {document.title} /{" "}
              <span className="font-semibold text-neutral-700">
                {task && task.title}
              </span>
            </p>
            {/*options*/}
            <div className="ml-auto flex items-center">
              <button className="mr-2 rounded p-1 hover:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
              <button className="rounded p-1 hover:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/*title*/}
          <h3 className="mt-1 mb-3 px-3 text-3xl font-bold text-neutral-700">
            {task && task.title}
          </h3>
          {/*properties*/}
          <div className=" flex flex-col p-2 text-sm text-neutral-500">
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
              <div className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-normal text-neutral-700 hover:bg-neutral-200">
                {task && task.label}
              </div>
            </div>
            {/*Assignee*/}
            <div className="mb-1 flex">
              {/*property*/}
              <div className="flex w-40 cursor-pointer items-center rounded py-1 px-1  hover:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <p className="ml-2 ">Assignee</p>
              </div>
              {/*value*/}
              <div className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-normal text-neutral-700 hover:bg-neutral-200">
                {task && task.assignees.map((assignee) => assignee.name)}
              </div>
            </div>
            {/*Status*/}
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
              <div className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-normal text-neutral-700 hover:bg-neutral-200">
                {task && task.status}
              </div>
            </div>
            {/*Priority*/}
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
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 ">Priority</p>
              </div>
              {/*React Select*/}
              <div className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-normal text-neutral-700 hover:bg-neutral-200">
                {task && task.priority}
              </div>
            </div>
          </div>
        </div>
        {/*text section header*/}
        <ul className="border-neutral-150 flex items-center border-b px-14 text-neutral-500">
          <li className="mx-1 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
            Description
          </li>
          <li className="ml-8 flex border-b-2 border-blue-500 pb-2 text-blue-500">
            Comments
            {/*comment count*/}
            <div className="ml-2 flex items-center rounded bg-blue-500/30 px-1.5 text-xs">
              2
            </div>
          </li>
        </ul>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
