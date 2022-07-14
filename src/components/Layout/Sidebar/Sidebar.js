import {Link, NavLink} from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="bg-gray w-64 min-h-screen box-border relative">
            {/*Content*/}
            <div className="fixed w-64">
                {/*Profile Section*/}
                <div className="px-2 py-4 border-b border-b-line">
                    <div className="flex mb-2 p-2 rounded cursor-pointer
                    hover:bg-secondary">
                        <div className="w-12 h-12 bg-primary mr-3 rounded"></div>
                        <div className="flex flex-col justify-center">
                            <h5 className="text-black font-bold">Linus Ehlert</h5>
                            <small className="text-text-body ">Free Plan</small>
                        </div>
                        <div className="ml-auto h-12 flex flex-col justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-body"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </div>
                    </div>
                    {/*Profile*/}
                    {/*Search*/}
                    <div className="bg-white h-10 mx-2 my-4 p-2 rounded flex items-center cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-light mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <p className="text-base text-text-light">Quick Find</p>
                    </div>
                    {/*Quick Navigation*/}
                    <div className="flex items-center p-2 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                  clip-rule="evenodd"/>
                        </svg>
                        Activity
                    </div>
                    <div className="flex items-center p-2 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clip-rule="evenodd"/>
                        </svg>
                        All Updates
                    </div>
                    <div className="flex items-center p-2 font-semibold rounded cursor-pointer
                    hover:bg-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon mr-3" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                  clip-rule="evenodd"/>
                        </svg>
                        Settings
                    </div>
                </div>
                {/*Projects Navigation*/}
                <div className="px-2 py-4">
                    <div className="flex items-center p-2 text-text-light font-semibold mb-2">
                        Workspace
                        {/*Create new Folder*/}
                        <button className="ml-auto bg-secondary p-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-text-body"
                                 viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fill-rule="evenodd"
                                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                      clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <NavLink to="folderId" className={({isActive}) =>
                                             isActive ? "flex items-center p-2 rounded font-semibold" +
                                                 " bg-primary text-white cursor-pointer" :
                    "flex items-center p-2 rounded font-semibold text-text-body hover:bg-primary hover:text-white"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-body mr-2" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clip-rule="evenodd"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-body mr-2 hidden"
                             viewBox="0 0 20 20"
                             fill="currentColor">
                            <path fill-rule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clip-rule="evenodd"/>
                        </svg>
                        Daily Todos
                    </NavLink>
                    <nav className="ml-7 mr-2">
                        <ul>
                            <li>
                                <NavLink to="folderId/projectId"
                                         className={({isActive}) =>
                                             isActive ? "bg-secondary flex p-2 rounded text-text-head font-semibold text-sm cursor-pointer" :
                                                 "flex p-2 rounded text-text-light font-semibold text-sm" +
                                                 " cursor-pointer hover:bg-secondary hover:text-text-head"
                                         }>Portfolio Website
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="folderId/projectId2"
                                         className={({isActive}) =>
                                             isActive ? "bg-secondary flex p-2 rounded text-text-head font-semibold text-sm cursor-pointer" :
                                                 "flex p-2 rounded text-text-light font-semibold text-sm" +
                                                 " cursor-pointer hover:bg-secondary hover:text-text-head"
                                         }>Notion Remake
                                </NavLink>
                            </li>
                            <li className="p-2 rounded flex items-center font-semibold text-sm text-text-body cursor-pointer
                        hover:bg-secondary hover:text-text-head">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary mr-2"
                                     viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fill-rule="evenodd"
                                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                          clip-rule="evenodd"/>
                                </svg>
                                {/*create new project*/}
                                Add New
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
        ;
}