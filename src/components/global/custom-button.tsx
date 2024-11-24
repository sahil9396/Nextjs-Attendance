"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LoadingSpinner } from "./load-spinner";
// import { LoadingSpinner } from "../global/loading";
// import { useDataContext } from "@/providers/data-provider";

type Props = {
  onClick?: (value?: React.MouseEvent<HTMLElement>) => void;
  content: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?:
    | "secondary"
    | "default"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  value?: string;
  className?: string;
};

const CustomButton = ({
  onClick,
  content,
  disabled,
  type = "button",
  variant,
  size,
  value,
  className,
}: Props) => {
  const [showLoading, setShowLoading] = useState(false);
  const handleOnClick = async (e: React.MouseEvent<HTMLElement>) => {
    setShowLoading(true);
    if (onClick) {
      await onClick(e);
    }
    setShowLoading(false);
  };
  return (
    <Button
      onClick={(e) => handleOnClick(e)}
      disabled={disabled}
      type={type}
      value={value}
      variant={variant}
      size={size}
      className={className}
    >
      {showLoading && <LoadingSpinner />}
      {content}
    </Button>
  );
};

export default CustomButton;
