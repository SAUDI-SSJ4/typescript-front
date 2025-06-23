import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Download, X, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Directions } from "@/constants/enums";

interface WithdrawalModalProps {
  trigger?: React.ReactNode;
  availableBalance?: number;
}

function WithdrawalModal({
  trigger,
  availableBalance = 81000019.8,
}: WithdrawalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    accountHolderName: "",
    bankName: "",
    iban: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "يرجى إدخال مبلغ صحيح";
    } else if (parseFloat(formData.amount) > availableBalance) {
      newErrors.amount = "المبلغ المطلوب أكبر من الرصيد المتاح";
    }

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "يرجى إدخال اسم صاحب الحساب";
    }

    if (!formData.bankName.trim()) {
      newErrors.bankName = "يرجى إدخال اسم البنك";
    }

    if (!formData.iban.trim()) {
      newErrors.iban = "يرجى إدخال رقم الآيبان";
    } else if (!/^SA[0-9]{22}$/.test(formData.iban.replace(/\s/g, ""))) {
      newErrors.iban = "رقم الآيبان غير صحيح";
    }

    if (!formData.email.trim()) {
      newErrors.email = "يرجى إدخال البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "يرجى إدخال رقم الجوال";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "رقم الجوال غير صحيح";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success - close modal and show success message
      setIsOpen(false);
      setFormData({
        amount: "",
        accountHolderName: "",
        bankName: "",
        iban: "",
        email: "",
        phoneNumber: "",
      });

      // You can add a toast notification here
      console.log("Withdrawal request submitted successfully");
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            سحب الأرباح
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        dir={Directions.RTL}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="text-right">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Download className="w-6 h-6 text-blue-600" />
            طلب تحويل الأرباح
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            املأ البيانات التالية لطلب تحويل الأرباح إلى حسابك البنكي
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-4" />

        {/* Available Balance Display */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center mb-6">
          <div className="text-blue-600 text-sm font-medium mb-1">
            الرصيد المتاح للسحب
          </div>
          <div className="text-3xl font-bold text-blue-700">
            {formatCurrency(availableBalance)} ﷼
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Section */}
          <div className="space-y-4">
            <Label
              htmlFor="amount"
              className="text-lg font-semibold text-gray-900"
            >
              مبلغ السحب المطلوب
            </Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                className={cn(
                  "text-right pl-12 text-lg",
                  errors.amount && "border-red-500 focus:border-red-500"
                )}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ﷼
              </div>
            </div>
            {errors.amount && (
              <div className="flex items-center gap-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.amount}
              </div>
            )}
          </div>

          <Separator />

          {/* Bank Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              معلومات الحساب البنكي
            </h3>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="accountHolderName">
                  اسم صاحب الحساب (كما هو مسجل في البنك)
                </Label>
                <Input
                  id="accountHolderName"
                  type="text"
                  placeholder="الاسم كاملاً"
                  value={formData.accountHolderName}
                  onChange={(e) =>
                    handleInputChange("accountHolderName", e.target.value)
                  }
                  className={cn(
                    "text-right",
                    errors.accountHolderName &&
                      "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.accountHolderName && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.accountHolderName}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="bankName">اسم البنك</Label>
                <Input
                  id="bankName"
                  type="text"
                  placeholder="البنك الأهلي السعودي"
                  value={formData.bankName}
                  onChange={(e) =>
                    handleInputChange("bankName", e.target.value)
                  }
                  className={cn(
                    "text-right",
                    errors.bankName && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.bankName && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.bankName}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="iban">رقم الآيبان (IBAN)</Label>
                <Input
                  id="iban"
                  type="text"
                  placeholder="SAXXXXXXXXXXXXXXXXXXXX"
                  value={formData.iban}
                  onChange={(e) => handleInputChange("iban", e.target.value)}
                  className={cn(
                    "text-right font-mono",
                    errors.iban && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.iban && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.iban}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              معلومات الاتصال
            </h3>
            <div className="text-sm text-gray-600">
              سيتم استخدام معلومات الاتصال التالية لإشعارك بحالة الطلب:
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="email">البريد الإلكتروني للتواصل</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={cn(
                    "text-right",
                    errors.email && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">رقم الجوال للتواصل</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="05xxxxxxxx"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  className={cn(
                    "text-right",
                    errors.phoneNumber && "border-red-500 focus:border-red-500"
                  )}
                />
                {errors.phoneNumber && (
                  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phoneNumber}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الإرسال...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  إرسال الطلب
                </div>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              <X className="w-4 h-4 ml-1" />
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawalModal;
