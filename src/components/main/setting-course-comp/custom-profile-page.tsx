import Image from "next/image";
import React from "react";

type Props = {
  email_address: string | null;
  first_name: string | null;
  user_name: string | null;
  verified: boolean;
  image_url: string | null;
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
    <div className="h-full flex flex-col justify-start items-center gap-5 p-5 rounded-lg bg-slate-400 dark:bg-slate-950 bg-opacity-20 dark:bg-opacity-20">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        {image_url && (
          <Image
            src={image_url}
            alt="Image"
            width={40}
            height={40}
            className="border-[#575757] border-2 rounded-lg"
          />
        )}
      </div>
      <div className="w-full h-full flex flex-col gap-4 text-sm md:text-lg ">
        <ProfilePair title="Email" value={email_address} />
        <ProfilePair title="First Name" value={first_name} />
        <ProfilePair title="Username" value={user_name} />
        <ProfilePair title="Verified" value={verified ? "Yes" : "No"} />
        <ProfilePair title="Semester" value={currentSemester} />
      </div>
    </div>
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
    <div className="flex justify-between  ">
      <p className="font-semibold w-full">{title}</p>
      <p className="break-words w-full truncate">{value}</p>
    </div>
  );
};

export default CustomProfilePage;
