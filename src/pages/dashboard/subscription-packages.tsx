import { useState } from 'react';
import { CreditCard, RefreshCw, X, Settings, Crown, Star, Zap, Play, Pause, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import DashboardPageHeader from '@/components/shared/dashboard/DashboardPageHeader';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'mada';
  lastFour: string;
  expiryDate: string;
  cardholderName: string;
  isDefault: boolean;
}



interface SubscriptionPackage {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: React.ReactNode;
}

interface CurrentSubscription {
  packageId: string;
  packageName: string;
  isYearly: boolean;
  startDate: Date;
  endDate: Date;
  remainingDays: number;
  autoRenew: boolean;
  studentsUsed: number;
  coursesUsed: number;
}



const packages: SubscriptionPackage[] = [
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: <Star className="w-5 h-5" />
  },
  {
    id: 'professional',
    name: 'الباقة الاحترافية',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    icon: <Crown className="w-5 h-5" />
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    monthlyPrice: 399,
    yearlyPrice: 3990,
    icon: <Zap className="w-5 h-5" />
  }
];

const samplePaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'visa',
    lastFour: '4532',
    expiryDate: '12/26',
    cardholderName: 'أحمد محمد',
    isDefault: true
  },
  {
    id: '2', 
    type: 'mastercard',
    lastFour: '8901',
    expiryDate: '08/25',
    cardholderName: 'أحمد محمد',
    isDefault: false
  }
];

const currentSubscription: CurrentSubscription = {
  packageId: 'professional',
  packageName: 'الباقة الاحترافية',
  isYearly: false,
  startDate: new Date('2024-01-15'),
  endDate: new Date('2024-03-15'),
  remainingDays: 22,
  autoRenew: true,
  studentsUsed: 234,
  coursesUsed: 18,
};

function SubscriptionPackages() {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [showAutoRenewDialog, setShowAutoRenewDialog] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [showEditPaymentModal, setShowEditPaymentModal] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(samplePaymentMethods);
  const [newPaymentData, setNewPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleRenew = () => {
    console.log('تجديد الاشتراك');
    setShowRenewDialog(false);
  };

  const handleUpgradePackage = () => {
    // Set default payment method if available
    const defaultMethod = paymentMethods.find(method => method.isDefault);
    if (defaultMethod) {
      setSelectedPaymentMethod(defaultMethod.id);
    }
    setShowUpgradeModal(true);
  };

  const handlePaymentSubmit = () => {
    console.log('تنفيذ ترقية الباقة:', { selectedPackage, billingPeriod, selectedPaymentMethod });
    setShowUpgradeModal(false);
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentData.cardNumber && newPaymentData.cardholderName) {
      const newMethod: PaymentMethod = {
        id: Date.now().toString(),
        type: 'visa', // Determine based on card number
        lastFour: newPaymentData.cardNumber.slice(-4),
        expiryDate: newPaymentData.expiryDate,
        cardholderName: newPaymentData.cardholderName,
        isDefault: paymentMethods.length === 0
      };
      setPaymentMethods([...paymentMethods, newMethod]);
      setNewPaymentData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
      setShowPaymentMethodModal(false);
    }
  };

  const handleEditPaymentMethod = (method: PaymentMethod) => {
    setEditingPaymentMethod(method);
    setNewPaymentData({
      cardNumber: `****${method.lastFour}`,
      expiryDate: method.expiryDate,
      cvv: '',
      cardholderName: method.cardholderName
    });
    setShowEditPaymentModal(true);
  };

  const handleUpdatePaymentMethod = () => {
    if (editingPaymentMethod && newPaymentData.cardholderName) {
      setPaymentMethods(paymentMethods.map(method => 
        method.id === editingPaymentMethod.id 
          ? {
              ...method,
              cardholderName: newPaymentData.cardholderName,
              expiryDate: newPaymentData.expiryDate
            }
          : method
      ));
      setNewPaymentData({ cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
      setEditingPaymentMethod(null);
      setShowEditPaymentModal(false);
    }
  };

  const handleDeletePaymentMethod = (id: string) => {
    // Prevent deletion if this is the only payment method
    if (paymentMethods.length <= 1) {
      return;
    }
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  const handleCancelSubscription = () => {
    console.log('إلغاء الاشتراك');
    setShowCancelDialog(false);
  };

  const handleToggleAutoRenew = () => {
    console.log('تبديل التجديد التلقائي');
    setShowAutoRenewDialog(false);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={CreditCard}
        title="باقات الاشتراك"
      />

      {/* Current Subscription Status */}
      <div className="bg-white rounded-lg border-0 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-medium text-gray-900">اشتراكك الحالي</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-right">
            <h3 className="font-semibold text-lg text-blue-900">{currentSubscription.packageName}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {currentSubscription.isYearly ? 'اشتراك سنوي' : 'اشتراك شهري'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={currentSubscription.remainingDays > 7 ? 'default' : 'destructive'}>
                {currentSubscription.remainingDays} يوم متبقي
              </Badge>
              {currentSubscription.autoRenew && (
                <Badge variant="outline">تجديد تلقائي</Badge>
              )}
            </div>
          </div>

          <div className="text-right">
            <h4 className="font-medium text-gray-900 mb-2">الاستخدام الحالي</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>الطلاب:</span>
                <span>{currentSubscription.studentsUsed} / 500</span>
              </div>
              <div className="flex justify-between">
                <span>الدورات:</span>
                <span>{currentSubscription.coursesUsed} / 50</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Primary Upgrade Button */}
            <Button onClick={handleUpgradePackage} className="w-full">
              <Crown className="w-4 h-4 ml-2" />
              ترقية الباقة
            </Button>
            
            {/* Renew Now Button */}
            <Button onClick={() => setShowRenewDialog(true)} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 ml-2" />
              تجديد الآن
            </Button>
            
            {/* Icon-only buttons row */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAutoRenewDialog(true)} 
                className="flex-1"
                title={currentSubscription.autoRenew ? 'إيقاف التجديد التلقائي' : 'تفعيل التجديد التلقائي'}
              >
                {currentSubscription.autoRenew ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowCancelDialog(true)} 
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="إلغاء الاشتراك"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Management */}
      <div className="bg-white rounded-lg border-0 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-medium text-gray-900">وسائل الدفع</h2>
          </div>
          <Button onClick={() => setShowPaymentMethodModal(true)} size="sm">
            <Plus className="w-4 h-4 ml-2" />
            إضافة بطاقة
          </Button>
        </div>
        
        {paymentMethods.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CreditCard className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>لم تقم بإضافة أي وسيلة دفع بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-medium">
                      {method.type.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">•••• {method.lastFour}</p>
                      <p className="text-sm text-gray-600">{method.cardholderName}</p>
                      <p className="text-xs text-gray-500">ينتهي في {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {method.isDefault && (
                      <Badge variant="outline" className="text-xs mb-1">افتراضي</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      {!method.isDefault && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-gray-400 hover:text-green-600"
                          onClick={() => handleSetDefaultPaymentMethod(method.id)}
                          title="تعيين كافتراضي"
                        >
                          <Star className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-gray-400 hover:text-blue-600"
                        onClick={() => handleEditPaymentMethod(method)}
                        title="تعديل"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      {paymentMethods.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          title="حذف"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>







      {/* Upgrade Package Modal */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-right">ترقية الباقة</DialogTitle>
            <DialogDescription className="text-right">
              اختر الباقة ووسيلة الدفع
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Package Selection */}
            <div>
              <h3 className="font-medium mb-3 text-right">اختر الباقة</h3>
              <div className="space-y-2">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className={`flex items-center space-x-2 space-x-reverse p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedPackage === pkg.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'hover:bg-gray-50 border border-transparent'
                    }`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <input 
                      type="radio" 
                      id={pkg.id} 
                      name="package" 
                      value={pkg.id}
                      checked={selectedPackage === pkg.id}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Label htmlFor={pkg.id} className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pkg.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>شهري: {pkg.monthlyPrice} ريال | سنوي: {pkg.yearlyPrice} ريال</span>
                        </div>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Period */}
            <div>
              <h3 className="font-medium mb-3 text-right">فترة الدفع</h3>
              <div className="flex gap-6">
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="billingPeriod" 
                    value="monthly"
                    checked={billingPeriod === 'monthly'}
                    onChange={(e) => setBillingPeriod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  شهري
                </Label>
                <Label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="billingPeriod" 
                    value="yearly"
                    checked={billingPeriod === 'yearly'}
                    onChange={(e) => setBillingPeriod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  سنوي
                </Label>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="font-medium mb-3 text-right">وسيلة الدفع</h3>
              {paymentMethods.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="mb-3">لم تقم بإضافة أي وسيلة دفع بعد</p>
                  <Button onClick={() => { setShowUpgradeModal(false); setShowPaymentMethodModal(true); }} size="sm" variant="outline">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة بطاقة جديدة
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 space-x-reverse p-3 rounded-lg hover:bg-gray-50">
                      <input 
                        type="radio" 
                        id={`payment-${method.id}`} 
                        name="paymentMethod" 
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 flex-shrink-0"
                      />
                      <Label htmlFor={`payment-${method.id}`} className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs flex items-center justify-center font-medium">
                              {method.type.toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">•••• {method.lastFour}</p>
                              <p className="text-sm text-gray-600">{method.cardholderName}</p>
                            </div>
                          </div>
                          {method.isDefault && (
                            <Badge variant="outline" className="text-xs">افتراضي</Badge>
                          )}
                        </div>
                      </Label>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { setShowUpgradeModal(false); setShowPaymentMethodModal(true); }}
                    className="w-full mt-2"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة بطاقة جديدة
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowUpgradeModal(false)}>
                إلغاء
              </Button>
              <Button 
                onClick={handlePaymentSubmit} 
                disabled={!selectedPackage || !selectedPaymentMethod}
              >
                <CreditCard className="w-4 h-4 ml-2" />
                تأكيد الترقية
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Renew Subscription Dialog */}
      <Dialog open={showRenewDialog} onOpenChange={setShowRenewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">تجديد الاشتراك</DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من تجديد اشتراكك الحالي؟
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowRenewDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleRenew}>
              <RefreshCw className="w-4 h-4 ml-2" />
              تجديد الآن
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auto-Renewal Toggle Dialog */}
      <Dialog open={showAutoRenewDialog} onOpenChange={setShowAutoRenewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">
              {currentSubscription.autoRenew ? 'إيقاف التجديد التلقائي' : 'تفعيل التجديد التلقائي'}
            </DialogTitle>
            <DialogDescription className="text-right">
              {currentSubscription.autoRenew 
                ? 'هل أنت متأكد من إيقاف التجديد التلقائي لاشتراكك؟ سيتم إيقاف الخدمة في تاريخ انتهاء الاشتراك.'
                : 'هل أنت متأكد من تفعيل التجديد التلقائي؟ سيتم تجديد اشتراكك تلقائياً في تاريخ انتهاء الاشتراك.'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowAutoRenewDialog(false)}>
              إلغاء
            </Button>
            <Button onClick={handleToggleAutoRenew}>
              {currentSubscription.autoRenew ? <Pause className="w-4 h-4 ml-2" /> : <Play className="w-4 h-4 ml-2" />}
              {currentSubscription.autoRenew ? 'إيقاف' : 'تفعيل'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Payment Method Modal */}
      <Dialog open={showPaymentMethodModal} onOpenChange={setShowPaymentMethodModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">إضافة بطاقة جديدة</DialogTitle>
            <DialogDescription className="text-right">
              أدخل بيانات بطاقتك لحفظها لاستخدامها في المرات القادمة
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="newCardholderName" className="text-right block mb-2">اسم حامل البطاقة</Label>
              <Input
                id="newCardholderName"
                value={newPaymentData.cardholderName}
                onChange={(e) => setNewPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="أدخل اسم حامل البطاقة"
                className="text-right"
              />
            </div>
            
            <div>
              <Label htmlFor="newCardNumber" className="text-right block mb-2">رقم البطاقة</Label>
              <Input
                id="newCardNumber"
                value={newPaymentData.cardNumber}
                onChange={(e) => setNewPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="newExpiryDate" className="text-right block mb-2">تاريخ انتهاء الصلاحية</Label>
                <Input
                  id="newExpiryDate"
                  value={newPaymentData.expiryDate}
                  onChange={(e) => setNewPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              
              <div>
                <Label htmlFor="newCvv" className="text-right block mb-2">رمز الأمان (CVV)</Label>
                <Input
                  id="newCvv"
                  value={newPaymentData.cvv}
                  onChange={(e) => setNewPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setShowPaymentMethodModal(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleAddPaymentMethod} 
              disabled={!newPaymentData.cardNumber || !newPaymentData.cardholderName}
            >
              <Plus className="w-4 h-4 ml-2" />
              حفظ البطاقة
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Payment Method Modal */}
      <Dialog open={showEditPaymentModal} onOpenChange={setShowEditPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-right">تعديل بيانات البطاقة</DialogTitle>
            <DialogDescription className="text-right">
              تعديل بيانات بطاقتك
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="editCardholderName" className="text-right block mb-2">اسم حامل البطاقة</Label>
              <Input
                id="editCardholderName"
                value={newPaymentData.cardholderName}
                onChange={(e) => setNewPaymentData(prev => ({ ...prev, cardholderName: e.target.value }))}
                placeholder="أدخل اسم حامل البطاقة"
                className="text-right"
              />
            </div>
            
            <div>
              <Label htmlFor="editCardNumber" className="text-right block mb-2">رقم البطاقة</Label>
              <Input
                id="editCardNumber"
                value={newPaymentData.cardNumber}
                disabled
                className="bg-gray-100 text-gray-500"
                placeholder="لا يمكن تعديل رقم البطاقة"
              />
            </div>
            
            <div>
              <Label htmlFor="editExpiryDate" className="text-right block mb-2">تاريخ انتهاء الصلاحية</Label>
              <Input
                id="editExpiryDate"
                value={newPaymentData.expiryDate}
                onChange={(e) => setNewPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setShowEditPaymentModal(false)}>
              إلغاء
            </Button>
            <Button 
              onClick={handleUpdatePaymentMethod} 
              disabled={!newPaymentData.cardholderName}
            >
              <Edit className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cancel Subscription Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-right">إلغاء الاشتراك</DialogTitle>
            <DialogDescription className="text-right">
              هل أنت متأكد من إلغاء اشتراكك؟ ستفقد الوصول لجميع الميزات في نهاية الفترة الحالية.
              <br />
              <span className="font-medium text-red-600">
                تاريخ انتهاء الخدمة: {currentSubscription.endDate.toLocaleDateString('ar-SA')}
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              الإبقاء على الاشتراك
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription}>
              إلغاء الاشتراك
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubscriptionPackages;