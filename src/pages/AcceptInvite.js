import { useSelector } from "react-redux";
import {
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

export const AcceptInvite = () => {
  const [isPending, setIsPending] = useState(true);
  const [projectId, setProjectId] = useState(null);
  const [projectTitle, setProjectTitle] = useState(null);
  const [users, setUsers] = useState(null);
  const [inviterId, setInviterId] = useState(null);
  const [inviterName, setInviterName] = useState(null);
  const [role, setRole] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const { userId, userName, userEmail, userPhoto } = useSelector(
    (state) => state.user
  );
  const location = useLocation();
  const inviteId = location.pathname.substring(8, location.pathname.length);
  const navigate = useNavigate();

  useEffect(() => {
    setIsPending(true);
    const docRef = doc(db, "invites", inviteId);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setProjectId(docSnap.data().projectId);
        setProjectTitle(docSnap.data().projectTitle);
        setUsers(docSnap.data().users);
        setInviterId(docSnap.data().inviterId);
        setInviterName(docSnap.data().inviterName);
        setRole(docSnap.data().role);
        setExpirationDate(docSnap.data().expirationDate);
      }
    });
    setIsPending(false);
  }, [inviteId]);

  const acceptInvite = async () => {
    if (!users.includes(userId)) {
      const docRef = doc(db, "projects", projectId);
      const newUser = {
        id: userId,
        displayName: userName,
        email: userEmail,
        photoUrl: userPhoto,
      };
      switch (role) {
        case "admin":
          await updateDoc(docRef, {
            admins: arrayUnion(newUser),
            users: arrayUnion(userId),
          });
          break;
        case "manager":
          await updateDoc(docRef, {
            managers: arrayUnion(newUser),
            users: arrayUnion(userId),
          });
          break;
        case "developer":
          await updateDoc(docRef, {
            developers: arrayUnion(newUser),
            users: arrayUnion(userId),
          });
          break;
        default:
          break;
      }
    }
    const docRef = doc(db, "invites", inviteId);
    await deleteDoc(docRef);
    //delete invite document
    navigate(projectId, { replace: true });
  };

  if (!userId) return <Navigate to="/login" replace />;

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center ">
        <BarLoader color={"#123abc"} />
      </div>
    );
  }
  if (!inviterId) return <Navigate to="/login" replace />;

  return (
    <div className=" flex h-screen w-full flex-col items-center">
      <div className="mt-[30vh] rounded border border-neutral-200 px-6 py-4 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-semibold text-neutral-500">
          {inviterName} invited you as a {role}
        </h2>
        <div className="mb-2 rounded border border-neutral-200 text-center ">
          <h3 className="border-b border-neutral-100 px-3 py-2 font-semibold text-neutral-700">
            {projectTitle}
          </h3>
          <p className=" my-2 px-3 text-sm font-normal text-neutral-500">
            {users && users.length} Team Member
            {users && users.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={acceptInvite}
          className="border-light focus:bg-gray mt-3  w-full rounded border border-blue-500 py-1.5 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
        >
          Accept Invite
        </button>
      </div>
    </div>
  );
};
