import { Link, useLocation } from "react-router-dom";

export const links = [
  {
    id: crypto.randomUUID(),
    title: "الرئيسية",
    href: "/",
  },
  {
    id: crypto.randomUUID(),
    title: "اطلق منصتك التعليمية",
    href: "/launch-academy",
  },
  {
    id: crypto.randomUUID(),
    title: "المدونة",
    href: "/blogs",
  },
  {
    id: crypto.randomUUID(),
    title: "الذكاء الاصطناعي",
    href: "/ai",
  },
  {
    id: crypto.randomUUID(),
    title: "تدريب وتطوير الموظفين",
    href: "/employee-training",
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={link.href}
              className={`${
                location.pathname === link.href
                  ? "text-primary"
                  : "accent-foreground"
              } hover:text-primary duration-200 transition-colors`}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
