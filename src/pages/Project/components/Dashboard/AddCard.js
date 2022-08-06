import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { useLocation, useNavigate } from "react-router-dom";

export const AddCard = ({ index }) => {
  const { userId, userName } = useSelector((state) => state.user);
  const { projectGroups, projectId } = useSelector((state) => state.project);
  const group = useSelector((state) => state.project.projectGroups[index]);

  const { updateDocument: updateProject } = useFirestore("projects");

  const navigate = useNavigate();
  const location = useLocation();

  // add card to group
  const addTask = () => {
    // clone and update the groups property
    const newGroups = structuredClone(projectGroups);
    let newGroup = structuredClone(group);
    const newTasks = structuredClone(group.tasks);
    const id = uuid();
    const newCard = {
      title: "untitled",
      id,
      labels: [""],
      assignees: [{ id: userId, name: userName }],
      priority: "None",
      description: "Bubatz",
      comments: [],
    };
    newTasks.push(newCard);
    newGroups[index] = { ...newGroup, tasks: newTasks };
    // update the project
    updateProject(projectId, {
      groups: newGroups,
    });
    navigate(`${location.pathname}/${id}?view=center`);
  };
  return (
    <button
      onClick={addTask}
      className="flex w-60 cursor-pointer items-center justify-center rounded border border-dashed border-neutral-300 py-1
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
  );
};
