import { LoadingSpinner } from "@/components/global/load-spinner";
import Appbar from "@/components/main/Appbar";
import { SidebarNew } from "@/components/main/SideBarNew";
import { DemoContextProvider } from "@/providers/demo-data-provider";
import { Suspense } from "react";
import { Toaster } from "sonner";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <DemoContextProvider>
        <div className="flex flex-col-reverse md:flex-row h-screen w-full">
          <SidebarNew demo={true} />
          <main className="flex-1 overflow-y-auto">
            <Appbar demo={true} />
            <div className="container mx-auto py-4">{children}</div>
          </main>
          <Toaster />
        </div>
      </DemoContextProvider>
    </Suspense>
  );
}