"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomButton from "@/components/global/custom-button";
import CustomSelectOption from "@/components/global/custom-select-option";

type Props = {
  selectValue: string;
  setSelectValue: (value: string) => void;
  options: { value: string; label: string }[];
  isBackendProcessing: boolean;
  showButton: boolean;
  dialogTitle: string;
  dialogDescription: string;
  buttonActions: {
    value: string;
    content: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
  }[];
};

const ExtraClassGlobal = ({
  setSelectValue,
  options,
  isBackendProcessing,
  showButton,
  dialogTitle,
  dialogDescription,
  buttonActions,
}: Props) => {
  return (
    <div className="w-full bg-transparent flex flex-col ">
      <Dialog>
        <DialogTrigger asChild>
          <CustomButton
            disabled={isBackendProcessing}
            variant={"outline"}
            className={`w-full border dark:bg-black dark:text-white bg-white text-black border-gray-500 ${
              isBackendProcessing
                ? "cursor-not-allowed bg-opacity-10 dark:bg-stone-500"
                : ""
            }`}
            content={"Extra Class!!!"}
          />
        </DialogTrigger>
        <DialogContent className=" p-6 rounded-lg ">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-2">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-sm w-full text-gray-400 flex flex-col justify-center gap-3">
              <p>{dialogDescription}</p>
              <CustomSelectOption
                defaultValue="Select!!!"
                setSelectValue={(value) => setSelectValue(value)}
                options={options}
                isBackendProcessing={isBackendProcessing}
                showButton={showButton}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-center gap-4">
            {buttonActions.map((action) => (
              <CustomButton
                key={action.value}
                value={action.value}
                content={action.content}
                onClick={(e) => {
                  if (!e) return;
                  action.onClick(e);
                }}
                disabled={isBackendProcessing}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExtraClassGlobal;
