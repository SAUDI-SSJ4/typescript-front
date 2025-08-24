import { Link } from "react-router-dom";

function Navbar() {
  const navLinks = [
    {
      id: crypto.randomUUID(),
      label: "سيان",
      links: [
        {
          id: crypto.randomUUID(),
          title: "الصفحة الرئيسية",
          href: "/",
        },
        {
          id: crypto.randomUUID(),
          title: "من نحن",
          href: "/about",
        },
        {
          id: crypto.randomUUID(),
          title: "التسعير",
          href: "/pricing",
        },
        {
          id: crypto.randomUUID(),
          title: "الخصومات",
          href: "/discounts",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      label: "سيان",
      links: [
        {
          id: crypto.randomUUID(),
          title: "الصفحة الرئيسية",
          href: "/",
        },
        {
          id: crypto.randomUUID(),
          title: "من نحن",
          href: "/about",
        },
        {
          id: crypto.randomUUID(),
          title: "التسعير",
          href: "/pricing",
        },
        {
          id: crypto.randomUUID(),
          title: "الخصومات",
          href: "/discounts",
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      label: "سيان",
      links: [
        {
          id: crypto.randomUUID(),
          title: "الصفحة الرئيسية",
          href: "/",
        },
        {
          id: crypto.randomUUID(),
          title: "من نحن",
          href: "/about",
        },
        {
          id: crypto.randomUUID(),
          title: "التسعير",
          href: "/pricing",
        },
        {
          id: crypto.randomUUID(),
          title: "الخصومات",
          href: "/discounts",
        },
      ],
    },
  ];
  return (
    <nav>
      <ul className="flex items-center flex-wrap gap-10 lg:gap-20">
        {navLinks.map((item) => (
          <li key={item.id} className="flex flex-col gap-6">
            <h3 className="text-white text-lg font-semibold">{item.label}</h3>
            <ul className="text-[#EAEFF4] flex flex-col gap-1">
              {item.links.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className="font-medium hover:text-white duration-200 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
