import Image from "next/image";
import React from "react";

const ProfilePageDemo = () => {
  const demoState = {
    email_address: "xxx@gmail.com",
    phone_number: "1234567890",
    first_name: "John",
    user_name: "john123",
    verified: true,
    image_url:
      "https://images.unsplash.com/photo-1732530361158-09f4154b6b3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
  };

  const {
    email_address,
    phone_number,
    first_name,
    user_name,
    verified,
    image_url,
  } = demoState;
  const currentSemester = "Fall 2023"; // Define currentSemester

  return (
    <div className="h-full flex flex-col justify-start items-center gap-5 p-5 rounded-lg bg-slate-400 dark:bg-slate-950 bg-opacity-20 dark:bg-opacity-20">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <Image
          src={image_url}
          alt="Image"
          width={40}
          height={40}
          className="border-[#575757] border-2 rounded-lg"
        />
      </div>
      <div className="w-full h-full flex flex-col gap-4 text-sm md:text-lg ">
        <ProfilePair title="Email" value={email_address} />
        <ProfilePair title="Phone" value={phone_number} />
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

export default ProfilePageDemo;
