import {NavLink} from "react-router-dom";
import {useFirestore} from "../../../hooks/useFirestore";
import {useCollection} from "../../../hooks/useCollection";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../firebase/config";
import {useAuthContext} from "../../../hooks/useAuthContext";

export const ProjectList = ({folderId}) => {
    const {user} = useAuthContext();
    //firestore
    const {addDocument: addProject} = useFirestore(collection(db, 'folders', folderId, 'projects'));
    const {documents: projects} = useCollection(
        query(collection(db, 'folders', folderId, 'projects'), where('createdBy', '==', user.uid))
    )

    return (
        <nav className="ml-7 mr-2">
            <ul>
                {projects && projects.map(project =>
                    <li>
                        <NavLink to={`/${folderId}/${project.id}`} key={project.id}
                                 className={({isActive}) =>
                                     isActive ? "bg-secondary flex px-2 py-1.5 rounded text-text-head" +
                                         " font-semibold text-sm cursor-pointer" :
                                         "flex px-2 py-1.5 rounded text-text-light font-semibold text-sm" +
                                         " cursor-pointer hover:bg-secondary hover:text-text-head"
                                 }>{project.title}
                        </NavLink>
                    </li>
                )}
                <li onClick={addProject}
                    className="px-2 py-1.5 rounded flex items-center font-semibold text-sm text-text-body cursor-pointer
                        hover:bg-secondary hover:text-text-head">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-primary mr-2"
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"/>
                    </svg>
                    {/*create new project*/}
                    Add New
                </li>
            < /ul>
        </nav>
    )
}