import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";

export const TaskAssignees = ({ task, updateTask }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const dropdownRef = useRef();

  const { projectAdmins, projectManagers, projectDevelopers } = useSelector(
    (state) => state.project
  );

  const addAssignee = (newAssignee) => {
    if (!task.assignees?.find((assignee) => assignee.id === newAssignee.id)) {
      let newTask = structuredClone(task);
      newTask.assignees = [...task.assignees, newAssignee];
      updateTask(newTask);
    }
  };

  const removeAssignee = (oldAssignee) => {
    let newTask = structuredClone(task);
    newTask.assignees = task.assignees.filter(
      (assignee) => assignee.id !== oldAssignee.id
    );
    updateTask(newTask);
  };

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
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
        <p className="ml-2 ">Assignees</p>
      </div>
      {/*value*/}
      <div
        className="relative ml-2 box-border flex w-full w-full cursor-pointer flex-col items-center items-center justify-start rounded
        font-normal  text-neutral-700 outline-none hover:bg-neutral-200 "
        onClick={() => {
          setIsOptionsOpen(!isOptionsOpen);
        }}
      >
        <div
          ref={dropdownRef}
          className="group-1 flex h-full w-full cursor-pointer items-center rounded text-xs font-semibold text-neutral-700 outline-none hover:bg-neutral-200"
        >
          {task.assignees &&
            task.assignees.map((assignee) => (
              /*user batch*/
              <div
                onClick={(e) => {
                  if (isOptionsOpen) {
                    e.stopPropagation();
                    removeAssignee(assignee);
                  }
                }}
                key={assignee.id}
                className={`ml-2 flex items-center rounded-lg rounded-l-3xl  pr-2 ${
                  isOptionsOpen ? "hover:bg-neutral-100" : ""
                }`}
              >
                {assignee.photoUrl ? (
                  <img
                    key={assignee.id}
                    src={assignee.photoUrl}
                    alt={assignee.displayName}
                    className="mr-2 h-5 w-5 rounded-full"
                  />
                ) : (
                  <div
                    className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs
              "
                  >
                    <span className="text-center text-white">
                      {assignee.displayName && assignee.displayName[0]}
                    </span>
                  </div>
                )}
                {assignee.displayName}
              </div>
            ))}
          {/*  Dropdown*/}
          {isOptionsOpen && (
            <div className="border-neutral-150 absolute top-7 left-0 z-50 box-border flex flex w-full   rounded border  bg-white  shadow-lg">
              <div className="ml-1 ">
                <h2 className=" my-1 ml-1  w-40 text-neutral-500">Admins</h2>
                {projectAdmins &&
                  projectAdmins.map((admin) => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        addAssignee(admin);
                      }}
                      key={admin.id}
                      className="mb-1 mr-3 ml-1 flex  items-center  rounded-lg rounded-l-3xl  hover:bg-neutral-200"
                    >
                      {admin.photoUrl ? (
                        <img
                          key={admin.id}
                          src={admin.photoUrl}
                          alt={admin.displayName}
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                      ) : (
                        <div
                          className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs
              "
                        >
                          <span className="text-center text-white">
                            {admin.displayName[0]}
                          </span>
                        </div>
                      )}
                      {admin.displayName}
                    </div>
                  ))}
              </div>
              <div>
                <h2 className=" my-1 ml-1 w-40  text-neutral-500">Managers</h2>
                {projectManagers &&
                  projectManagers.map((manager) => (
                    <div
                      key={manager.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        addAssignee(manager);
                      }}
                      className="mb-0.5 mr-4 flex items-center rounded-lg rounded-l-3xl hover:bg-neutral-200"
                    >
                      {manager.photoUrl ? (
                        <img
                          key={manager.id}
                          src={manager.photoUrl}
                          alt={manager.displayName}
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                      ) : (
                        <div
                          className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs
              "
                        >
                          <span className="text-center text-white">
                            {manager.displayName[0]}
                          </span>
                        </div>
                      )}
                      {manager.displayName}
                    </div>
                  ))}
              </div>
              <div>
                <h2 className=" my-1 ml-1 w-40  text-neutral-500">
                  Developers
                </h2>
                {projectDevelopers &&
                  projectDevelopers.map((developer) => (
                    <div
                      key={developer.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        addAssignee(developer);
                      }}
                      className="mb-0.5 mr-4 flex w-40 items-center rounded-lg rounded-l-3xl hover:bg-neutral-200"
                    >
                      {developer.photoUrl ? (
                        <img
                          key={developer.id}
                          src={developer.photoUrl}
                          alt={developer.displayName}
                          className="mr-2 h-5 w-5 rounded-full"
                        />
                      ) : (
                        <div
                          className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs
              "
                        >
                          <span className="text-center text-white">
                            {developer.displayName[0]}
                          </span>
                        </div>
                      )}
                      {developer.displayName}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
