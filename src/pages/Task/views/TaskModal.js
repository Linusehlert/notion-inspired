import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { TaskTitle } from "../components/TaskTitle";
import { TaskLabel } from "../components/TaskLabel.";
import { TaskStatus } from "../components/TaskStatus";
import { TaskPriority } from "../components/TaskPriority";
import { TaskDescription } from "../components/TaskDescription";
import { TaskHeader } from "../components/TaskHeader";
import { TaskAssignees } from "../components/TaskAssignees";

export const TaskModal = ({ task, taskIndex, groupIndex }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { projectGroups, projectId } = useSelector((state) => state.project);

  const modalRef = useRef();

  const { updateDocument: updateProject } = useFirestore("projects");

  const { pathname } = useLocation();
  const id = pathname.substring(0, pathname.lastIndexOf("/"));
  const navigate = useNavigate();

  const updateTask = (newTask) => {
    const newGroups = structuredClone(projectGroups);
    let newGroup = structuredClone(newGroups[groupIndex]);
    const newTasks = structuredClone(newGroup.tasks);
    newTasks[taskIndex] = newTask;
    newGroups[groupIndex] = { ...newGroup, tasks: newTasks };
    updateProject(projectId, {
      groups: newGroups,
    });
  };
  // close modal when click outside
  useClickOutside(modalRef, () => {
    setTimeout(() => {
      navigate(id, { replace: true });
    }, 10);
  });

  return ReactDOM.createPortal(
    <div className="col fixed inset-0 z-30 flex flex cursor-pointer items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative z-50 h-5/6 w-[800px] cursor-text rounded bg-white text-sm font-semibold text-neutral-500"
      >
        {/*top section*/}
        <div className="px-12 py-4">
          {/*header*/}
          <TaskHeader task={task} />
          {/*title*/}
          <TaskTitle task={task} updateTask={updateTask} />
          {/*properties*/}
          <div className=" flex flex-col p-2 text-sm text-neutral-500">
            {/*Label*/}
            <TaskLabel task={task} updateTask={updateTask} />
            {/*Assignee*/}
            <TaskAssignees task={task} updateTask={updateTask} />
            {/*Status*/}
            <TaskStatus
              task={task}
              groupIndex={groupIndex}
              taskIndex={taskIndex}
            />
            {/*Priority*/}
            <TaskPriority task={task} updateTask={updateTask} />
          </div>
        </div>
        {/*text section header*/}
        <ul className="border-neutral-150 flex items-center border-b px-14 text-neutral-500">
          <li
            className={`mx-1 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 
          ${commentsOpen ? "" : "border-b-2 border-blue-500 text-blue-500"}`}
          >
            Description
          </li>
          <li
            className={`group ml-8 flex cursor-pointer border-b-2 pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500
          ${commentsOpen ? " border-blue-500 text-blue-500" : "border-white"}`}
          >
            Comments
            {/*comment count*/}
            <div
              className={`ml-2 flex items-center rounded px-1.5 text-xs group-hover:bg-blue-100 ${
                commentsOpen ? "bg-blue-100" : "bg-neutral-200"
              }`}
            >
              {task && task.comments && task.comments.length}
            </div>
          </li>
        </ul>
        {/*text section*/}
        <TaskDescription task={task} updateTask={updateTask} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};
