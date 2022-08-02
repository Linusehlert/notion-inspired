import { DashboardHeader } from "./components/Dashboard/DashboardHeader";
import { GroupList } from "./components/Dashboard/GroupList";
import { Header } from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";

export default function Project() {
  const { pathname } = useLocation();
  const id =
    pathname.length >= 22
      ? pathname.substring(1, pathname.lastIndexOf("/"))
      : pathname;

  //firestore
  // const { isPending, error } = useDocument("projects", id);
  //
  console.log("Project");
  //
  // if (error) {
  //   return (
  //     <div className="flex w-full items-center justify-center text-xl">
  //       {error}
  //     </div>
  //   );
  // }
  //
  // if (isPending) {
  //   return (
  //     <div className="flex w-full items-center justify-center text-xl">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div className="flex w-full flex-col overflow-hidden">
      {/*Header*/}
      <Header id={id} projectTitle={"hehe"} />
      {/*Dashboard*/}
      <div className="mt-6 text-sm font-semibold text-neutral-500">
        <DashboardHeader />
        {/*Dashboard Body*/}
        {/*Group List*/}
        <GroupList id={id} />
      </div>
      <Outlet />
    </div>
  );
}
