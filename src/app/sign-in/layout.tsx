import React from "react";

type Props = {
  children: React.ReactNode;
};

const SignInLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-svh lg:h-screen">
      {children}
    </div>
  );
};

export default SignInLayout;
