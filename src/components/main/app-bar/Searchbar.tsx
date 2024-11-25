"use client";

import { Input } from "@/components/ui/input";
import { useDataContext } from "@/providers/data-provider";

export default function SearchBar() {
  const { state, dispatch } = useDataContext();

  return (
    <div className="overflow-hidden relative flex justify-center items-center gap-3">
      <Input
        type="text"
        value={state.searchParam}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: "SET_SEARCH_PARAM",
            payload: e.target.value,
          })
        }
        placeholder="Search..."
        className="text-sm font-medium text-white placeholder:text-white dark:bg-black bg-slate-400 bg-opacity-70 rounded-xl px-4 py-2"
      />
      <div
        className="px-2 py-1 cursor-pointer transition-colors duration-200 rounded-md text-white placeholder:text-white dark:bg-slate-900 dark:bg-opacity-50 dark:hover:bg-slate-800 bg-slate-400 hover:bg-slate-300"
        onClick={() =>
          dispatch({
            type: "SET_SEARCH_PARAM",
            payload: "",
          })
        }
      >
        X
      </div>
    </div>
  );
}
