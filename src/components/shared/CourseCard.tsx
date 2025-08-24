import type { Course } from "@/types/course";
import { Link } from "react-router-dom";
<<<<<<< HEAD
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
=======
import { Star, ShoppingCart, Heart, MapPin, Globe, Video, Users } from "lucide-react";

function CourseCard({ course, href }: { course: Course; href?: string }) {
  // Get course type display info
  const getCourseTypeInfo = () => {
    switch (course.deliveryType) {
      case "recorded-online":
        return {
          icon: <Video className="w-4 h-4" />,
          label: "دورة مسجلة أون لاين",
          bgColor: "bg-blue-100 text-blue-700"
        };
      case "in-person":
        return {
          icon: <MapPin className="w-4 h-4" />,
          label: "دورة حضورية",
          bgColor: "bg-green-100 text-green-700"
        };
      case "live-online":
        return {
          icon: <Globe className="w-4 h-4" />,
          label: "دورة مباشرة أون لاين",
          bgColor: "bg-purple-100 text-purple-700"
        };
      case "private-session":
        return {
          icon: <Users className="w-4 h-4" />,
          label: "جلسة خصوصية أون لاين",
          bgColor: "bg-orange-100 text-orange-700"
        };
      case "digital-product":
        return {
          icon: <Video className="w-4 h-4" />,
          label: "منتج رقمي",
          bgColor: "bg-indigo-100 text-indigo-700"
        };
      case "product-bundle":
        return {
          icon: <Users className="w-4 h-4" />,
          label: "حزمة منتجات",
          bgColor: "bg-pink-100 text-pink-700"
        };
      default:
        return {
          icon: <Video className="w-4 h-4" />,
          label: "دورة أون لاين",
          bgColor: "bg-gray-100 text-gray-700"
        };
    }
  };

  const typeInfo = getCourseTypeInfo();
  const isClickable = course.deliveryType !== "private-session" || course.isAvailable;
  
  // Determine the correct route based on delivery type
  const getRouteUrl = () => {
    if (href) return href;
    
    switch (course.deliveryType) {
      case "live-online":
        return `/live-courses/${course.slug}`;
      case "in-person":
        return `/in-person-courses/${course.slug}`;
      default:
        return `/courses/${course.slug}`;
>>>>>>> sketch
    }
  };

  const CardContent = () => (
    <>
      {/* Course Image */}
      <div className="relative" style={{ aspectRatio: '10/6' }}>
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover rounded-t-xl"
        />
        {/* Course Type Badge */}
        <div className={`absolute top-3 left-3 ${typeInfo.bgColor} text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1`}>
          {typeInfo.icon}
          <span>{typeInfo.label}</span>
        </div>
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="fill-current w-3 h-3 text-yellow-400" />
          <span>{course.rating.toFixed(1)}</span>
        </div>

<<<<<<< HEAD
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
=======
        {/* Seat Information for in-person and live-online courses */}
        {(course.deliveryType === "in-person" || course.deliveryType === "live-online") && course.remainingSeats !== undefined && (
          <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            <span>{course.remainingSeats} مقعد متبقي</span>
>>>>>>> sketch
          </div>
        )}

        {/* Availability overlay for unavailable private sessions */}
        {course.deliveryType === "private-session" && !course.isAvailable && (
          <div className="absolute inset-0 bg-black/50 rounded-t-xl flex items-center justify-center">
            <span className="text-white font-semibold text-sm bg-red-500 px-3 py-1 rounded-full">
              لايوجد مواعيد حاليا  
            </span>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className="flex flex-col justify-between p-4 flex-1">
        {/* Title */}
        <h3 className="font-semibold text-card-foreground line-clamp-2 text-base leading-tight mb-4">
          {course.title}
        </h3>

<<<<<<< HEAD
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
=======
        {/* Action Area */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-colors ${
                isClickable 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isClickable}
            >
              <ShoppingCart className="w-4 h-4" />
              {isClickable ? "إضافة للسلة" : "غير متاح"}
            </button>
            <button className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <strong className="text-foreground text-base">
              {course.price === 0 ? "مجاناً" : `${course.price} ريال`}
            </strong>
            {course.insteadOf && (
              <strong className="text-sm text-[#33333394] line-through decoration-[#FF4747]">
                {course.insteadOf} ريال
>>>>>>> sketch
              </strong>
            )}
          </div>
        </div>
<<<<<<< HEAD
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
=======
      </div>
    </>
  );

  // If it's a private session and not available, render as div instead of Link
  if (course.deliveryType === "private-session" && !course.isAvailable) {
    return (
      <div className="flex flex-col h-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <CardContent />
      </div>
    );
  }

  return (
    <Link
      to={getRouteUrl()}
      className="flex flex-col h-[320px] bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent />
    </Link>
>>>>>>> sketch
  );
}

export default CourseCard;
