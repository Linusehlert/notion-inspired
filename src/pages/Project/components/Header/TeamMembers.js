import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import Modal from "../../../../components/Modals/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase/config";

export const TeamMembers = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const modalRef = useRef();

  const {
    projectUsers,
    projectAdmins,
    projectManagers,
    projectDevelopers,
    projectTitle,
    projectId,
  } = useSelector((state) => state.project);
  const { userId, userName } = useSelector((state) => state.user);

  useEffect(() => {
    setUsers([]);
    const newUsers = [
      ...projectAdmins,
      ...projectManagers,
      ...projectDevelopers,
    ];
    setUsers(newUsers);
  }, [projectAdmins, projectManagers, projectDevelopers]);

  const createInviteLink = async (role) => {
    const colRef = collection(db, "invites");
    const docRef = await addDoc(colRef, {
      projectTitle,
      projectId,
      users: projectUsers,
      inviterName: userName,
      inviterId: userId,
      role,
      expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    const host = window.location.host;
    const inviteLink = `${host}/invite/${docRef.id}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

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
        Manage
      </button>
      {/*Team Members Modal*/}
      <Modal open={open}>
        <div
          ref={modalRef}
          className="relative z-50 h-5/6 w-[800px] cursor-text rounded bg-white text-sm font-semibold text-neutral-500"
        >
          <div className="px-12 py-4">
            <div className="  relative py-2 px-3">
              {projectTitle + " "}/
              <span className="text-neutral-700"> Manage Team</span>
              {copied && (
                <div className="absolute right-1 right-32 top-1 rounded bg-neutral-700 py-1  px-2 text-white">
                  Copied Invite Link to Clipboard
                </div>
              )}
            </div>
            <h3 className="mt-1 mb-3 px-3 text-3xl font-bold text-neutral-700 outline-none">
              Team Members
            </h3>
            {/*Admins*/}
            <div className="flex w-full justify-between p-3">
              <div className="mr-4 w-52  ">
                <div className="mb-2 flex w-full items-center  ">
                  <h3 className="p-0.5 text-base">Admins</h3>
                  {/*Invite Button*/}
                  <button
                    onClick={() => createInviteLink("admin")}
                    className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300"
                  >
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
                {/*Admins List*/}
                {projectAdmins.map((admin) => (
                  <div key={admin.uid} className="mb-2 flex items-center ">
                    {admin.photoUrl && (
                      <img
                        src={admin.photoUrl}
                        className="h-8 w-8 cursor-default rounded-full "
                        alt={admin.displayName[0]}
                      />
                    )}
                    {!admin.photoUrl && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                        {admin.displayName[0]}
                      </div>
                    )}
                    <div className="ml-4">
                      <h3 className="text-neutral-700">{admin.displayName}</h3>
                      <h4 className="text-xs font-normal">{admin.email}</h4>
                    </div>
                    <button
                      disabled={copied}
                      className="ml-auto rounded p-0.5 hover:bg-neutral-200"
                    >
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
              <div className="mr-4 w-52  ">
                <div className=" mb-2 flex w-full items-center ">
                  <h3 className="p-0.5  text-base">Managers</h3>
                  <button
                    onClick={() => createInviteLink("manager")}
                    disabled={copied}
                    className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300"
                  >
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
                  <div key={manager.id} className="mb-1 flex items-center">
                    {manager.photoUrl && (
                      <img
                        src={manager.photoUrl}
                        className="h-8 w-8 cursor-default rounded-full "
                        alt={manager.displayName[0]}
                      />
                    )}
                    {!manager.photoUrl && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                        {manager.displayName[0]}
                      </div>
                    )}
                    <div className="ml-2">
                      <h3 className="text-neutral-700">
                        {manager.displayName}
                      </h3>
                      <h4 className="text-xs font-normal">{manager.email}</h4>
                    </div>
                    <button
                      disabled={copied}
                      className="ml-auto rounded p-0.5 hover:bg-neutral-200"
                    >
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
                  <button
                    onClick={() => createInviteLink("developer")}
                    disabled={copied}
                    className="ml-auto flex items-center rounded bg-neutral-200 pl-1.5 pr-2 hover:bg-neutral-300"
                  >
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
                  <div key={developer.id} className="mb-1 flex items-center">
                    {developer.photoUrl && (
                      <img
                        src={developer.photoUrl}
                        className="h-8 w-8 cursor-default rounded-full "
                        alt={developer.displayName[0]}
                      />
                    )}
                    {!developer.photoUrl && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
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
