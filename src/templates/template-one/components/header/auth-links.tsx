import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        to="/auth/signin"
        className={`${buttonVariants({
          variant: "secondary",
        })} !text-lg !font-medium border border-border hover:border-primary hover:text-primary transition-colors`}
      >
        دخول
      </Link>
      <Link
        to="/auth/signup"
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        حساب جديد
      </Link>
    </div>
  );
}
