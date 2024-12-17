"use client";
import Link from "next/link";
import {
  Home,
  BookOpen,
  Calendar,
  Settings,
  User,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import NavigationButtons from "./side-bar-comps/NavigationButtons";

const sidebarNavItemsGenerator = (demo: boolean) => {
  const baseHref = demo ? "/demo/dashboard" : "/dashboard";
  return [
    {
      title: "Home",
      href: `${baseHref}`,
      icon: Home,
    },
    {
      title: "Today's Courses",
      href: `${baseHref}/today`,
      icon: Calendar,
    },
    {
      title: "All Courses",
      href: `${baseHref}/courses`,
      icon: BookOpen,
    },
    {
      title: "Settings",
      href: `${baseHref}/settings`,
      icon: Settings,
    },
    // {
    //   title: "Pricing",
    //   href: `${baseHref}/pricing`,
    //   icon: CreditCard,
    // },
    {
      title: "Profile",
      href: `${baseHref}/profile`,
      icon: User,
    },
  ];
};

export function SidebarNew({ demo = false }: { demo?: boolean }) {
  return (
    <div className="lg:w-64 md:w-20 w-full h-20 md:h-full flex flex-col justify-between lg:justify-between items-center gap-5 py-2 border-r">
      <div className="flex flex-col w-full">
        <div className="hidden md:flex h-14 items-center border-b px-4">
          {/* WIP : match this thing */}
          <Link
            href={demo ? "/demo/dashboard" : "/dashboard"}
            className=" flex items-center gap-2 font-semibold"
          >
            <BookOpen className="h-6 w-6" />
            <span className="hidden lg:block">EduTrack</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2 py-4">
            <NavigationButtons menuOptions={sidebarNavItemsGenerator(demo)} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
