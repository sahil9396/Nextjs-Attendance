import CustomButton from "@/components/global/custom-button";

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
    <CustomButton
      onClick={() => setCanChange(confirm("Change the semester?"))}
      content="Change Semester"
      //   disabled={isProcessing}
    />
  );
};

export default SemesterChangeButtons;
