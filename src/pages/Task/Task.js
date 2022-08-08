import { TaskModal } from "./views/TaskModal";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Task = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");
  const { projectGroups } = useSelector((state) => state.project);
  const { pathname } = useLocation();
  const taskId = pathname.slice(22);

  let task = {};
  let taskIndex = 0;
  let groupIndex = 0;
  projectGroups.forEach((group, groupInd) => {
    group.tasks.forEach((t, taskInd) => {
      if (t.id === taskId) {
        task = t;
        groupIndex = groupInd;
        taskIndex = taskInd;
      }
    });
  });
  if (view == "center")
    return (
      <TaskModal task={task} groupIndex={groupIndex} taskIndex={taskIndex} />
    );

  // if (view == "page") return <TaskPage />;
};
