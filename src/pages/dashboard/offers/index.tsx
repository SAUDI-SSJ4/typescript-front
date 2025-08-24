import { useState, useMemo } from "react";
import { Plus, Search, Filter, Download, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import OfferStats from "@/features/offers/components/OfferStats";
import OfferTable from "@/features/offers/components/OfferTable";
import OfferFilters from "@/features/offers/components/OfferFilters";
import CreateOfferModal from "@/features/offers/components/CreateOfferModal";
import OfferStatsModal from "@/features/offers/components/OfferStatsModal";
import type { Offer, CreateOfferData } from "@/types/offer";

// Mock data for development
const mockOffers: Offer[] = [
  {
    id: 1,
    title: "عرض خاص على دورة React",
    description: "خصم 30% على دورة تطوير المواقع باستخدام React لفترة محدودة",
    product: {
      id: 1,
      name: "دورة React المتقدمة",
      type: "course",
      image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
      originalPrice: 599
    },
    originalPrice: 599,
    discountedPrice: 419,
    discountPercentage: 30,
    maxPurchases: 50,
    currentPurchases: 23,
    expiryDate: "2024-12-31T23:59:59Z",
    status: "active",
    createdAt: "2024-08-15T10:00:00Z",
    updatedAt: "2024-08-15T10:00:00Z",
    createdBy: "مدير التسويق"
  },
  {
    id: 2,
    title: "عرض الجمعة البيضاء - كتاب JavaScript",
    description: "عرض حصري على كتاب JavaScript المتقدم بخصم 50%",
    product: {
      id: 2,
      name: "كتاب JavaScript المتقدم",
      type: "digital-product",
      image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
      originalPrice: 149
    },
    originalPrice: 149,
    discountedPrice: 75,
    discountPercentage: 50,
    maxPurchases: 100,
    currentPurchases: 78,
    expiryDate: "2024-11-30T23:59:59Z",
    status: "active",
    createdAt: "2024-08-10T10:00:00Z",
    updatedAt: "2024-08-10T10:00:00Z",
    createdBy: "مدير المبيعات"
  },
  {
    id: 3,
    title: "عرض صيفي - ورشة التصميم",
    description: "خصم 25% على ورشة التصميم الجرافيكي",
    product: {
      id: 3,
      name: "ورشة التصميم الجرافيكي",
      type: "workshop",
      image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
      originalPrice: 299
    },
    originalPrice: 299,
    discountedPrice: 224,
    discountPercentage: 25,
    maxPurchases: 30,
    currentPurchases: 30,
    expiryDate: "2024-09-30T23:59:59Z",
    status: "expired",
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2024-09-30T23:59:59Z",
    createdBy: "مدير التسويق"
  }
];

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>(mockOffers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // Filter offers based on search query
  const filteredOffersData = useMemo(() => {
    return offers.filter(offer => 
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (offer.description && offer.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, offers]);

  const handleCreateOffer = (offerData: CreateOfferData) => {
    // Find the product details
    const product = mockProducts.find(p => p.id === offerData.productId);
    if (!product) return;

    const discountPercentage = Math.round(((product.originalPrice - offerData.discountedPrice) / product.originalPrice) * 100);

    const newOffer: Offer = {
      ...offerData,
      id: Date.now(),
      product,
      originalPrice: product.originalPrice,
      discountPercentage,
      currentPurchases: 0,
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user"
    };
    
    setOffers(prev => [newOffer, ...prev]);
  };

  const handleUpdateOffer = (id: number, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(offer => 
      offer.id === id 
        ? { ...offer, ...updates, updatedAt: new Date().toISOString() }
        : offer
    ));
  };

  const handleDeleteOffer = (id: number) => {
    setOffers(prev => prev.filter(offer => offer.id !== id));
  };

  const handleExportData = () => {
    console.log("Exporting offers data...");
  };

  const handleViewStats = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsStatsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Tag}
        title="العروض والخصومات"
        actions={
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleExportData}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              تصدير البيانات
            </Button>
            <CreateOfferModal 
              trigger={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  عرض جديد
                </Button>
              }
              onCreateOffer={handleCreateOffer}
            />
          </div>
        }
      />

      <OfferStats offers={filteredOffersData} />

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث في العروض..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            
            {/* Filter Button */}
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="gap-2"
            >
              <Filter className="w-4 h-4" />
              تصفية
            </Button>
          </div>
        </div>

        {/* Filters Panel */}
        {isFiltersOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <OfferFilters 
              offers={offers}
              filteredOffers={filteredOffers}
              onFilterChange={setFilteredOffers}
            />
          </div>
        )}
      </div>

      <OfferTable 
        offers={filteredOffersData}
        onUpdate={handleUpdateOffer}
        onDelete={handleDeleteOffer}
        onViewStats={handleViewStats}
      />

      {/* Offer Statistics Modal */}
      <OfferStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        offer={selectedOffer}
      />
    </div>
  );
}

// Mock products data - this would typically come from an API
const mockProducts = [
  {
    id: 1,
    name: "دورة React المتقدمة",
    type: "course" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 599
  },
  {
    id: 2,
    name: "كتاب JavaScript المتقدم",
    type: "digital-product" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 149
  },
  {
    id: 3,
    name: "ورشة التصميم الجرافيكي",
    type: "workshop" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 299
  },
  {
    id: 4,
    name: "جلسة التسويق الرقمي",
    type: "session" as const,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    originalPrice: 199
  }
];