export const Background = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-mainMobileBg bg-repeat-y sm:bg-mainBg sm:bg-no-repeat sm:min-h-[570px] bg-top-4 pb-8">
    {children}
  </div>
);
