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
  const [selected, setSelected] = useState<string | undefined>(
    () => currentSemester || state.semesterInfo[0]?.semester
  );
  const router = useRouter();

  if (state.isLoading) return null;

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
          <SelectValue placeholder={"placeholderValue"} />
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
