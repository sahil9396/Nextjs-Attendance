import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-4 text-primary-foreground">
      <Card className="bg-secondary">
        <CardHeader>
          <CardTitle className="text-white">
            Welcome to the Attendance App
          </CardTitle>
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
