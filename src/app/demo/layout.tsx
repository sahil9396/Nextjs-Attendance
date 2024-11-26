import Appbar from "@/components/main/Appbar";
import { Toaster } from "sonner";
import SideBarDemo from "@/components/main/SideBarDemo";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-full w-full grid grid-rows-10 p-2 gap-y-2">
        <div className="row-span-1 rounded-lg">
          <Appbar />
        </div>
        <div className="w-full row-span-9 relative flex flex-col-reverse lg:flex-row gap-2 overflow-hidden">
          <div
            className={`lg:w-1/6 lg:h-full flex justify-center items-center rounded-lg bg-slate-400 dark:bg-slate-900 bg-opacity-20 dark:bg-opacity-20`}
          >
            <SideBarDemo />
          </div>
          <div className={`lg:w-5/6 rounded-lg flex-grow overflow-y-auto`}>
            {children}
          </div>
          <Toaster />
        </div>
      </div>
    </Suspense>
  );
}
