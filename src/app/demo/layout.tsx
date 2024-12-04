import { Toaster } from "sonner";
import SideBarDemo from "@/components/main/side-bar-comps/demo/SideBarDemo";
import { DemoContextProvider } from "@/providers/demo-data-provider";
import { Suspense } from "react";
import Appbar from "@/components/main/Appbar";
import { LoadingSpinner } from "@/components/global/load-spinner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoContextProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <div
          className={`w-full h-full bg-[radial-gradient(circle_at_57%_36%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_10%,_transparent_10%,_transparent_100%),_radial-gradient(circle_at_22%_61%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_36%,_transparent_36%,_transparent_100%),_radial-gradient(circle_at_68%_97%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_41%,_transparent_41%,_transparent_100%),_radial-gradient(circle_at_57%_89%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_radial-gradient(circle_at_39%_80%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_22%,_transparent_22%,_transparent_100%),_radial-gradient(circle_at_88%_71%,_hsla(263,0%,78%,0.04)_0%,_hsla(263,0%,78%,0.04)_30%,_transparent_30%,_transparent_100%),_linear-gradient(0deg,_rgb(255,255,255),_rgb(255,255,255))] dark:bg-[radial-gradient(circle_at_center_top,_black_70%,_#008B8B_120%)]`}
        >
          <div className="h-full w-full grid grid-rows-10 p-2 gap-y-2">
            <div className="row-span-1 rounded-lg">
              <Appbar demo={true} />
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
        </div>
      </Suspense>
    </DemoContextProvider>
  );
}
