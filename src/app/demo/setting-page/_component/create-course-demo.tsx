import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/global/custom-button";
import { DaySelector } from "@/app/(menu)/setting-page/_components/create-course";

type inputKey = {
  attri: string;
  key: string;
  placeholder: string;
  type: string;
};

export function CreateCourseDemo() {
  const daycheck = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  };

  const inputFields = [
    {
      attri: "Course :",
      key: "indivCourse",
      placeholder: "e.g., Math 101",
      type: "text",
    },
    {
      attri: "Criteria :",
      key: "criteria",
      placeholder: "e.g., 75",
      type: "text",
    },
    {
      attri: "Days :",
      key: "totaldays",
      placeholder: "e.g., 35",
      type: "text",
    },
    {
      attri: "Present :",
      key: "present",
      placeholder: "e.g., 0",
      type: "text",
    },
    { attri: "Absent :", key: "absent", placeholder: "e.g., 0", type: "text" },
    {
      attri: "Cancel :",
      key: "cancelled",
      placeholder: "e.g., 0",
      type: "text",
    },
  ];

  const timeFields = [
    {
      attri: "Start :",
      key: "startTime",
      placeholder: "e.g., 0",
      type: "time",
    },
    { attri: "End :", key: "endTime", placeholder: "e.g., 0", type: "time" },
  ];

  return (
    <div className="bg-slate-400 bg-opacity-20 lg:h-full rounded-lg shadow-lg flex flex-col justify-between gap-5 lg:gap-0 dark:bg-slate-950 dark:bg-opacity-20 overflow-y-auto">
      <div className="grid grid-cols-1 items-center justify-cente gap-4 lg:gap-0">
        {inputFields.map((inputField: inputKey) => (
          <div
            key={inputField.key}
            className="p-4 rounded-md grid grid-cols-3 gap-4 items-center"
          >
            <label className=" lg:text-lg font-semibold w-full text-end">
              {inputField.attri}
            </label>
            <div className="col-span-2">
              <Input
                placeholder={inputField.placeholder}
                type={inputField.type}
                className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm bg-white text-gray-900 dark:bg-slate-950 dark:bg-opacity-40 dark:text-gray-200"
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          {timeFields.map((timeField: inputKey) => (
            <div
              key={timeField.key}
              className="p-4 w-full rounded-md gap-4 items-center"
            >
              <div>
                <Input
                  type={timeField.type}
                  className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm bg-white text-gray-900 dark:bg-slate-950 dark:bg-opacity-40 dark:text-gray-200"
                />
              </div>
              <p className="text-red-400 mt-1"></p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-fit flex flex-col gap-6 items-center justify-evenly">
        <div className="flex justify-center gap-4 text-sm">
          <Button
            type="button"
            className="bg-slate-600 dark:bg-slate-800 text-white rounded-lg py-2 px-4 hover:bg-slate-500"
          >
            Select All
          </Button>
          <Button
            type="button"
            className="dark:bg-gray-500 shadow-md bg-white text-black dark:text-white  rounded-lg py-2 px-4 hover:bg-slate-500"
          >
            Clear All
          </Button>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-4">
          {Object.entries(daycheck).map(([key, value]) => (
            <DaySelector key={key} day={key} isSelected={value as boolean} />
          ))}
        </div>
      </div>
      <CustomButton
        type="button"
        className="w-full py-3 px-5 bg-slate-600 dark:bg-gray-900 text-white font-semibold rounded-md shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
        disabled={false}
        content="Submit"
      />
    </div>
  );
}

export default CreateCourseDemo;
