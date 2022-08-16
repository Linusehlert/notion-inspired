import { ProfileSection } from "./ProfileSection/ProfileSection";
import { Workspace } from "./ProjectsSection/Workspace";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={`z-99 relative box-border h-full w-64 shrink-0 grow-0 cursor-default bg-neutral-100 ${
          !isOpen ? "hidden" : ""
        }`}
      >
        {/*Content*/}
        <div className="fixed w-64">
          {/*Profile Section*/}
          <ProfileSection setNavOpen={setIsOpen} />
          {/*Projects Navigation*/}
          <Workspace />
        </div>
      </div>
      <div className={`"relative ${isOpen ? "hidden" : ""}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="group-2  absolute rounded p-1 text-neutral-500 hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-2-hover:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 8h16M4 16h16"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hidden h-6 w-6 group-2-hover:block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
