export const Select = ({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
  children: React.ReactNode | string;
}) => (
  <select
    className={`bg-white border border-1 border-heavyBlue h-fit text-sm text-heavyBlue pl-1 ${className}`}
    {...props}
  >
    {children}
  </select>
);
