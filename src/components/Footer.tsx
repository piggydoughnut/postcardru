import categories from "@/helpers/categories.json";

const Footer = () => (
  <footer className="max-w-[600px] mx-auto mt-10">
    <div className="flex flex-row gap-6">
      <a className="text-md" href="">
        Postcards
      </a>
      <div className="flex flex-col gap-2 h-36 flex-wrap">
        {Object.keys(categories).map((cat) => (
          <a key={cat} href="">
            {" "}
            {cat}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
