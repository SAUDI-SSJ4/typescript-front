import { ShoppingCartIcon, Trash2, X, Loader2 } from "lucide-react";
import { useShoppingCart } from "@/store/shopping-cart";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Directions } from "@/constants/enums";

import { useEffect, useCallback } from "react";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import RemoteImage from "@/components/shared/RemoteImage";

function ShoppingCart() {
  const navigate = useNavigate();
  const { 
    items, 
    loading,
    total,
    count,
    currency,
    removeItem, 
    clearCart, 
    isOpen, 
    setIsOpen,
    fetchCart
  } = useShoppingCart();
  
  // Memoize the remove handler to prevent unnecessary re-renders
  const handleRemoveItem = useCallback(async (cartId: string) => {
    if (!cartId) {
      console.error("Cart ID is missing or invalid:", cartId);
      return;
    }
    // console.log("Removing item with cart_id:", cartId);
    await removeItem(cartId);
  }, [removeItem]);

  // Memoize the clear cart handler
  const handleClearCart = useCallback(async () => {
    await clearCart();
  }, [clearCart]);

  // Fetch cart data on component mount and when count changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Additional effect to refresh when cart count changes
  useEffect(() => {
    // console.log("🛒 HEADER CART - Count:", count, "Total:", total, "Currency:", currency);
    // console.log("🛒 HEADER CART - Items:", items);
    // if (items.length > 0) {
    //   console.log("🛒 HEADER CART - First item details:", items[0]?.item_details);
    // }
  }, [count, items, total, currency]);

  return (
    <ErrorBoundary fallback={
      <Button variant="ghost" size="icon" className="relative text-primary">
        <ShoppingCartIcon className="h-5 w-5" />
      </Button>
    }>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-primary">
            <ShoppingCartIcon className="h-5 w-5" />
            {count > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {count}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-96 max-h-[600px] overflow-y-auto border-none rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
        <div className="p-4">
          <div
            className="flex items-center justify-between mb-4"
            dir={Directions.RTL}
          >
            <h3 className="font-semibold text-lg">عربة التسوق</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8" dir={Directions.RTL}>
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-muted-foreground mb-3" />
              <p className="text-muted-foreground">جاري تحميل السلة...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-8" dir={Directions.RTL}>
              <ShoppingCartIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">عربة التسوق فارغة</p>
              <Button
                variant="link"
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
              >
                أضف بعض الدورات للبدء!
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-4">
                {items.map((item, index) => {
                  // Create a stable key combining cart_id and index
                  const stableKey = item.cart_id ? `cart-${item.cart_id}` : `item-${index}`;
                  
                  return (
                    <div
                      key={stableKey}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                      dir={Directions.RTL}
                    >
                      <RemoteImage
                        src={item.item_details?.image_url || "courses/default-course.jpg"}
                        alt={item.item_details?.title || "منتج"}
                        className="w-24 h-14 object-cover bg-gray-50 rounded-md flex-shrink-0 aspect-[10/6]"
                        onError={() => {
                          // console.log("🖼️ RemoteImage failed for:", item.item_details?.image_url);
                        }}
                      />
                      <div className="flex-1 min-w-0 text-right">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.item_details?.title || "منتج"}
                        </h4>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-base text-blue-600 font-bold">
                            {(item.item_details?.price ?? 0)} {currency}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-destructive hover:text-destructive"
                            onClick={() => handleRemoveItem(item.cart_id)}
                            disabled={loading || !item.cart_id}
                          >
                            {loading ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Trash2 className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3" dir={Directions.RTL}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">إجمالي العناصر:</span>
                  <span>{count}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>إجمالي:</span>
                  <span>{total} {currency}</span>
                </div>
                

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/dashboard/shopping-cart");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={items.length === 0 || loading}
                  >
                    الدفع الان
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleClearCart}
                    className="w-full text-gray-600 hover:bg-gray-100"
                    disabled={items.length === 0 || loading}
                  >
                    مسح سلة التسوق
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
    </ErrorBoundary>
  );
}

export default ShoppingCart;
