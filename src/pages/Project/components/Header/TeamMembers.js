import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase/config";
import { useSelector } from "react-redux";

export const TeamMembers = () => {
  const [users, setUsers] = useState([]);

  const { projectUsers } = useSelector((state) => state.project);
  useEffect(() => {
    const getUserDocuments = () => {
      setUsers([]);
      projectUsers.forEach(async (userId) => {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        const user = docSnap.data();
        setUsers((prevState) => [...prevState, user]);
      });
    };
    getUserDocuments();
  }, [projectUsers]);
  return (
    <div className="border-neutral-150 flex border-r pr-4 ">
      <div className={` relative flex h-8  w-[96px] `}>
        {users[0] && (
          <img
            src={users[0].photoUrl}
            className="absolute z-[1] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt="user"
          />
        )}
        {users[1] && (
          <img
            src={users[1].photoUrl}
            className="absolute left-[20px] z-[2] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt="user"
          />
        )}
        {users[2] && (
          <img
            src={users[2].photoUrl}
            className="absolute left-[40px] z-[3] h-8 w-8 cursor-default rounded-full border-2 border-white"
            alt="user"
          />
        )}
        {users[3] && (
          <div className="absolute left-[60px] z-[4] flex h-8 w-8 cursor-default items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-sm leading-none">
            {users.length > 3 && <div>+{users.length - 3}</div>}
          </div>
        )}
      </div>
      <button
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
    </div>
  );
};
