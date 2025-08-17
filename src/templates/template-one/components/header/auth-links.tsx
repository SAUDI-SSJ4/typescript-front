import { buttonVariants } from "@/components/ui/button";
import { hasSubdomain } from "@/lib/subdomain";
import { Link, useParams } from "react-router-dom";

interface AuthLinksProps {
  className?: string;
}

export default function AuthLinks({ className = "" }: AuthLinksProps) {
  const { academySlug } = useParams<{ academySlug?: string }>();
  const academyPath = hasSubdomain() ? "" : `/academy/${academySlug}`;
  return (
    <div className={`hidden lg:flex items-center gap-6 ${className}`}>
      <Link
        to={`${academyPath}/auth/signin`}
        className={`${buttonVariants({
          variant: "secondary",
        })} !text-lg !font-medium border border-border hover:border-primary hover:text-primary transition-colors`}
      >
        دخول
      </Link>
      <Link
        to={`${academyPath}/auth/signup`}
        className={`${buttonVariants({ size: "lg" })} !font-bold`}
      >
        حساب جديد
      </Link>
    </div>
  );
}
