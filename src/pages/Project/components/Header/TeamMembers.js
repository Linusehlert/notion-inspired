import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { TeamMembersModal } from "./TeamMembersModal";

export const TeamMembers = () => {
  const [open, setOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const { projectAdmins, projectManagers, projectDevelopers } = useSelector(
    (state) => state.project
  );

  const modalRef = useRef();

  useEffect(() => {
    setUsers([]);
    const newUsers = [
      ...projectAdmins,
      ...projectManagers,
      ...projectDevelopers,
    ];
    setUsers(newUsers);
  }, [projectAdmins, projectManagers, projectDevelopers]);

  useClickOutside(modalRef, () => {
    setOpen(false);
  });

  return (
    <div className=" flex  ">
      <div className=" bg relative flex h-8 w-[96px] text-sm font-semibold ">
        {users[0] && users[0].photoUrl && (
          <img
            key={users[0].uid}
            src={users[0].photoUrl}
            className="absolute z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[0] && users[0].displayName[0]}
          />
        )}
        {users[0] && !users[0].photoUrl && (
          <div
            key={users[0].uid}
            className="absolute z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white"
          >
            {users[0] && users[0].displayName[0]}
          </div>
        )}
        {users[1] && users[1].photoUrl && (
          <img
            key={users[1].uid}
            src={users[1].photoUrl}
            className="absolute left-[20px] z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[1] && users[1].displayName[0]}
          />
        )}
        {users[1] && !users[1].photoUrl && (
          <div
            key={users[1].uid}
            className="absolute left-[20px] z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white"
          >
            {users[1] && users[1].displayName[0]}
          </div>
        )}
        {users[2] && users[2].photoUrl && (
          <img
            key={users[2].uid}
            src={users[2].photoUrl}
            className="absolute left-[40px] z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt={users[2] && users[2].displayName[0]}
          />
        )}
        {users[2] && !users[2].photoUrl && (
          <div
            key={users[2].uid}
            className="absolute left-[40px] z-[1] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white"
          >
            {users[2] && users[2].displayName[0]}
          </div>
        )}
        {users[3] && (
          <div
            key={users[3].uid}
            className="absolute left-[60px] z-[4] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-sm leading-none text-neutral-600"
          >
            {users.length > 3 && <div>+{users.length - 3}</div>}
          </div>
        )}
      </div>
      <button
        onClick={() => setOpen(true)}
        className="ml-2   flex items-center rounded-3xl bg-blue-100 px-3 font-semibold text-blue-500
                        hover:bg-blue-200 hover:text-blue-600"
      >
        Team
      </button>
      <TeamMembersModal modalRef={modalRef} open={open} setOpen={setOpen} />
    </div>
  );
};
