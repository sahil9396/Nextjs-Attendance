import { Input } from "../ui/input";
import { Label } from "../ui/label";

type CustromInputProps = {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
  type: string;
};

export const CustromInput = ({
  label,
  value,
  onChange,
  type,
}: CustromInputProps) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <Label htmlFor={label}>{label}</Label>
      <Input
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="col-span-2 h-8"
        type={type}
      />
    </div>
  );
};
