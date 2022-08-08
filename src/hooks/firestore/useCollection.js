import { onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

export const useCollection = (query, id) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const _query = useRef(query).current;
  useEffect(() => {
    const unsub = onSnapshot(_query, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      // update state
      setDocuments(results);
      setError(null);
      setIsPending(false);
    });

    // unsubscribe on unmount
    return () => unsub();
  }, [_query]);

  return { documents, error, isPending };
};
