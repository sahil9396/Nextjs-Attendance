import CustomButton from "@/components/global/custom-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SubmitCompDemo() {
  const options = [
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <>
      <Select
        value={"selectValue"}
        defaultValue={"defaultValue"}
      >
        <SelectTrigger className="w-full dark:bg-slate-800 bg-white">
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
      <CustomButton
        size={"sm"}
        className="bg-slate-600 dark:bg-gray-900 text-white"
        disabled={false}
        content="Submit"
      />
    </>
  );
}

export default SubmitCompDemo;
