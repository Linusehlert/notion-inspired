import { ProfileSection } from "./ProfileSection/ProfileSection";
import { Workspace } from "./ProjectsSection/Workspace";

export default function Sidebar() {
  return (
    <div className="z-99 relative box-border hidden h-full w-64 shrink-0 grow-0 cursor-default bg-neutral-100 md:block">
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
