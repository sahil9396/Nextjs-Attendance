"use client";
import CustomProfilePage from "@/components/main/setting-course-comp/custom-profile-page";
import { useSearchParams } from "next/navigation";
import { useDataContext } from "@/providers/data-provider";

export const runtime = "edge";

export default function ProfilePage() {
  const { user } = useDataContext().state;
  const currentSemester = useSearchParams().get("semester");

  return (
    <div className="space-y-6 h-full w-full px-3 lg:w-3/4 m-auto">
      <CustomProfilePage
        email_address={user.email_address}
        first_name={user.first_name}
        user_name={user.user_name}
        verified={user.verified}
        image_url={user.image_url}
        currentSemester={currentSemester}
      />
    </div>
  );
}
