import { useClickOutside } from "../../../hooks/useClickOutside";
import { OptionsPopup } from "./OptionsPopup";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const ProfileSection = () => {
  //modal
  const [pIsOpen, setPIsOpen] = useState(false);
  const profileRef = useRef();
  //auth
  const { userName } = useSelector((state) => state.user);

  //close modal when click outside
  useClickOutside(profileRef, () => setPIsOpen(false));

  return (
    <div className="border-b-neutral-150 box-border border-b p-2 pb-[10px]">
      {/*Profile*/}
      <div
        onClick={() => setPIsOpen(!pIsOpen)}
        ref={profileRef}
        className="mb-2 flex cursor-pointer rounded p-2
                    hover:bg-neutral-200"
      >
        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded bg-blue-600 text-xl font-bold text-neutral-200">
          {userName && userName[0]}
        </div>
        <div className="flex flex-col justify-center">
          <h5 className="font-semibold text-neutral-800">{userName}</h5>
          <small className="text-xs text-neutral-500">Free Plan</small>
        </div>
        <div className="ml-auto flex h-10 flex-col justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-neutral-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {/*Profile Options Popup*/}
        <OptionsPopup isOpen={pIsOpen} />
      </div>

      {/*Search*/}
      <div className="mx-2 my-2 flex cursor-pointer items-center rounded bg-white py-1.5 px-3 text-neutral-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-text-light text-base">Quick Find</p>
      </div>
      {/*Quick Navigation*/}
      <div
        className="flex cursor-pointer items-center rounded px-2 py-1 font-semibold text-neutral-600
                    hover:bg-neutral-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        Updates
      </div>
      <div
        className="flex cursor-pointer items-center rounded px-2 py-1 font-semibold text-neutral-600
                    hover:bg-neutral-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3 h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
            clipRule="evenodd"
          />
        </svg>
        Settings
      </div>
    </div>
  );
};
