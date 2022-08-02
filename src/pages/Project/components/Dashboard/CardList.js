import { db } from "../../../../firebase/config";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { Card } from "./Card";
import { CardListHeader } from "./CardListHeader";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export const CardList = ({ id, index }) => {
  const { userId, userName } = useSelector((state) => state.user);
  const { projectGroups, projectId } = useSelector((state) => state.project);
  const { updateDocument: updateProject } = useFirestore("projects");
  const group = useSelector((state) => state.project.projectGroups[index]);
  const location = useLocation();
  const navigate = useNavigate();

  //TODO add card in subcollections cards and update project with card reference

  // add card to group
  const handleAddTask = async () => {
    // add card in subcollection
    const colRef = collection(db, `projects/${projectId}/tasks`);
    const docRef = await addDoc(colRef, {
      title: "untitled",
      label: "",
      assignees: [{ id: userId, name: userName }],
      status: group.title,
      priority: 0,
      description: "",
      comments: [],
    });
    const newGroups = structuredClone(projectGroups);
    let newGroup = structuredClone(group);
    const newTasks = structuredClone(group.tasks);
    newTasks.push(docRef.id);
    newGroups[index] = { ...newGroup, tasks: newTasks };
    // update the project
    updateProject(projectId, {
      groups: newGroups,
    });
  };

  return (
    <div className="group mr-3 flex w-60 flex-col ">
      {/*group header*/}
      <CardListHeader index={index} id={id} />
      <div className="flex w-60 flex-col overflow-y-auto">
        {/*card list*/}
        {group &&
          group.tasks &&
          group.tasks.map((task, index) => (
            <Card key={index} location={location} taskId={task} />
          ))}
        {/*button to add new card*/}
        <button
          onClick={handleAddTask}
          className="flex cursor-pointer items-center justify-center rounded border border-dashed border-neutral-300 py-1
                text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 fill-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-2 text-sm">Add Card</p>
        </button>
      </div>
    </div>
  );
};
