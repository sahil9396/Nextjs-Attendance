import Link from "next/link";

type SideBarButtonsProps = {
  passHref: boolean;
  href: string;
  currentSemNumber: string | null;
  currentPath: string;
  selected: string | null;
  children: React.ReactNode;
};

export const NavButtons = ({
  passHref,
  href,
  currentSemNumber,
  currentPath,
  selected,
  children,
}: SideBarButtonsProps) => {
  return (
    <Link
      prefetch={false}
      passHref={passHref}
      {...(!currentSemNumber
        ? { href: href }
        : {
            href: `${href}?${new URLSearchParams(
              selected
                ? { semester: currentSemNumber, selected }
                : { semester: currentSemNumber }
            ).toString()}`,
          })}
      className={`w-10/12 p-2 rounded-lg flex justify-center items-center ${
        currentPath === href && "bg-slate-700 dark:bg-gray-900 text-white"
      } hover:bg-slate-400 transition-colors duration-400`}
    >
      {children}
    </Link>
  );
};

export default NavButtons;
