"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SingleSemester, useDataContext } from "@/providers/data-provider";
import SemesterChangeButtons from "./sem-change-buttons";

const SemSelector = () => {
  const currentSemester = useSearchParams().get("semester");
  const [canChangeSemester, setCanChangeSemester] = useState<boolean>(false);
  const { state } = useDataContext();
  const [selected, setSelected] = useState<string>(
    () => currentSemester || state.semesterInfo[0]?.semester
  );
  const router = useRouter();

  if (state.isLoading) return null;
  if (state.semesterInfo.length === 0) {
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
      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger disabled={!canChangeSemester} className="w-full">
          <SelectValue
            placeholder={selected || state.semesterInfo[0]?.semester}
          />
        </SelectTrigger>
        <SelectContent>
          {state.semesterInfo.map((sem: SingleSemester) => (
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
