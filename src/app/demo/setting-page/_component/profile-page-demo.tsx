"use client";
import CustomProfilePage from "@/components/main/setting-course-comp/custom-profile-page";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProfilePageDemo = () => {
  const { demoUser } = useDemoDataContext().state;
  const { email_address, phone_number, first_name, user_name, verified } =
    demoUser;
  const image_url =
    "https://images.unsplash.com/photo-1732530361158-09f4154b6b3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8";
  const currentSemester = useSearchParams().get("semester"); // Define currentSemester

  return (
    <CustomProfilePage
      email_address={email_address}
      phone_number={phone_number}
      first_name={first_name}
      user_name={user_name}
      verified={verified}
      image_url={image_url}
      currentSemester={currentSemester}
    />
  );
};
export default ProfilePageDemo;
