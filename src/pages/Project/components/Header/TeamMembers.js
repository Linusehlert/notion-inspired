import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import Modal from "../../../../components/Modals/Modal";

export const TeamMembers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const modalRef = useRef();

  const { projectAdmins, projectManagers, projectDevelopers, projectTitle } =
    useSelector((state) => state.project);

  useEffect(() => {
    setUsers([]);
    const newUsers = [
      ...projectAdmins,
      ...projectManagers,
      ...projectDevelopers,
    ];
    console.log(newUsers);
    setUsers(newUsers);
  }, [projectAdmins, projectManagers, projectDevelopers]);

  useClickOutside(modalRef, () => {
    setOpen(false);
  });
  return (
    <div className="border-neutral-150 flex border-r pr-4 ">
      <div className={` relative flex h-8  w-[96px] `}>
        {users[0] && users[0].photoUrl && (
          <img
            src={users[0].photoUrl}
            className="absolute z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[0] && users[0].displayName[0]}
          />
        )}
        {users[0] && !users[0].photoUrl && (
          <div className="absolute z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white">
            {users[0] && users[0].displayName[0]}
          </div>
        )}
        {users[1] && users[1].photoUrl && (
          <img
            src={users[1].photoUrl}
            className="absolute z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[1] && users[1].displayName[0]}
          />
        )}
        {users[1] && !users[1].photoUrl && (
          <div className="absolute z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white">
            {users[1] && users[1].displayName[0]}
          </div>
        )}
        {users[2] && users[2].photoUrl && (
          <img
            src={users[2].photoUrl}
            className="absolute z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[2] && users[2].displayName[0]}
          />
        )}
        {users[2] && !users[2].photoUrl && (
          <div className="absolute z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white">
            {users[2] && users[2].displayName[0]}
          </div>
        )}
        {users[3] && (
          <div className="absolute left-[60px] z-[4] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-sm leading-none">
            {users.length > 3 && <div>+{users.length - 3}</div>}
          </div>
        )}
      </div>
      <button
        onClick={() => setOpen(true)}
        className="ml-2   flex items-center rounded-3xl bg-blue-100 px-3 font-semibold text-blue-500
                        hover:bg-blue-200 hover:text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Invite
      </button>
      <Modal open={open}>
        <div
          ref={modalRef}
          className="relative z-50 h-5/6 w-[800px] cursor-text rounded bg-white text-sm font-semibold text-neutral-500"
        >
          <div className="px-12 py-4">
            <h5 className=" py-2 px-3">
              {projectTitle + " "}/
              <span className="text-neutral-700"> Manage Team</span>
            </h5>
            <h3 className="mt-1 mb-3 px-3 text-3xl font-bold text-neutral-700 outline-none">
              Team Members
            </h3>
            <div className="flex w-full justify-between p-3">
              <div className="w-52 ">
                <div className="mr-4 mb-2 flex w-full items-center  ">
                  <h3 className="p-0.5 text-base">Admins</h3>
                  <button className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Invite
                  </button>
                </div>
                {projectAdmins.map((admin) => (
                  <div className="mb-1 flex items-center">
                    {admin.photoUrl && (
                      <img
                        src={admin.photoUrl}
                        className="mr-2 h-8 w-8 cursor-default rounded-full border-2 border-white"
                        alt={admin.displayName[0]}
                      />
                    )}
                    {!admin.photoUrl && (
                      <div className="h-8 w-8 rounded bg-neutral-200">
                        {admin.displayName[0]}
                      </div>
                    )}
                    <div className="ml-2">
                      <h3 className="text-neutral-700">{admin.displayName}</h3>
                      <h4 className="text-xs font-normal">{admin.email}</h4>
                    </div>
                    <button className="ml-auto rounded p-0.5 hover:bg-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {/*Managers*/}
              <div className="w-52 ">
                <div className="mr-4 mb-2 flex w-full items-center ">
                  <h3 className="p-0.5  text-base">Managers</h3>
                  <button className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Invite
                  </button>
                </div>
                {projectManagers.map((manager) => (
                  <div className="mb-1 flex items-center">
                    {manager.photoUrl && (
                      <img
                        src={manager.photoUrl}
                        className="mr-2 h-8 w-8 cursor-default rounded-full border-2 border-white"
                        alt={manager.displayName[0]}
                      />
                    )}
                    {!manager.photoUrl && (
                      <div className="h-8 w-8 rounded bg-neutral-200">
                        {manager.displayName[0]}
                      </div>
                    )}
                    <div className="ml-2">
                      <h3 className="text-neutral-700">
                        {manager.displayName}
                      </h3>
                      <h4 className="text-xs font-normal">{manager.email}</h4>
                    </div>
                    <button className="ml-auto rounded p-0.5 hover:bg-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {/*Developers*/}
              <div className="w-52 ">
                <div className="mr-4 mb-2 flex w-full items-center py-0.5">
                  <h3 className="p-0.5 text-base">Developers</h3>
                  <button className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1 h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Invite
                  </button>
                </div>
                {projectDevelopers.map((developer) => (
                  <div className="mb-1 flex items-center">
                    {developer.photoUrl && (
                      <img
                        src={developer.photoUrl}
                        className="mr-2 h-8 w-8 cursor-default rounded-full border-2 border-white"
                        alt={developer.displayName[0]}
                      />
                    )}
                    {!developer.photoUrl && (
                      <div className="h-8 w-8 rounded bg-neutral-200">
                        {developer.displayName[0]}
                      </div>
                    )}
                    <div className="ml-2">
                      <h3 className="text-neutral-700">
                        {developer.displayName}
                      </h3>
                      <h4 className="text-xs font-normal">{developer.email}</h4>
                    </div>
                    <button className="ml-auto rounded p-0.5 hover:bg-neutral-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
