import { setProject } from "../../features/projectSlice";
import { db } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useDocument = (col, id) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsPending(true);
    const docRef = doc(db, col, id);
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.data()) {
        const {
          title,
          users,
          admins,
          managers,
          developers,
          groups,
          labelOptions,
        } = snapshot.data();

        dispatch(
          setProject({
            projectTitle: title,
            projectUsers: users,
            projectAdmins: admins,
            projectManagers: managers,
            projectDevelopers: developers,
            projectGroups: groups,
            projectId: id,
            projectLabels: labelOptions,
          })
        );
        setError(null);
      } else setError("Document does not exist");
      setIsPending(false);
    });
    return () => unsub();
  }, [col, id]);

  return { isPending, error };
};
