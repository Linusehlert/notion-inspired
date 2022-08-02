import { TaskModal } from "../components/Modals/TaskModal";
import { useSearchParams } from "react-router-dom";

export const Task = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");

  if (view == "center") return <TaskModal />;

  // if (view == "page") return <TaskPage />;
};
