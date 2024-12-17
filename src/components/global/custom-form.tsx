"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
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
        className="max-w-xl mx-auto p-6 space-y-6 shadow-md rounded-md border border-gray-600"
      >
        {inputFields.map((inputField: inputKey) => (
          <FormField
            name={inputField.key as formKeyType}
            key={inputField.key}
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-2 flex justify-center items-center gap-2">
                <FormLabel className="whitespace-nowrap w-1/4 text-right">
                  {inputField.attri}
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-3/4 p-2 border border-gray-600 rounded-md"
                    placeholder={inputField.placeholder}
                    {...field}
                    type={inputField.type}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-center items-center gap-5 w-full">
          {timeFields.map((timeField: inputKey) => (
            <FormField
              name={timeField.key as formKeyType}
              key={timeField.key}
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2 w-[200px]">
                  <FormControl>
                    <Input
                      className="w-full p-2 border border-gray-600 rounded-md"
                      {...field}
                      type={timeField.type}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <CustomButton
            type="button"
            variant={"default"}
            content="Select All"
            onClick={handleSelectAllDays}
            className="px-4 py-2"
          />
          <CustomButton
            type="button"
            variant={"outline"}
            content="Clear All"
            onClick={handleClearAllDays}
            className="px-4 py-2"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(daycheck).map(([key, value]) => (
            <DaySelector
              key={key}
              day={key}
              isSelected={value as boolean}
              toggleDay={() => handleToggleDay(key)}
            />
          ))}
        </div>
        <CustomButton
          type="submit"
          variant={"outline"}
          content="Submit"
          className="w-full px-4 py-2 "
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
    <CustomButton
      type="button"
      variant={isSelected ? "default" : "outline"}
      content={day.toString().slice(0, 3)}
      onClick={toggleDay}
      className="px-4 py-2"
    />
  );
};

export default CustomForm;
