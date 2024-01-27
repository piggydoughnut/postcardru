export const Button = ({ title, link }: { title: string; link: string }) => (
  <div className="my-6 flex justify-center items-center text-[20px] sm:text-[16px]">
    <a href={link} className="border-2 border-mainBlue px-1">
      {title}
    </a>
  </div>
);
