import { LoadingSpinner } from "@/components/global/load-spinner";
import Appbar from "@/components/main/Appbar";
import DataLoader from "@/components/main/Data-loader";
import { SidebarNew } from "@/components/main/SideBarNew";
import { Context_Pro_Provider } from "@/providers/data-provider";
import { Suspense } from "react";
import { Toaster } from "sonner";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Context_Pro_Provider>
        <DataLoader>
          <div className="flex flex-col-reverse md:flex-row h-screen w-full">
            <SidebarNew demo={false} />
            <main className="flex-1 overflow-y-auto">
              <Appbar demo={false} />
              <div className="container mx-auto py-4">{children}</div>
            </main>
            <Toaster />
          </div>
        </DataLoader>
      </Context_Pro_Provider>
    </Suspense>
  );
}
