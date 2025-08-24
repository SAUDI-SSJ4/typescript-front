import React, { useState, useEffect } from "react";
import { X, Calendar, Package, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Offer } from "@/types/offer";

interface FilterState {
  status: string;
  productType: string;
  priceRange: {
    min: string;
    max: string;
  };
  purchaseRange: {
    min: string;
    max: string;
  };
  expiryPeriod: string;
}

interface OfferFiltersProps {
  offers: Offer[];
  filteredOffers: Offer[];
  onFilterChange: (filteredOffers: Offer[]) => void;
}

const initialFilters: FilterState = {
  status: "all",
  productType: "all",
  priceRange: {
    min: "",
    max: ""
  },
  purchaseRange: {
    min: "",
    max: ""
  },
  expiryPeriod: "all"
};

export default function OfferFilters({ offers, onFilterChange }: OfferFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters, offers]);

  const applyFilters = () => {
    let filtered = [...offers];
    let activeCount = 0;

    // Status filter
    if (filters.status !== "all") {
      activeCount++;
      const now = new Date();
      
      filtered = filtered.filter(offer => {
        const expiryDate = new Date(offer.expiryDate);
        
        switch (filters.status) {
          case "active":
            return offer.status === "active" && expiryDate > now;
          case "expired":
            return offer.status === "expired" || expiryDate <= now;
          case "inactive":
            return offer.status === "inactive";
          default:
            return true;
        }
      });
    }

    // Product type filter
    if (filters.productType !== "all") {
      activeCount++;
      filtered = filtered.filter(offer => offer.product.type === filters.productType);
    }

    // Price range filter
    if (filters.priceRange.min || filters.priceRange.max) {
      activeCount++;
      const minPrice = parseFloat(filters.priceRange.min) || 0;
      const maxPrice = parseFloat(filters.priceRange.max) || Infinity;
      
      filtered = filtered.filter(offer => 
        offer.discountedPrice >= minPrice && offer.discountedPrice <= maxPrice
      );
    }

    // Purchase range filter
    if (filters.purchaseRange.min || filters.purchaseRange.max) {
      activeCount++;
      const minPurchases = parseInt(filters.purchaseRange.min) || 0;
      const maxPurchases = parseInt(filters.purchaseRange.max) || Infinity;
      
      filtered = filtered.filter(offer => 
        offer.currentPurchases >= minPurchases && offer.currentPurchases <= maxPurchases
      );
    }

    // Expiry period filter
    if (filters.expiryPeriod !== "all") {
      activeCount++;
      const now = new Date();
      
      filtered = filtered.filter(offer => {
        const expiryDate = new Date(offer.expiryDate);
        const diffTime = expiryDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (filters.expiryPeriod) {
          case "week":
            return diffDays <= 7 && diffDays > 0;
          case "month":
            return diffDays <= 30 && diffDays > 0;
          case "expired":
            return diffDays <= 0;
          default:
            return true;
        }
      });
    }

    setActiveFiltersCount(activeCount);
    onFilterChange(filtered);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updatePriceRange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const updatePurchaseRange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      purchaseRange: {
        ...prev.purchaseRange,
        [type]: value
      }
    }));
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  const clearFilter = (filterKey: string) => {
    switch (filterKey) {
      case "status":
        updateFilter("status", "all");
        break;
      case "productType":
        updateFilter("productType", "all");
        break;
      case "priceRange":
        updateFilter("priceRange", { min: "", max: "" });
        break;
      case "purchaseRange":
        updateFilter("purchaseRange", { min: "", max: "" });
        break;
      case "expiryPeriod":
        updateFilter("expiryPeriod", "all");
        break;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900">التصفية</h4>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {activeFiltersCount} فلتر نشط
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 ml-1" />
            مسح الكل
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">حالة العرض</Label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => updateFilter("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="expired">منتهي</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Type Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">نوع المنتج</Label>
          <Select 
            value={filters.productType} 
            onValueChange={(value) => updateFilter("productType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر النوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="course">دورة</SelectItem>
              <SelectItem value="session">جلسة</SelectItem>
              <SelectItem value="digital-product">منتج رقمي</SelectItem>
              <SelectItem value="workshop">ورشة عمل</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            نطاق السعر (ر.س)
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="من"
              value={filters.priceRange.min}
              onChange={(e) => updatePriceRange("min", e.target.value)}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="إلى"
              value={filters.priceRange.max}
              onChange={(e) => updatePriceRange("max", e.target.value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Purchase Range Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Users className="w-4 h-4" />
            عدد المشتريات
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="من"
              value={filters.purchaseRange.min}
              onChange={(e) => updatePurchaseRange("min", e.target.value)}
              className="text-sm"
            />
            <Input
              type="number"
              placeholder="إلى"
              value={filters.purchaseRange.max}
              onChange={(e) => updatePurchaseRange("max", e.target.value)}
              className="text-sm"
            />
          </div>
        </div>

        {/* Expiry Period Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            فترة الانتهاء
          </Label>
          <Select 
            value={filters.expiryPeriod} 
            onValueChange={(value) => updateFilter("expiryPeriod", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفترات</SelectItem>
              <SelectItem value="week">ينتهي خلال أسبوع</SelectItem>
              <SelectItem value="month">ينتهي خلال شهر</SelectItem>
              <SelectItem value="expired">منتهي الصلاحية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
          
          {filters.status !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              الحالة: {filters.status === "active" ? "نشط" : filters.status === "expired" ? "منتهي" : "غير نشط"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("status")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.productType !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              النوع: {filters.productType === "course" ? "دورة" : 
                     filters.productType === "session" ? "جلسة" :
                     filters.productType === "digital-product" ? "منتج رقمي" : "ورشة عمل"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("productType")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {(filters.priceRange.min || filters.priceRange.max) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              السعر: {filters.priceRange.min || "0"} - {filters.priceRange.max || "∞"} ر.س
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("priceRange")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {(filters.purchaseRange.min || filters.purchaseRange.max) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              المشتريات: {filters.purchaseRange.min || "0"} - {filters.purchaseRange.max || "∞"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("purchaseRange")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          
          {filters.expiryPeriod !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              الانتهاء: {filters.expiryPeriod === "week" ? "خلال أسبوع" : 
                        filters.expiryPeriod === "month" ? "خلال شهر" : "منتهي الصلاحية"}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => clearFilter("expiryPeriod")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}