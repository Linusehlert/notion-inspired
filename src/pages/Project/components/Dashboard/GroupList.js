import { bgColors } from "../../../../assets/bgColors";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { CardList } from "./CardList";
import { arrayUnion } from "firebase/firestore";
import { useSelector } from "react-redux";

export const GroupList = () => {
  const { projectGroups, projectId } = useSelector((state) => state.project);
  const { updateDocument: updateProject } = useFirestore("projects");

  const addGroup = () => {
    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    updateProject(projectId, {
      groups: arrayUnion({
        title: "untitled",
        bgColor: randomBgColor,
        tasks: [],
      }),
    });
  };

  return (
    <div className="mt-6 flex h-screen overflow-x-auto px-12">
      {projectGroups &&
        projectGroups.map((group, index) => (
          <CardList key={index} index={index} />
        ))}
      {/*Add Group*/}
      <button
        onClick={addGroup}
        className="flex h-8 items-center justify-center rounded border border-dashed border-neutral-300 px-2
                    hover:bg-neutral-200"
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
      </button>
    </div>
  );
};
