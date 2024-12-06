"use client";
import { useDataContext } from "@/providers/data-provider";
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
  const { state } = useDataContext();
  return (
    <div className="w-full bg-transparent flex flex-col ">
      <Dialog>
        <DialogTrigger
          className={`flex justify-center w-full bg-white text-black lg:hover:text-white shadow-sm py-2 px-4 rounded-lg lg:hover:bg-slate-800 transition duration-300`}
        >
          Extra Class!!!
        </DialogTrigger>
        <DialogContent className=" p-6 rounded-lg shadow-lg">
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
                isBackendProcessing={state.isBackendProcessing}
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
