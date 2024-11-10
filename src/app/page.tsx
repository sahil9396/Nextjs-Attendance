import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="w-full h-screen flex justify-center items-center p-4 bg-gray-900"
      style={{
        backgroundImage:
          "radial-gradient(circle at top center, rgba(10,50,10,0.1) 50%, rgb(0,139,139) 120%)",
      }}
    >
      <Card className="bg-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Welcome to the Attendance App</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Link
            href={"/"}
            className="w-full bg-blue-700 text-white p-4 rounded-lg text-center"
          >
            Get started
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
