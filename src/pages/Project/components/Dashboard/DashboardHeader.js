export const DashboardHeader = () => {
  console.log("DashboardHeader");
  return (
    <div className="border-neutral-150 box-border flex overflow-hidden border-b">
      {/*views*/}
      <ul className="flex items-center pl-12">
        <li className="box-border cursor-pointer border-b-2 border-blue-500 pb-2 text-blue-500 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
          By Status
        </li>
        <li className="ml-4 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
          By Assignee
        </li>
        <li className="ml-4 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
          My Tasks
        </li>
        <li className="ml-4 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500">
          Due Tasks
        </li>
      </ul>
      <div className="ml-auto mr-12 flex ">
        {/*Filters*/}
        <ul className="mb-2 flex items-center ">
          <li className="">Filter</li>
          <li className="ml-4 hidden text-neutral-800 lg:block">No Filter</li>
          <li className="ml-4">Sort</li>
          <li className="ml-4 hidden text-neutral-800 lg:block">A -> Z</li>
          <li className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </li>
        </ul>
      </div>
    </div>
  );
};
