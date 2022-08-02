import { ProfileSection } from "./ProfileSection/ProfileSection";
import { Workspace } from "./ProjectsSection/Workspace";

export default function Sidebar() {
  return (
    <div className="grow-0 shrink-0 hidden md:block w-64 h-full z-99 box-border bg-neutral-100 relative cursor-default">
      {/*Content*/}
      <div className="fixed w-64">
        {/*Profile Section*/}
        <ProfileSection />
        {/*Projects Navigation*/}
        <Workspace />
      </div>
    </div>
  );
}
