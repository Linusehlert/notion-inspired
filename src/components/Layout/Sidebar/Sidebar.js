import {useRef, useState} from "react";
import {useLogout} from "../../../hooks/useLogout";
import {useAuthContext} from "../../../hooks/useAuthContext";
import {useClickOutside} from "../../../hooks/useClickOutside";
//components
import {Transition} from '@headlessui/react'
//firestore
import {useFirestore} from "../../../hooks/useFirestore";
import {useCollection} from "../../../hooks/useCollection";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../firebase/config";
import {FolderList} from "./FolderList";

export default function Sidebar() {
    //modal
    const [pIsOpen, setPIsOpen] = useState(false);
    const profileRef = useRef();
    //auth
    const {logout, isPending} = useLogout()
    const {user} = useAuthContext()
    //firestore
    const {addDocument: addFolder} = useFirestore(collection(db, 'folders'))
    const {documents: folders} = useCollection(
        query(collection(db, 'folders'),where('createdBy', '==', user.uid))
        )

    //close modal when click outside
    useClickOutside(profileRef, () => setPIsOpen(false));

    return (
        <div className="bg-gray w-64 min-h-screen box-border relative">
            {/*Content*/}
            <div className="fixed w-64">
                {/*Profile Section*/}
                <div className="px-2 pt-4 pb-3 border-b border-b-line">
                    {/*Profile*/}
                    <div onClick={() => setPIsOpen(!pIsOpen)} ref={profileRef}
                         className="flex mb-2 p-2 rounded cursor-pointer
                    hover:bg-secondary">
                        <div
                            className="flex justify-center items-center text-2xl font-bold text-light w-12 h-12 bg-primary mr-3 rounded">{user.displayName[0]}</div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-text-head font-bold">{user.displayName}</h5>
                            <small className="text-text-body ">Free Plan</small>
                        </div>
                        <div className="ml-auto h-12 flex flex-col justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-body"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        {/*Profile Options Popup*/}
                        <Transition
                            show={pIsOpen}
                            enter="transition-opacity duration-300 ease-in-out"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-300 ease-in-out"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="flex flex-col items-start bg-gray p-1 fixed top-20 left-2 z-100 w-60
                        text-sm text-text-light border border-light rounded shadow-lg
                        transition ">
                                <button
                                    className="flex items-center px-2 py-1 w-full text-start rounded hover:bg-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-2" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path
                                            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
                                        <path fillRule="evenodd"
                                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Edit Profile
                                </button>
                                <button onClick={logout} disabled={isPending}
                                        className="flex items-center px-2 py-1 w-full text-start rounded hover:bg-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-2" viewBox="0 0 20 20"
                                         fill="currentColor">
                                        <path fillRule="evenodd"
                                              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Log Out
                                </button>
                            </div>
                        </Transition>
                    </div>

                    {/*Search*/}
                    <div className="bg-white h-10 mx-2 my-4 px-2 py-1.5 rounded flex items-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-light mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clipRule="evenodd"/>
                        </svg>
                        <p className="text-base text-text-light">Quick Find</p>
                    </div>
                    {/*Quick Navigation*/}
                    <div className="flex items-center px-2 py-1.5 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                  clipRule="evenodd"/>
                        </svg>
                        Activity
                    </div>
                    <div className="flex items-center px-2 py-1.5 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"/>
                        </svg>
                        All Updates
                    </div>
                    <div className="flex items-center px-2 py-1.5 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clipRule="evenodd"/>
                        </svg>
                        Settings
                    </div>
                </div>
                {/*Projects Navigation*/}
                <div className="px-2 pt-2">
                    <div className="flex items-center px-2 py-1.5 text-text-light font-semibold mb-2">
                        Workspace
                        {/*Create new Folder*/}
                        <button onClick={addFolder}
                                className="ml-auto bg-secondary p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-text-body"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    {folders && <FolderList folders={folders}/>}
                </div>
            </div>
        </div>
    )
        ;
}