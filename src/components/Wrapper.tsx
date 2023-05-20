export const Wrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`flex flex-col border border-1 border-heavyBlue mx-auto py-2 px-4 items-center bg-white bg-no-repeat bg-contain w-[600px] min-h-[600px] ${className}`}
    style={{ backgroundImage: "url(/decoration.svg)" }}
  >
    {children}
  </div>
);
