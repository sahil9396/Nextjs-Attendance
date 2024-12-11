"use client";
import CustomProfilePage from "@/components/main/setting-course-comp/custom-profile-page";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { state } = useDataContext();
  const currentSemester = useSearchParams().get("semester");
  if (state.isLoading) return null;
  const { email_address, first_name, user_name, verified, image_url } =
    state.user;

  return (
    <CustomProfilePage
      email_address={email_address}
      first_name={first_name}
      user_name={user_name}
      verified={verified}
      image_url={image_url}
      currentSemester={currentSemester}
    />
  );
};
export default ProfilePage;
