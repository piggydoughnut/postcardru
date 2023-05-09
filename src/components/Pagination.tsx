const PER_PAGE = 6;

export default function Pagination({
  total,
  chosenPage,
}: {
  total: number;
  chosenPage: number;
}) {
  const pages = total / PER_PAGE;
  if (pages < 2) {
    return;
  }
  const pagination = [];
  for (let i = 0; i < pages; i++) {
    pagination.push(i + 1);
  }
  return (
    <div className="flex gap-1">
      {pagination.map((p) => (
        <div
          className={`rounded-full w-6 border border-1 ${
            chosenPage === p ? "border-[#4C648E]" : "border-[#B6C1D9]"
          }  flex justify-center items-center shadow-md blur-xs`}
          key={p}
        >
          {p === chosenPage ? (
            <p className="text-[#4C648E] blur-0">{p}</p>
          ) : (
            <p className="text-[#A7BBD2] blur-0">{p}</p>
          )}
        </div>
      ))}
    </div>
  );
}
