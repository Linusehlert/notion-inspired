import { Transition } from "@headlessui/react";
import { useLogout } from "../../../hooks/auth/useLogout";

export const OptionsPopup = ({ isOpen }) => {
  const { logout, isPending } = useLogout();

  return (
    <Transition
      show={isOpen}
      enter="transition-opacity duration-300 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="z-100 border-neutral-150 fixed top-16 left-2 flex w-60 flex-col items-start rounded
                        border bg-neutral-50 p-1 text-sm text-neutral-600 shadow-lg
                        transition "
      >
        {/*TODO edit Profile*/}
        <button className="flex w-full items-center rounded px-2 py-1 text-start hover:bg-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          Edit Profile
        </button>
        {/*User LogOut*/}
        <button
          onClick={logout}
          disabled={isPending}
          className="flex w-full items-center rounded px-2 py-1 text-start hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
          Log Out
        </button>
      </div>
    </Transition>
  );
};
