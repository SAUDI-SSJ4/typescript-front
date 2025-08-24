import Navbar, { links } from "./navbar";
import AuthLinks from "./auth-links";
import MobileMenu from "./mobile-menu";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import ShoppingCart from "./shopping-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
=======
>>>>>>> sketch

export default function Header() {
  return (
    <header className="py-8 fixed left-0 w-full top-0 z-50">
      <div className="container">
        <div
          style={{
            background:
              "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
          }}
          className="p-4 backdrop-blur rounded-[20px] flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center flex-1 justify-between lg:justify-start gap-4 lg:gap-10">
            <Link to="/">
              <img
                src="/assets/images/logo.svg"
                alt="Logo"
                loading="eager"
                className="w-[100px] h-[45px] object-contain"
              />
            </Link>
            <MobileMenu links={links} />
            <Navbar />
          </div>
<<<<<<< HEAD
          <div className="flex items-center gap-4 lg:gap-6">
            <ShoppingCart />
            {isLoading ? (
              <Skeleton className="h-10 w-10 rounded-full" />
            ) : user ? (
              <Link to="/dashboard">
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    {(user as any)?.avatar && (
                      <AvatarImage src={(user as any).avatar} alt={user.fname} />
                    )}
                    <AvatarFallback className="bg-primary text-white">
                      {user?.fname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </Link>
            ) : (
              <AuthLinks />
            )}
          </div>
=======
          <AuthLinks />
>>>>>>> sketch
        </div>
      </div>
    </header>
  );
}
