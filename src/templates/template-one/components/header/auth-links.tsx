import { buttonVariants } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  const { academySlug } = useParams();
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        to={`/academy/${academySlug}/auth/signin`}
        className={`${buttonVariants({
          variant: "secondary",
        })} !text-lg !font-medium border border-border hover:border-primary hover:text-primary transition-colors`}
      >
        دخول
      </Link>
      <Link
        to={`/academy/${academySlug}/auth/signup`}
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        حساب جديد
      </Link>
    </div>
  );
}
