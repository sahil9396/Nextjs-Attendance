"use client";
import { useDemoDataContext } from "@/providers/demo-data-provider";
import CustomProfilePage from "@/components/main/setting-course-comp/custom-profile-page";
import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const { demoUser } = useDemoDataContext().state;
  const currentSemester = useSearchParams().get("semester");

  return (
    <div className="space-y-6 h-full w-full px-3 lg:w-3/4 m-auto">
      <CustomProfilePage
        email_address={demoUser.email_address}
        first_name={demoUser.first_name}
        user_name={demoUser.user_name}
        verified={demoUser.verified}
        image_url={
          "https://images.unsplash.com/photo-1732530361158-09f4154b6b3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8"
        }
        currentSemester={currentSemester}
      />
    </div>
  );
}
