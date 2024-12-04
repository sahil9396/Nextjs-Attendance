"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LoadingSpinner } from "./load-spinner";
import { useDataContext } from "@/providers/data-provider";

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
  const { state, dispatch } = useDataContext();
  const handleOnClick = async (e: React.MouseEvent<HTMLElement>) => {
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: true });
    setShowLoading(true);
    if (onClick) {
      await onClick(e);
    }
    setShowLoading(false);
    dispatch({ type: "SET_IS_BACKEND_PROCESSING", payload: false });
  };
  return (
    <Button
      onClick={(e) => handleOnClick(e)}
      disabled={state.isBackendProcessing || disabled}
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
