import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartAPI, type CartItem as APICartItem } from "@/services/cart-api";
import { toast } from "sonner";

export interface CartItem extends APICartItem {
  quantity?: number; // For local compatibility
}

interface ShoppingCartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
  total: number;
  count: number;
  currency: string;
  
  // Actions
  addItem: (itemType: string, itemId: string) => Promise<void>;
  removeItem: (cartId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
  
  // Helper
  getItemById: (itemId: string) => CartItem | undefined;
  getTotalPrice: () => number;
  getItemsCount: () => number;
}

export const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      loading: false,
      total: 0,
      count: 0,
      currency: "SAR",

      addItem: async (itemType: string, itemId: string) => {
        set({ loading: true });
        try {
          const cartSummary = await CartAPI.addToCart(itemType, itemId);
                // Update state directly without checking loading state
      set({
        items: cartSummary.items || [],
        total: cartSummary.total || 0,
        count: cartSummary.count || 0,
        currency: cartSummary.currency || "SAR",
        loading: false,
      });
          toast.success("تم إضافة المنتج إلى السلة بنجاح");
        } catch (error) {
          console.error("Error adding item to cart:", error);
          toast.error(error instanceof Error ? error.message : "فشل في إضافة المنتج إلى السلة");
          set({ loading: false });
        }
      },

      removeItem: async (cartId: string) => {
        set({ loading: true });
        try {
          const cartSummary = await CartAPI.removeFromCart(cartId);
          
          // Update state directly without checking loading state
          set({
            items: cartSummary.items || [],
            total: cartSummary.total || 0,
            count: cartSummary.count || 0,
            currency: cartSummary.currency || "SAR",
            loading: false,
          });
          toast.success("تم حذف المنتج من السلة بنجاح");
        } catch (error) {
          console.error("Error removing item from cart:", error);
          toast.error(error instanceof Error ? error.message : "فشل في حذف المنتج من السلة");
          set({ loading: false });
        }
      },

      clearCart: async () => {
        set({ loading: true });
        try {
          const cartSummary = await CartAPI.clearCart();
          
          // Update state directly without checking loading state
          set({
            items: cartSummary.items || [],
            total: cartSummary.total || 0,
            count: cartSummary.count || 0,
            currency: cartSummary.currency || "SAR",
            loading: false,
          });
          toast.success("تم مسح السلة بنجاح");
        } catch (error) {
          console.error("Error clearing cart:", error);
          toast.error(error instanceof Error ? error.message : "فشل في مسح السلة");
          set({ loading: false });
        }
      },

      fetchCart: async () => {
        set({ loading: true });
              try {
        const cartSummary = await CartAPI.getCart();
        
        // Update state directly without checking loading state
        set({
          items: cartSummary.items || [],
          total: cartSummary.total || 0,
          count: cartSummary.count || 0,
          currency: cartSummary.currency || "SAR",
          loading: false,
        });
        } catch (error) {
          console.error("Error fetching cart:", error);
          set({ loading: false });
        }
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },

      getItemById: (itemId: string) => {
        return get().items.find((item) => item.item_id === itemId);
      },

      getTotalPrice: () => {
        return get().total;
      },

      getItemsCount: () => {
        return get().count;
      },
    }),
    {
      name: "shopping-cart",
      partialize: (state) => ({ 
        items: state.items,
        total: state.total,
        count: state.count,
        currency: state.currency
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            // console.log("Shopping cart: Rehydration error:", error);
          } else if (state) {
            // Fetch fresh cart data when rehydrating
            state.fetchCart();
          }
        };
      },
    }
  )
);
