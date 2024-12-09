"use client";
import { LoadingSpinner } from "@/components/global/load-spinner";
import CustomProfilePage from "@/components/main/setting-course-comp/custom-profile-page";
import { useDataContext } from "@/providers/data-provider";
import { useSearchParams } from "next/navigation";
import React from "react";

const ProfilePage = () => {
  const { state } = useDataContext();
  const currentSemester = useSearchParams().get("semester");
  if (state.isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  const {
    email_address,
    phone_number,
    first_name,
    user_name,
    verified,
    image_url,
  } = state.user;

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
export default ProfilePage;
