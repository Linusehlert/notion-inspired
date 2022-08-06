import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { Card } from "./Card";
import { CardListHeader } from "./CardListHeader";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AddCard } from "./AddCard";

export const CardList = ({ id, groupIndex }) => {
  const group = useSelector((state) => state.project.projectGroups[groupIndex]);
  const location = useLocation();

  return (
    <div className="group mr-3 flex w-60 flex-col ">
      {/*group header*/}
      <CardListHeader index={groupIndex} id={id} />
      <div className="flex h-[calc(100vh-217px)] w-[250px]  overflow-y-scroll rounded scrollbar-thin scrollbar-track-white scrollbar-thumb-neutral-200">
        {/*card list*/}
        {/*button to add new card*/}
        <div className="flex w-full flex-col">
          {group &&
            group.tasks &&
            group.tasks.map((task, index) => (
              <Card
                key={index}
                location={location}
                groupIndex={groupIndex}
                task={task}
              />
            ))}
          <AddCard index={groupIndex} id={id} />
        </div>
      </div>
    </div>
  );
};
