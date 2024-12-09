"use client";

import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";
import { useDemoDataContext } from "@/providers/demo-data-provider";

type Props = {
  demo?: boolean;
};

export default function SearchBar({ demo }: Props) {
  const { state, dispatch } = useDataContext();
  const { state: demoState, dispatch: demoDispatch } = useDemoDataContext();

  const handleCancel = () => {
    if (demo) {
      return demoDispatch({
        type: "SET_DEMO_SEARCH_PARAM",
        payload: "",
      });
    }
    dispatch({
      type: "SET_SEARCH_PARAM",
      payload: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (demo) {
      return demoDispatch({
        type: "SET_DEMO_SEARCH_PARAM",
        payload: e.target.value,
      });
    }
    dispatch({
      type: "SET_SEARCH_PARAM",
      payload: e.target.value,
    });
  };

  return (
    <div className="overflow-hidden relative flex justify-center items-center gap-2 rounded-lg ">
      <Input
        type="text"
        value={demo ? demoState.demoSearchParam : state.searchParam}
        onChange={handleChange}
        placeholder="Search..."
        className="w-full text-sm font-medium text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-white dark:bg-gray-900 bg-gray-100 rounded-lg px-4 py-2"
      />
      <button
        className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-black dark:bg-gray-900 rounded-lg hover:bg-slate-600 transition-all duration-200"
        onClick={handleCancel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

{
  /* <div className="overflow-hidden relative flex justify-center items-center gap-3 p-2 bg-gradient-to-r from-white to-gray-500 rounded-lg">
      <Input
        type="text"
        value={demo ? demoState.demoSearchParam : state.searchParam}
        onChange={handleChange}
        placeholder="Search..."
        className="text-sm font-medium text-white placeholder:text-white bg-transparent border-none focus:outline-none"
      />
      <div
        className="px-3 py-1 cursor-pointer transition-colors duration-200 rounded-md text-white bg-red-500 hover:bg-red-600"
        onClick={handleCancel}
      >
        X
      </div>
    </div> */
}
