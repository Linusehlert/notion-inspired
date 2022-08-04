import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { Card } from "./Card";
import { CardListHeader } from "./CardListHeader";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AddCard } from "./AddCard";

export const CardList = ({ id, index }) => {
  const group = useSelector((state) => state.project.projectGroups[index]);
  const location = useLocation();

  return (
    <div className="group mr-3 flex w-60 flex-col ">
      {/*group header*/}
      <CardListHeader index={index} id={id} />
      <div className="flex w-60 flex-col overflow-y-auto">
        {/*card list*/}
        {group &&
          group.tasks &&
          group.tasks.map((task, index) => (
            <Card key={index} location={location} id={id} task={task} />
          ))}
        {/*button to add new card*/}
        <AddCard index={index} id={id} />
      </div>
    </div>
  );
};
