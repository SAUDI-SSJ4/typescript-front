import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import LoginDialog from "@/components/ui/login-dialog";

interface MobileMenuProps {
  links: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const location = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-background">
        <div className="flex h-full w-full flex-col p-4">
          <SheetHeader className="flex flex-row justify-between items-center">
            <SheetClose className="p-2 hover:bg-accent rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </SheetClose>
            <img
              src="/assets/images/logo.svg"
              alt="Logo"
              loading="eager"
              className="w-[100px] h-[45px]"
            />
          </SheetHeader>
          <nav className="mt-8 flex-1">
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    to={link.href}
                    className={`block py-2 px-4 rounded-lg transition-colors text-right ${
                      location.pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent text-foreground"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="py-6 flex flex-col items-stretch gap-4 border-t border-border">
            <LoginDialog
              triggerText="دخول"
              triggerVariant="outline"
              className="w-full justify-center"
            />
            <Link
              to="/auth/signup"
              className={buttonVariants({
                className: "w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
              })}
            >
              انضم الان
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
