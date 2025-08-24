import { Outlet, Link } from "react-router-dom";

function AuthLayout() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-bl-[200px]"
          style={{
            backgroundImage: "url('/assets/images/auth/auth.png')",
          }}
        />
        <div className="absolute inset-0 rounded-bl-[200px] bg-black/30">
          <div className="absolute left-20 top-10 z-10">
            <img
              src="/assets/images/footer-logo.svg"
              alt="Sayan Logo"
              loading="eager"
              className="w-32 h-[75px]"
            />
          </div>
          <div className="absolute right-10 bottom-10 z-10">
            <Navbar />
          </div>
        </div>
      </div>
      {/* Left Side - Content Area */}
      <div className="flex-1 flex flex-col py-10">
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;

function Navbar() {
  const links = [
    { id: crypto.randomUUID(), title: "من نحن", href: "/about" },
    { id: crypto.randomUUID(), title: "تواصل معنا", href: "/contact" },
    { id: crypto.randomUUID(), title: "سياسة الخصوصية", href: "/privacy" },
    { id: crypto.randomUUID(), title: "الشروط والأحكام", href: "/terms" },
  ];
  return (
    <nav className="flex items-center justify-center space-x-6">
      {links.map((link) => (
        <Link
          key={link.id}
          to={link.href}
          className="text-white opacity-80 hover:opacity-100 hover:underline transition-opacity duration-200"
        >
          {link.title}
        </Link>
      ))}
    </nav>
  );
}
