import { DashboardHeader } from "./components/Dashboard/DashboardHeader";
import { GroupList } from "./components/Dashboard/GroupList";
import { Header } from "./components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { useDocument } from "../../hooks/firestore/useDocument";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { AcceptInvite } from "../AcceptInvite";

export default function Project() {
  const { pathname } = useLocation();
  const id = pathname.length >= 22 ? pathname.substring(1, 21) : pathname;
  const { projectId } = useSelector((state) => state.project);

  // firestore
  const { isPending, error } = useDocument("projects", id);

  if (error) {
    return (
      <div className="flex w-full items-center justify-center text-xl">
        {error}
      </div>
    );
  }

  if (isPending || !projectId) {
    return (
      <div className="flex w-full items-center justify-center ">
        <BarLoader color={"#123abc"} />
      </div>
    );
  }

  if (pathname.includes("/invite/")) {
    return <AcceptInvite />;
  }

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
