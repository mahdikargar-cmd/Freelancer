import API from "./api";
import Link from "next/link";

interface FooterLink {
  id: number;
  name: string;
  url: string;
  categoryId?: number;
}

interface FooterCategory {
  id: number;
  title: string;
  links: FooterLink[];
}

interface FooterData {
  footerLinks: FooterCategory[];
}

const MainFooter = async () => {
  const res = await fetch(`${API}/api/footer` , { cache: "no-store" });
  const posts: FooterData = await res.json();

  return (
    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
      {posts.footerLinks.map((category) => (
        <div key={category.id}>
          <h1 className="text-md font-primaryDemibold text-color2 mb-4">
            {category.title}
          </h1>
          <ul>
            {category.links.map((link) => (
              <li key={link.id} className="mb-2">
                <Link
                  href={link.url}
                  className="text-color3 hover:text-color4 transition duration-300 font-primaryMedium"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MainFooter;
