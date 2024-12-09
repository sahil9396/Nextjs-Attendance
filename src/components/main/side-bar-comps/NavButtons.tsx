import Link from "next/link";

type SideBarButtonsProps = {
  passHref: boolean;
  href: string;
  currentSemNumber: string | null;
  currentPath: string;
  selected: string | null;
  today: string | null;
  children: React.ReactNode;
};

export const NavButtons = ({
  passHref,
  href,
  currentSemNumber,
  currentPath,
  selected,
  today,
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
              selected && today
                ? { semester: currentSemNumber, selected, today }
                : { semester: currentSemNumber }
            ).toString()}`,
          })}
      className={`w-full p-2 rounded-lg flex justify-center items-center text-black dark:text-white ${
        currentPath === href && "bg-slate-700 dark:bg-gray-900 text-white"
      } lg:hover:bg-white lg:hover:text-black transition-colors duration-400`}
    >
      {children}
    </Link>
  );
};

export default NavButtons;
