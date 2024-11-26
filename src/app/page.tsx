import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full h-full text-primary-foreground grid grid-rows-10 grid-cols-1 p-4 text-black dark:text-white">
      <div className="row-span-1 col-span-1 px-4 w-full h-full flex justify-between items-center text-black dark:text-white">
        <h1 className="lg:text-2xl font-bold text-sm ">Attendance App</h1>
        <div className="flex flex-col items-center overflow-hidden rounded-lg gap-2 w-2/12 shadow-xl shadow-blue-400 dark:shadow-blue-800">
          <ModeToggle />
        </div>
      </div>
      <div className="row-span-9 col-span-1 w-full h-full flex justify-center items-center">
        <Card className="bg-secondary w-fit shadow-2xl shadow-blue-400 dark:shadow-blue-800 rounded-lg">
          <CardHeader>
            <CardTitle className=" text-xl">
              Welcome to the Attendance App
            </CardTitle>
            <p className=" text-sm">
              Manage your attendance efficiently and effortlessly.
            </p>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Link
              prefetch={false}
              href={"/list-course"}
              className="w-full bg-blue-700 text-white p-4 rounded-lg text-center hover:bg-blue-800 transition"
            >
              Get started
            </Link>
            <Link
              href={"/demo/list-course"}
              className="w-full bg-blue-700 text-white p-4 rounded-lg text-center hover:bg-blue-800 transition"
            >
              Click for demo
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
