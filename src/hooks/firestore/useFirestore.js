import { bgColors } from "../../assets/bgColors";
import { db } from "../../firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "SUCCESS":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const { userId, userName } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // add a project
  const addProject = () => {
    dispatch({ type: "IS_PENDING" });
    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];

    const colRef = collection(db, col);
    addDoc(colRef, {
      title: "untitled",
      createdAt: serverTimestamp(),
      users: [userId],
      groups: [{ bgColor: randomBgColor, title: "No Status", tasks: [] }],
    })
      .then((addedDocument) => {
        navigate(`/${addedDocument.id}`);
        dispatch({ type: "SUCCESS", payload: addedDocument });
      })
      .catch((err) => {
        dispatch({ type: "ERROR", payload: err.message });
        console.log(err.message);
      });
  };

  //add a card to a project
  // const addCard = async (status) => {
  //   dispatch({ type: "IS_PENDING" });
  //   const colRef = collection(db, col);
  //   addDoc(colRef, {
  //     title: "untitled",
  //     label: "",
  //     assignees: [{ id: userId, name: userName }],
  //     status,
  //     priority: 0,
  //     description: "",
  //     comments: [],
  //   })
  //     .then((addedDocument) => {
  //       dispatch({ type: "SUCCESS", payload: addedDocument });
  //       return addedDocument;
  //     })
  //     .catch((err) => {
  //       dispatch({ type: "ERROR", payload: err.message });
  //       console.log(err.message);
  //     });
  // };

  // update a document
  const updateDocument = async (id, obj) => {
    dispatch({ type: "IS_PENDING" });
    const docRef = doc(db, col, id);
    const updatedDocument = await updateDoc(docRef, obj);
    dispatch({ type: "SUCCESS", payload: updatedDocument });
  };

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));

      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: "could not delete" });
    }
  };

  return { addProject, updateDocument, deleteDocument, response };
};
