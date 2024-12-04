import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  day,
  formKeyType,
  formSchema,
  inputData,
  SingleSemester,
} from "@/lib/type";
import CustomButton from "@/components/global/custom-button";

type inputKey = {
  attri: string;
  key: string;
  placeholder: string;
  type: string;
};

type Props = {
  todayCourses: inputData[];
  notTodaycourse: inputData[];
  currentSemester: string | undefined | null;
  semesterList: SingleSemester[];
  functionInhandleSubmit: (
    courseData: inputData,
    courseDays: string[],
    semExists: SingleSemester
  ) => void;
};

const CustomForm = ({
  todayCourses,
  notTodaycourse,
  currentSemester,
  semesterList,
  functionInhandleSubmit,
}: Props) => {
  const [daycheck, setDayCheck] = useState<day>({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indivCourse: "PHY-101",
      criteria: "75",
      totaldays: "35",
      present: "0",
      absent: "0",
      cancelled: "0",
      startTime: "08:00",
      endTime: "09:00",
    },
  });

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

  const handleSelectAllDays = () => {
    setDayCheck({
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
    });
  };

  const handleClearAllDays = () => {
    setDayCheck({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
    });
  };

  const handleToggleDay = (day: string) => {
    setDayCheck({
      ...daycheck,
      [day]: !daycheck[`${day}`],
    });
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const semExists = semesterList.find(
      (sem) => sem.semester === currentSemester
    );

    if (!semExists) {
      toast.error(`Please select a semester :)`);
      return;
    }

    const thatCourse =
      todayCourses.find(
        (course) => course.IndivCourse === values.indivCourse
      ) ||
      notTodaycourse.find(
        (course) => course.IndivCourse === values.indivCourse
      );

    console.log(thatCourse);
    if (thatCourse && thatCourse?.IndivCourse) {
      toast.error(`Course with the same name already exists :)`);
      return;
    }

    const courseDays = Object.keys(daycheck).filter(
      (day: string) => daycheck[day]
    );

    if (courseDays.length === 0) {
      toast.error(`Please select at least one day :)`);
      return;
    }

    if (values.startTime >= values.endTime) {
      toast.error(`Start Time should be less than End Time :)`);
      return;
    }

    const courseData: inputData = {
      timeofcourse: `${values.startTime} - ${values.endTime}`,
      present: Number(values.present),
      absent: Number(values.absent),
      cancelled: Number(values.cancelled),
      criteria: Number(values.criteria),
      IndivCourse: values.indivCourse,
      totaldays: Number(values.totaldays),
      Totaldays: Number(values.totaldays),
      thatday: courseDays,
    };

    await functionInhandleSubmit(courseData, courseDays, semExists);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="bg-slate-400 bg-opacity-20 lg:h-full rounded-lg shadow-lg flex flex-col justify-between gap-5 lg:gap-0 dark:bg-slate-950 dark:bg-opacity-20 overflow-y-auto"
      >
        <div className="grid grid-cols-1 items-center justify-center gap-4 lg:gap-0">
          {inputFields.map((inputField: inputKey) => (
            <FormField
              name={`${inputField.key as formKeyType}`}
              key={inputField.key}
              control={form.control}
              render={({ field }) => (
                <FormItem className="p-4 rounded-md grid grid-cols-3 gap-4 items-center">
                  <FormLabel className=" lg:text-lg font-semibold w-full text-end">
                    {inputField.attri}
                  </FormLabel>
                  <FormControl className=" col-span-2">
                    <Input
                      placeholder={inputField.placeholder}
                      {...field}
                      type={inputField.type}
                      className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm bg-white text-gray-900 dark:bg-slate-950 dark:bg-opacity-40 dark:text-gray-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 mt-1" />
                </FormItem>
              )}
            />
          ))}
          <div className="flex justify-between">
            {timeFields.map((timeField: inputKey) => (
              <FormField
                name={timeField.key as formKeyType}
                key={timeField.key}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="p-4 w-full rounded-md gap-4 items-center">
                    <FormControl className="">
                      <Input
                        {...field}
                        type={timeField.type}
                        className="block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm bg-white text-gray-900 dark:bg-slate-950 dark:bg-opacity-40 dark:text-gray-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 mt-1" />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-fit flex flex-col gap-6 items-center justify-evenly">
          <div className="flex justify-center gap-4 text-sm">
            <Button
              type="button"
              onClick={handleSelectAllDays}
              className="bg-slate-600 dark:bg-slate-800 text-white rounded-lg py-2 px-4 hover:bg-slate-500"
            >
              Select All
            </Button>
            <Button
              type="button"
              onClick={handleClearAllDays}
              className="dark:bg-gray-500 shadow-md bg-white text-black dark:text-white  rounded-lg py-2 px-4 hover:bg-slate-500"
            >
              Clear All
            </Button>
          </div>
          <div className="flex w-full flex-wrap justify-center gap-4">
            {Object.entries(daycheck).map(([key, value]) => (
              <DaySelector
                key={key}
                day={key}
                isSelected={value as boolean}
                toggleDay={() => handleToggleDay(key)}
              />
            ))}
          </div>
        </div>
        <CustomButton
          type="submit"
          className="w-full py-3 px-5 bg-slate-600 dark:bg-gray-900 text-white font-semibold rounded-md shadow hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
          disabled={false}
          content="Submit"
        />
      </form>
    </Form>
  );
};

export const DaySelector = ({
  day,
  isSelected,
  toggleDay,
}: {
  day: string;
  isSelected: boolean;
  toggleDay?: () => void;
}) => {
  return (
    <div
      onClick={toggleDay}
      className={`py-2 px-4 rounded-lg hover:scale-125 ${
        isSelected
          ? `bg-slate-600 dark:bg-slate-800 text-white`
          : `bg-gray-100 text-black dark:bg-gray-500 dark:text-white`
      } hover:bg-slate-500 cursor-pointer transition-all duration-150`}
    >
      <span className="text-sm md:text-base ">
        {day.toString().slice(0, 3)}
      </span>
    </div>
  );
};

export default CustomForm;
