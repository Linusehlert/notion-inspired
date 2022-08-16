import Modal from "../../../../components/Modals/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useState } from "react";
import { useSelector } from "react-redux";

export const TeamMembersModal = ({ open, setOpen, modalRef }) => {
  const [copied, setCopied] = useState(false);

  const {
    projectUsers,
    projectAdmins,
    projectManagers,
    projectDevelopers,
    projectTitle,
    projectId,
  } = useSelector((state) => state.project);

  const { userId, userName } = useSelector((state) => state.user);

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

  return (
    <Modal open={open} setOpen={setOpen}>
      <div
        ref={modalRef}
        className="relative z-50 h-5/6 w-full cursor-text rounded bg-white text-sm font-semibold text-neutral-500 md:w-[800px]"
      >
        <div className="py-4 px-4 md:px-12">
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
          <div className=" flex w-full flex-col justify-between p-3 md:flex-row">
            <div className="mr-4 w-full md:w-52  ">
              <div className="mb-2 flex w-full items-center  ">
                <h3 className="p-0.5 text-base">Admins</h3>
                {/*Invite Button*/}
                <button
                  onClick={() => createInviteLink("admin")}
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
              {/*Admins List*/}

              {projectAdmins.map((admin) => (
                <div className="mb-2 flex items-center ">
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
            <div className="mr-4 w-full md:w-52  ">
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
                    <h3 className="text-neutral-700">{manager.displayName}</h3>
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
            <div className="w-full md:w-52 ">
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
  );
};
