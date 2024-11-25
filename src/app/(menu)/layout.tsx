import Appbar from "@/components/main/Appbar";
import SideBar from "@/components/main/SideBar";
import { Toaster } from "sonner";
import { Context_Pro_Provider } from "@/providers/data-provider";
import DataLoader from "@/components/main/Data-loader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // console.log("🚀 ~ file: layout.tsx ~ line 1 ~ Layout ~ children");
  return (
    <Context_Pro_Provider>
      <DataLoader>
        <div className="h-full w-full grid grid-rows-10 p-2 gap-y-2">
          <div className="row-span-1 rounded-lg">
            <Appbar />
          </div>
          <div className="w-full row-span-9 relative flex flex-col-reverse lg:flex-row gap-2 overflow-hidden">
            <div
              className={`lg:w-1/6 lg:h-full flex justify-center items-center rounded-lg bg-slate-400 dark:bg-slate-900 bg-opacity-20 dark:bg-opacity-20`}
            >
              <SideBar />
            </div>
            <div className={`lg:w-5/6 rounded-lg flex-grow overflow-y-auto`}>
              {children}
            </div>
            <Toaster />
          </div>
        </div>
      </DataLoader>
    </Context_Pro_Provider>
  );
}
