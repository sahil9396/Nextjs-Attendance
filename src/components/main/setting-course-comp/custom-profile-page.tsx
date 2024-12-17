import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import React from "react";

const offset = 20;

type Props = {
  email_address: string | null;
  first_name: string | null;
  user_name: string | null;
  verified: boolean;
  image_url: string;
  currentSemester: string | null;
};

const CustomProfilePage = ({
  email_address,
  first_name,
  user_name,
  verified,
  image_url,
  currentSemester,
}: Props) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={image_url} />
          {first_name && (
            <AvatarFallback>
              {first_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{first_name}</h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ProfilePair title="Email" value={email_address} />
        <ProfilePair title="First Name" value={first_name} />
        <ProfilePair title="Username" value={user_name} />
        <ProfilePair title="Verified" value={verified ? "Yes" : "No"} />
        <ProfilePair title="Semester" value={currentSemester} />
      </div>
    </Card>
  );
};

const ProfilePair = ({
  title,
  value,
}: {
  title: string;
  value: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="border w-full rounded-xl p-3 flex gap-5 justify-center items-center">
      <Label className="break-words whitespace-nowrap  w-1/4" htmlFor="name">
        {title}
      </Label>
      :
      <Label
        id="name"
        className="w-3/4 text-[0.85rem] md:text-md truncate overflow-hidden"
      >
        {value.slice(0, offset)}
        {value.length > offset ? "..." : ""}
      </Label>
    </div>
  );
};

export default CustomProfilePage;
