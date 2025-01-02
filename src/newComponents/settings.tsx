import React from "react";
import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/ui/theme-toggle";
import SemMutateDialog from "@/components/main/setting-course-comp/sem-mutate-dialog";
import CustomSelector from "@/components/main/setting-course-comp/custom-selector";
import CourseMutateButtons from "@/components/main/setting-course-comp/course-mutate-buttons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type SettingsPageProps = {
  semList: { id: number; semester: string; userId: number }[];
  currentSemester: string | null | undefined;
  IsBackendProcessing: boolean;
  courseEmpty: boolean;
  handleSubmitCreate: (semesterNumber: number) => void;
  handleSubmitDelete: (semesterNumber: number) => void;
  handleResetAll: () => void;
  handleDeleteAll: () => void;
  demo?: boolean;
};

const SettingsComp = ({
  semList,
  currentSemester,
  IsBackendProcessing,
  courseEmpty,
  handleSubmitCreate,
  handleSubmitDelete,
  handleResetAll,
  handleDeleteAll,
  demo,
}: SettingsPageProps) => {
  const linkHref = currentSemester
    ? demo
      ? `/demo/dashboard/courses/new?semester=${currentSemester}`
      : `/dashboard/courses/new?semester=${currentSemester}`
    : demo
    ? `/demo/dashboard/courses/new`
    : `/dashboard/courses/new`;
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="w-full flex flex-col md:flex-row gap-5 justify-between">
        <Link className="w-full md:w-auto" href={linkHref}>
          <Button
            variant={"outline"}
            className="w-full md:w-auto items-center justify-center border border-gray-500 gap-1"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <Card className="p-6 flex justify-between">
          <h2 className="text-xl font-semibold">Appearance</h2>
          <div className=" w-20 dark:bg-slate-800 bg-gray-800 text-black dark:text-white rounded-xl flex items-center justify-between gap-5">
            <ModeToggle />
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Semester Management</h2>
            <div className="flex flex-col gap-4">
              <CustomSelector
                currentSemester={currentSemester || semList[0]?.semester}
                semesterList={semList}
              />
              <div className="flex flex-col md:flex-row gap-4">
                <SemMutateDialog
                  title="Create Semester"
                  buttonContent="Create Semester"
                  placeholder="Enter Semester Number"
                  semList={semList}
                  handleSubmit={handleSubmitCreate}
                  isBackendProcessing={IsBackendProcessing}
                  processingText="Creating..."
                />
                <SemMutateDialog
                  title="Delete Semester"
                  buttonContent="Delete Semester"
                  placeholder="Enter Semester Number"
                  semList={semList}
                  handleSubmit={handleSubmitDelete}
                  isBackendProcessing={IsBackendProcessing}
                  processingText="Deleting..."
                />
              </div>
            </div>
          </Card>

          {!currentSemester || courseEmpty ? null : (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Course Management</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <CourseMutateButtons
                  currentSemester={currentSemester}
                  isBackendProcessing={IsBackendProcessing}
                  functionhandleResetAll={handleResetAll}
                  functionhandleDeleteAll={handleDeleteAll}
                />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsComp;
