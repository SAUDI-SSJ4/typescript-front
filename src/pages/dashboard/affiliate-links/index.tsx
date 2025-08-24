import { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { 
  AffiliateLinkStats, 
  AffiliateLinkTable, 
  AffiliateLinkFilters, 
  CreateAffiliateLinkModal 
} from "@/features/affiliate-links/components";
import type { AffiliateLink, CreateAffiliateLinkData } from "@/types/affiliate-link";

// Mock data for development
const mockAffiliateLinks: AffiliateLink[] = [
  {
    id: 1,
    name: "رابط دورة React الأساسية",
    code: "REACT_BASIC_001",
    url: "https://platform.com/ref/REACT_BASIC_001",
    status: "active",
    commissionType: "percentage",
    commissionValue: 15,
    clickCount: 245,
    conversionCount: 18,
    totalCommission: 2850,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    createdBy: "admin",
    startDate: "2024-01-15T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    commissionRate: 15,
    promotionType: "specific",
    applicableProducts: [
      {
        id: 1,
        name: "دورة React الأساسية",
        type: "course",
        price: 299
      }
    ]
  },
  {
    id: 2,
    name: "رابط كتاب JavaScript المتقدم",
    code: "JS_BOOK_002",
    url: "https://platform.com/ref/JS_BOOK_002",
    status: "active",
    commissionType: "fixed",
    commissionValue: 25,
    clickCount: 156,
    conversionCount: 12,
    totalCommission: 300,
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
    createdBy: "admin",
    startDate: "2024-02-01T00:00:00Z",
    endDate: null,
    commissionRate: 25,
    promotionType: "specific",
    applicableProducts: [
      {
        id: 2,
        name: "كتاب JavaScript المتقدم",
        type: "digital-product",
        price: 149
      }
    ]
  },
  {
    id: 3,
    name: "رابط حزمة التطوير الشاملة", 
    code: "DEV_BUNDLE_003",
    url: "https://platform.com/ref/DEV_BUNDLE_003",
    status: "inactive",
    commissionType: "percentage",
    commissionValue: 20,
    clickCount: 89,
    conversionCount: 5,
    totalCommission: 450,
    createdAt: "2024-02-15T10:00:00Z",
    updatedAt: "2024-02-15T10:00:00Z",
    createdBy: "admin",
    startDate: "2024-02-15T00:00:00Z",
    endDate: "2024-06-30T23:59:59Z",
    commissionRate: 20,
    promotionType: "specific",
    applicableProducts: [
      {
        id: 3,
        name: "حزمة التطوير الشاملة",
        type: "course",
        price: 599
      },
      {
        id: 4,
        name: "كتاب أساسيات البرمجة",
        type: "digital-product",
        price: 99
      }
    ]
  }
];

export default function AffiliateLinksPage() {
  const [affiliateLinks, setAffiliateLinks] = useState<AffiliateLink[]>(mockAffiliateLinks);
  const [filteredLinks, setFilteredLinks] = useState<AffiliateLink[]>(mockAffiliateLinks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter links based on search query
  useEffect(() => {
    const filtered = affiliateLinks.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLinks(filtered);
  }, [searchQuery, affiliateLinks]);

  const handleCreateLink = (linkData: CreateAffiliateLinkData) => {
    const newLink: AffiliateLink = {
      ...linkData,
      id: Date.now(),
      url: `https://platform.com/ref/${linkData.code}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "current_user",
      clickCount: 0,
      conversionCount: 0,
      totalCommission: 0,
      status: "active"
    };
    
    setAffiliateLinks(prev => [newLink, ...prev]);
    // Modal will close itself as it manages its own state
  };

  const handleExportData = () => {
    // TODO: Implement export functionality
    console.log("Exporting affiliate links data...");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <DashboardPageHeader
        icon={Link2}
        title="إدارة الروابط التابعة"
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportData}
              className="font-noto"
            >
              <Download className="w-4 h-4 mr-2" />
              تصدير البيانات
            </Button>
            <CreateAffiliateLinkModal
              trigger={
                <Button className="bg-blue-600 hover:bg-blue-700 font-noto">
                  <Plus className="w-4 h-4 mr-2" />
                  إنشاء رابط جديد
                </Button>
              }
              onCreateLink={handleCreateLink}
            />
          </div>
        }
      />

      {/* Statistics */}
      <AffiliateLinkStats links={affiliateLinks} />

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border-0 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الروابط..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-noto"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="font-noto"
            >
              <Filter className="w-4 h-4 mr-2" />
              الفلاتر
            </Button>
          </div>
        </div>

        {/* Filters Component */}
        {isFiltersOpen && (
          <div className="mt-4 pt-4 border-t">
            <AffiliateLinkFilters
              selectedStatus="all"
              onStatusChange={() => {}}
              selectedCommissionType="all" 
              onCommissionTypeChange={() => {}}
              selectedPromotionType="all"
              onPromotionTypeChange={() => {}}
              searchTerm=""
              onSearchChange={() => {}}
              onClearFilters={() => {}}
            />
          </div>
        )}
      </div>

      {/* Affiliate Links Table */}
      <div className="bg-white rounded-lg border-0 shadow-sm">
        <AffiliateLinkTable
          links={filteredLinks}
          onTableReady={(table) => {
            // Table is ready for any additional operations
            console.log("Table initialized:", table);
          }}
        />
      </div>


    </div>
  );
}