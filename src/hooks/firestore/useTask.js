import { db } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useTask = (taskId) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [task, setTask] = useState(null);
  const { projectId } = useSelector((state) => state.project);

  useEffect(() => {
    setIsPending(true);
    const docRef = doc(db, `projects/${projectId}/tasks/${taskId}`);
    const unsub = onSnapshot(docRef, (snapshot) => {
      if (snapshot.data()) {
        setTask(snapshot.data());
        setIsPending(false);
      } else setError("Document does not exist");
      setIsPending(false);
    });
    return () => unsub();
  }, [taskId, projectId]);
  return { isPending, error, task };
};
