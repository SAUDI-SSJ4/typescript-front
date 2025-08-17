import { useShoppingCart } from "@/store/shopping-cart";
import type { Course } from "@/types/couse";

export const useCart = () => {
  const {
    items,
    loading,
    total,
    count,
    currency,
    addItem,
    removeItem,
    clearCart,
    fetchCart,
    getItemById,
    getTotalPrice,
    getItemsCount,
    toggleCart,
    setIsOpen,
  } = useShoppingCart();

  // Helper function to check if a course is in the cart
  const isInCart = (courseId: string): boolean => {
    return items.some((item) => item.item_id === courseId);
  };

  // Helper function to get cart item for a specific course
  const getCartItem = (courseId: string) => {
    return items.find((item) => item.item_id === courseId);
  };

  // Helper function to add course to cart
  const addToCart = async (course: Course) => {
    await addItem("course", course.id);
  };

  // Helper function to remove course from cart
  const removeFromCart = async (courseId: string) => {
    const cartItem = getCartItem(courseId);
    if (cartItem) {
      await removeItem(cartItem.cart_id);
    }
  };

  // Toggle item in cart (add if not present, remove if present)
  const toggleInCart = async (course: Course) => {
    if (isInCart(course.id)) {
      await removeFromCart(course.id);
    } else {
      await addToCart(course);
    }
  };

  return {
    // State
    items,
    loading,
    total,
    count,
    currency,
    totalItems: getItemsCount(),
    totalPrice: getTotalPrice(),

    // Actions
    addToCart,
    removeFromCart,
    clearCart,
    toggleInCart,
    toggleCart,
    setIsOpen,
    fetchCart,

    // Helpers
    isInCart,
    getCartItem,
    getItemById,
  };
};
