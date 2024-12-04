import CustomButton from "@/components/global/custom-button";
import CustomDialog from "@/components/global/custom-dialog";

type SemesterChangeButtonsProps = {
  canChange: boolean;
  setCanChange: (value: boolean) => void;
  onChange: () => void;
  setValue: (value: string) => void;
  semesterInfo: string;
  isProcessing?: boolean;
};

const SemesterChangeButtons = ({
  canChange,
  setCanChange,
  onChange,
  setValue,
  semesterInfo,
  isProcessing = false,
}: SemesterChangeButtonsProps) => {
  return canChange ? (
    <div className="flex gap-2">
      <CustomButton
        onClick={() => {
          setValue(semesterInfo);
          setCanChange(false);
        }}
        content="Cancel"
        disabled={isProcessing}
        className="bg-red-500"
      />
      <CustomButton
        onClick={() => onChange()}
        content={isProcessing ? "Changing" : "Change"}
        disabled={isProcessing}
        className="bg-green-500"
      />
    </div>
  ) : (
    <CustomDialog
      title="Change"
      buttonContent="Change"
      isProcessing={isProcessing}
      processingText="Changing"
      onSubmit={() => setCanChange(true)}
    >
      {/* <CustomButton
        onClick={() => setCanChange(confirm("Change the semester?"))}
        content="Change Semester"
        disabled={isProcessing}
      /> */}
      Do you Really want to change the semester?
    </CustomDialog>
  );
};

export default SemesterChangeButtons;
