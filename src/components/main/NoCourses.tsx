import Link from "next/link";
import React from "react";

const NoCourses = ({ redirectUrl }: { redirectUrl: string }) => {
  return (
    <div className="px-3 w-full h-full">
      <div className="flex flex-col items-center justify-center h-full rounded-lg overflow-hidden transition-all duration-300 ease-in-out dark:bg-slate-950 bg-opacity-20 dark:bg-opacity-20 bg-slate-400">
        <div className="bg-black p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-[#f7f7f7] mb-4">
            No Courses Available
          </h1>
          <p className="text-[#d3d3d3] mb-6">
            It looks like there are no courses available at the moment. Please
            check back later.
          </p>
          <Link
            prefetch={false}
            className="px-4 py-2 bg-gray-950 text-white rounded lg:hover:bg-[#717171] transition duration-300"
            href={redirectUrl}
          >
            Go To Settings...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoCourses;
