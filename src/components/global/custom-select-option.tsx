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
  selectValue: string;
  setSelectValue: (value: string) => void;
  options: any[];
  showButton?: boolean;
};

const CustomSelectOption = ({
  defaultValue,
  selectValue,
  setSelectValue,
  options,
  showButton = true,
}: Props) => {
  return (
    <>
      <Select
        value={selectValue}
        defaultValue={defaultValue}
        onValueChange={setSelectValue}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Status" />
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
          // onClick={handleSubmit}
          // disabled={isBackendProcessing}
          content="Submit"
        />
      )}
    </>
  );
};

export default CustomSelectOption;
