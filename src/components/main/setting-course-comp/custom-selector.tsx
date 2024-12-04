"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleSemester } from "@/lib/type";
import SemesterChangeButtons from "@/app/(menu)/setting-page/_components/sem-change-options/sem-change-buttons";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
  currentSemester: string;
  semesterList: SingleSemester[];
};

const CustomSelector = ({ currentSemester, semesterList }: Props) => {
  const [canChangeSemester, setCanChangeSemester] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(() => currentSemester);
  const router = useRouter();

  if (semesterList.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-300  p-2 rounded-lg">
        <p className="text-black">There is no semester available</p>
      </div>
    );
  }

  const handleChange = (e: string) => setSelected(e);

  const handleSemesterChange = async () => {
    if (!selected || selected === currentSemester) return;
    localStorage.setItem("semester", JSON.stringify(selected));
    toast.success("Semester Changed Successfully");
    router.push(`?semester=${selected}`, {
      scroll: false,
    });
    window.location.href = `?semester=${selected}`;
    setCanChangeSemester(false);
  };

  return (
    <div className="flex w-full gap-2">
      <Select value={selected || "  "} onValueChange={handleChange}>
        <SelectTrigger disabled={!canChangeSemester} className="w-full">
          <SelectValue placeholder={selected || currentSemester} />
        </SelectTrigger>
        <SelectContent>
          {semesterList.map((sem: SingleSemester) => (
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

export default CustomSelector;
