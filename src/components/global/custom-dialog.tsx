import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CustomButton from "./custom-button";

type CustomDialogProps = {
  title: string;
  buttonContent: string;
  children: React.ReactNode;
  onSubmit: () => void;
  isProcessing?: boolean;
  processingText?: string;
};

const CustomDialog = ({
  title,
  buttonContent,
  children,
  onSubmit,
  isProcessing = false,
  processingText = "Creating",
}: CustomDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <CustomButton
        disabled={isProcessing}
        variant={
          title.split(" ").includes("Create") ? "outline" : "destructive"
        }
        className={`w-full ${
          isProcessing
            ? "cursor-not-allowed bg-opacity-10 dark:bg-stone-500"
            : ""
        }`}
        content={buttonContent}
      />
    </DialogTrigger>
    <DialogContent className="rounded-lg shadow-lg p-4">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold mb-2">{title}</DialogTitle>
        <DialogDescription className="text-sm w-full text-gray-400 flex justify-center">
          {children}
        </DialogDescription>
      </DialogHeader>
      <div className="w-full flex justify-center gap-4 ">
        <CustomButton
          onClick={onSubmit}
          content={isProcessing ? processingText : title}
          disabled={isProcessing}
          className="flex justify-center items-center h-full w-full"
        />
      </div>
    </DialogContent>
  </Dialog>
);

export default CustomDialog;
