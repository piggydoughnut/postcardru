export const Arrow = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="12" cy="12" r="11.25" stroke="#B6C1D9" strokeWidth="1.5" />
    <path d="M7 7L12.2 12L7 17" stroke="#9B9EBE" />
    <path d="M7.4 7.41663L13 12L7 17" stroke="#9B9EBE" />
    <path d="M12 7L17.2 12L12 17" stroke="#9B9EBE" />
    <path d="M12.4 7.41663L18 12L12 17" stroke="#9B9EBE" />
  </svg>
);
