import type { Course } from "@/types/couse";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Check, ShoppingCart, Star, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RemoteImage from "./RemoteImage";
import { useState } from "react";

function CourseCard({ course, href }: { course: Course; href?: string }) {
  const { addToCart, isInCart, loading } = useCart();
  const courseInCart = isInCart(course.id);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation();
    
    // Check if already in cart or loading to prevent duplicate requests
    if (courseInCart || loading) {
      return;
    }
    
    try {
      await addToCart(course);
      setAddedToCart(true);
      
      // Reset the added state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  return (
    <div>
      <Link
        to={href ?? `/courses/${course.slug}`}
        className="flex flex-col h-full"
      >
        {/* Course Image */}
        <div className="aspect-video relative">
          <RemoteImage
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-[180px] object-contain bg-gray-50 rounded-[20px]"
          />
        </div>

        {/* Course Content */}
        <div className="flex flex-col gap-4 flex-1 pt-4">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-card-foreground line-clamp-2 truncate">
                {course.title}
              </h3>
              <Badge
                variant="secondary"
                className=" font-semibold px-4 h-7 rounded-[20px]"
              >
                مجاني
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                تقييمات المادة العلمية
              </span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="fill-current w-4 h-4" />
                <span className="text-sm font-medium">
                  {course.ratings_count
                    ? course.ratings_count.toFixed(1)
                    : "0.0"}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-6 truncate">
              {course.content}
            </p>
          </div>

          <div className="flex justify-between items-center h-16">
            <Avatar className="w-8 h-8">
              {course.trainer?.avatar && (
                <AvatarImage
                  src={course.trainer.avatar}
                  alt={course.trainer.fname}
                />
              )}
              <AvatarFallback className="bg-primary text-white">
                {course.trainer?.fname?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-center">
              <strong className="text-foreground text-lg">
                {!course.price || course.price === 0
                  ? "مجاناً"
                  : `${course.price} ريال`}
              </strong>
              {course.discount_price && (
                <strong className="text-sm text-[#33333394] line-through decoration-[#FF4747]">
                  {course.discount_price} ريال
                </strong>
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      {!course.price || course.price === 0 ? (
        <Button variant="secondary" className="w-full">
          مشاهدة الدورة
        </Button>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={courseInCart || loading}
          className={`w-full transition-all duration-300 ${
            addedToCart
              ? "bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
              : courseInCart
              ? "bg-green-500 hover:bg-green-600"
              : "bg-primary hover:bg-primary/90"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              جاري الإضافة...
            </>
          ) : addedToCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              تمت الإضافة للسلة
            </>
          ) : courseInCart ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              في العربة
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              اضف إلى العربة
            </>
          )}
        </Button>
      )}
    </div>
  );
}

export default CourseCard;
