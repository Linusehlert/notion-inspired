import {NavLink} from "react-router-dom";
import {ProjectList} from "./ProjectList";

export const FolderList = ({folders}) => {
    return (
        folders.map(folder =>
            <div>
                <NavLink to={`/${folder.id}`} key={folder.id}
                         className={({isActive}) =>
                    isActive ? "flex items-center px-2 py-1.5 rounded font-semibold" +
                        " bg-primary text-white cursor-pointer" :
                        "flex items-center px-2 py-1.5 py-1.5 rounded font-semibold text-text-body" +
                        " hover:bg-primary" +
                        " hover:text-white"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-body mr-2" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-text-body mr-2 hidden"
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                    {folder.title}
                </NavLink>
                {<ProjectList folderId={folder.id}/>}
            </div>
        )
    )
}