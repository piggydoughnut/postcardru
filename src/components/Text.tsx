import { niconne } from "../../styles/fonts";

export const H1 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode | string;
}) => (
  <h1
    className={`${niconne.className} text-[38px] tracking-widest text-heavyBlue
  mt-24 ${className}
  `}
  >
    {children}
  </h1>
);

export const H2 = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode | string;
}) => (
  <h2
    className={`${niconne.className} text-[24px] tracking-widest text-heavyBlue ${className}`}
  >
    {children}
  </h2>
);
