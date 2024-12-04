"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import CustomButton from "./custom-button";

type Props = {
  defaultValue?: string;
  setSelectValue: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
  isBackendProcessing: boolean;
  showButton?: boolean;
};

const CustomSelectOption = ({
  defaultValue,
  setSelectValue,
  options,
  isBackendProcessing,
  showButton = true,
}: Props) => {
  return (
    <>
      <Select onValueChange={setSelectValue}>
        <SelectTrigger className="w-full dark:bg-slate-800 bg-white">
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showButton && (
        <CustomButton
          size={"sm"}
          className="bg-slate-600 dark:bg-gray-900 text-white"
          disabled={isBackendProcessing}
          content="Submit"
        />
      )}
    </>
  );
};

export default CustomSelectOption;
