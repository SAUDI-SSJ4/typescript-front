import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function Searchbar() {
  const { lang, t } = useLanguage();
  return (
    <div className="flex-1 relative" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Search className={`absolute top-3 w-4 h-4 text-gray-400 ${lang === 'ar' ? 'left-3' : 'right-3'}`} />
      <Input
        placeholder={t('search.placeholder')}
        className={`${lang === 'ar' ? 'pl-10 pr-3 text-right' : 'pr-10 pl-3 text-left'} bg-gray-50 border-none`}
      />
    </div>
  );
}

export default Searchbar;
