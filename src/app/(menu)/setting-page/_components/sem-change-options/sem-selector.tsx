"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleSemester } from "@/providers/data-provider";
import SemesterChangeButtons from "./sem-change-buttons";

const SemSelector = ({
  currentSemester,
  semList,
}: {
  currentSemester: string | undefined;
  semList: SingleSemester[];
}) => {
  const [canChangeSemester, setCanChangeSemester] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | undefined>(currentSemester);
  const router = useRouter();

  const handleChange = (e: string) => setSelected(e);

  const handleSemesterChange = async () => {
    // localStorage.setItem("semester", JSON.stringify(selectedSem));
    router.push(`?semester=${selected}`, {
      scroll: false,
    });
    router.refresh();
    toast.success("Semester Changed Successfully");
    setCanChangeSemester(false);
  };

  return (
    <div className="flex w-full gap-2">
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger disabled={!canChangeSemester} className="w-full">
          <SelectValue placeholder={"placeholderValue"} />
        </SelectTrigger>
        <SelectContent>
          {semList.map((sem: SingleSemester) => (
            <SelectItem key={sem.id} value={sem.semester}>
              {sem.semester}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        <SemesterChangeButtons
          canChange={canChangeSemester}
          setCanChange={setCanChangeSemester}
          onChange={handleSemesterChange}
          setValue={setSelected}
          semesterInfo={currentSemester || ""}
          //   isProcessing={false}
        />
      </div>
    </div>
  );
};

export default SemSelector;
