import Dashboard from "@/pages/dashboard";
import MyCourses from "@/pages/dashboard/my-courses";
<<<<<<< HEAD
import DigitalProducts from "@/pages/dashboard/digital-products";
import Certificates from "@/pages/dashboard/certificates";
=======
import DigitalProducts from "@/pages/dashboard/digital-products/index";
>>>>>>> sketch
import Favorites from "@/pages/dashboard/favorites";
import Profile from "@/pages/dashboard/profile";
import Purchases from "@/pages/dashboard/purchases";
import Settings from "@/pages/dashboard/settings";
import ShoppingCart from "@/pages/dashboard/shopping-cart";
import PaymentSuccess from "@/pages/dashboard/payment-success";
import Wallet from "@/pages/dashboard/wallet";
import { Route } from "react-router-dom";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import AcademyCourses from "../pages/dashboard/courses/index";
import AddNewCourse from "@/pages/dashboard/courses/new";

import UsersManagement from "../pages/dashboard/users";
import { templateRoutes } from "./TemplateRoutes";
// إضافة استيرادات المدونات
import Blogs from "@/pages/dashboard/blogs";
import AddNewBlog from "@/pages/dashboard/blogs/new";
import EditBlog from "@/pages/dashboard/blogs/edit/[id]";
// إضافة استيرادات المنتجات الرقمية
import AddDigitalProduct from "@/pages/dashboard/digital-products/add";
import EditDigitalProduct from "@/pages/dashboard/digital-products/edit/[id]";
// إضافة استيرادات الجلسات الحضورية
import AcademySessions from "@/pages/dashboard/sessions";
import AddNewSession from "@/pages/dashboard/sessions/new";
// إضافة استيرادات المواعيد
import AcademyAppointments from "@/pages/dashboard/appointments";
// إضافة استيرادات المواد التعليمية الذكية
import AILearningMaterials from "@/pages/dashboard/ai-learning-materials";
import AddAILearningMaterial from "@/pages/dashboard/ai-learning-materials/add";
import StudyMaterial from "@/pages/dashboard/ai-learning-materials/[id]/study";
import InnovativeStudyMaterial from "@/pages/dashboard/ai-learning-materials/innovative-study";
import ComprehensiveWebDevelopment from "@/pages/dashboard/ai-learning-materials/comprehensive-web-development";
import CreateChallenge from "@/pages/dashboard/ai-learning-materials/create-challenge";
import ChallengesList from "@/pages/dashboard/ai-learning-materials/challenges";
import ChallengePage from "@/pages/dashboard/ai-learning-materials/challenge/[id]";
// إضافة استيرادات البث المباشر
import LiveStreamPage from "@/pages/dashboard/ai-learning-materials/live-stream/LiveStreamPage";
import NewLiveStreamPage from "@/pages/dashboard/ai-learning-materials/live-stream/new";
// إضافة استيرادات الشهادات
import CertificatesEditing from "@/pages/dashboard/certificates-editing";
import EditCertificate from "@/pages/dashboard/certificates-editing/edit/[id]";
import CertificateStatsPage from "@/pages/dashboard/certificates-editing/stats/[id]";
// إضافة مسار إنشاء دورات حضورية
import NewPhysicalCourse from "@/pages/dashboard/physical-courses/new";
// إضافة مسار إنشاء دورات مباشرة
import NewLiveCourse from "@/pages/dashboard/live-courses/new";
// إضافة استيرادات كوبونات الخصم
import AcademyCoupons from "@/pages/dashboard/coupons";
import CouponStatsPage from "@/pages/dashboard/coupons/stats/[id]";
// إضافة استيرادات روابط التسويق بالعمولة
import AcademyAffiliateLinks from "@/pages/dashboard/affiliate-links";
import AffiliateLinkStatsPage from "@/pages/dashboard/affiliate-links/stats/[id]";
// إضافة استيرادات طلبات التسويق بالعمولة
import AcademyAffiliateApplications from "@/pages/dashboard/affiliate-applications";
import AffiliateApplicationDetails from "@/pages/dashboard/affiliate-applications/[id]";
import AffiliateOperationsPage from "@/pages/dashboard/affiliate-applications/[id]/operations";
// إضافة استيرادات حزم المنتجات
import ProductPackages from "@/pages/dashboard/product-packages";
import AddProductPackage from "@/pages/dashboard/product-packages/add";
import EditProductPackage from "@/pages/dashboard/product-packages/edit/[id]";
// إضافة استيرادات العروض والخصومات
import OffersPage from "@/pages/dashboard/offers";
// إضافة استيرادات الصفحات الجديدة
import Certificates from "@/pages/dashboard/certificates";
import AffiliateMarketing from "@/pages/dashboard/affiliate-marketing";
import StudentNotificationsPage from "@/pages/dashboard/student-notifications";
import CommentsManagementPage from "@/pages/dashboard/comments";
import StudentCertificatesPage from "@/pages/dashboard/student-certificates";
import ExamStatisticsPage from "@/pages/dashboard/exam-statistics";
import ExamDetailsPage from "@/pages/dashboard/exam-statistics/[id]";
import StudentQuestions from "@/pages/dashboard/student-questions";
import StudentChat from "@/pages/dashboard/student-chat";
import SubscriptionPackages from "@/pages/dashboard/subscription-packages";

import CertificateView from "@/pages/dashboard/certificate-view";
import StudentStatistics from "@/pages/dashboard/student-statistics";

export const dashboardRoutes = (
  <Route path="dashboard" element={<DashboardLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
    {/* Students Bag Routes */}
    <Route path="my-courses" element={<MyCourses />} />
    <Route path="users" element={<UsersManagement />} />
    <Route path="courses" element={<AcademyCourses />} />
    <Route path="courses/new" element={<AddNewCourse />} />
    {/* إضافة مسارات المدونات */}
    <Route path="blogs" element={<Blogs />} />
    <Route path="blogs/new" element={<AddNewBlog />} />
    <Route path="blogs/edit/:id" element={<EditBlog />} />
    {/* إضافة مسارات المنتجات الرقمية */}
    <Route path="digital-products" element={<DigitalProducts />} />
<<<<<<< HEAD
    <Route path="certificates" element={<Certificates />} />
    <Route path="certificates/:certificateId" element={<CertificateView />} />
    
=======
    <Route path="digital-products/add" element={<AddDigitalProduct />} />
    <Route path="digital-products/edit/:id" element={<EditDigitalProduct />} />
    {/* إضافة مسارات الجلسات الحضورية */}
    <Route path="sessions" element={<AcademySessions />} />
    <Route path="sessions/new" element={<AddNewSession />} />
    {/* إضافة مسار المواعيد */}
    <Route path="appointments" element={<AcademyAppointments />} />
    {/* إضافة مسارات كوبونات الخصم */}
    <Route path="coupons" element={<AcademyCoupons />} />
    <Route path="coupons/stats/:id" element={<CouponStatsPage />} />
    {/* إضافة مسارات روابط التسويق بالعمولة */}
    <Route path="affiliate-links" element={<AcademyAffiliateLinks />} />
    <Route path="affiliate-links/stats/:id" element={<AffiliateLinkStatsPage />} />
    {/* إضافة مسارات طلبات التسويق بالعمولة */}
    <Route path="affiliate-applications" element={<AcademyAffiliateApplications />} />
    <Route path="affiliate-applications/:id" element={<AffiliateApplicationDetails />} />
    <Route path="affiliate-applications/:id/operations" element={<AffiliateOperationsPage />} />
    {/* إضافة مسارات حزم المنتجات */}
    <Route path="product-packages" element={<ProductPackages />} />
    <Route path="product-packages/add" element={<AddProductPackage />} />
    <Route path="product-packages/edit/:id" element={<EditProductPackage />} />
    {/* إضافة مسارات العروض والخصومات */}
    <Route path="offers" element={<OffersPage />} />
              {/* إضافة مسارات المواد التعليمية الذكية */}
          <Route path="ai-learning-materials" element={<AILearningMaterials />} />
          <Route path="ai-learning-materials/add" element={<AddAILearningMaterial />} />
          <Route path="ai-learning-materials/:id/study" element={<StudyMaterial />} />
          <Route path="ai-learning-materials/innovative-study" element={<InnovativeStudyMaterial />} />
          <Route path="ai-learning-materials/comprehensive-web-development" element={<ComprehensiveWebDevelopment />} />
          <Route path="ai-learning-materials/create-challenge" element={<CreateChallenge />} />
          <Route path="ai-learning-materials/challenges" element={<ChallengesList />} />
          <Route path="ai-learning-materials/challenge/:id" element={<ChallengePage />} />
          {/* إضافة مسارات البث المباشر */}
          <Route path="ai-learning-materials/live-stream/:id" element={<LiveStreamPage />} />
          <Route path="ai-learning-materials/live-stream/demo" element={<LiveStreamPage />} />
          <Route path="ai-learning-materials/live-stream/new" element={<NewLiveStreamPage />} />
    {/* إنشاء دورات حضورية */}
    <Route path="physical-courses/new" element={<NewPhysicalCourse />} />
    {/* إنشاء دورات مباشرة */}
    <Route path="live-courses/new" element={<NewLiveCourse />} />
    <Route path="certificates" element={<Certificates />} />
                    <Route path="certificates-editing" element={<CertificatesEditing />} />
                <Route path="certificates-editing/edit/:id" element={<EditCertificate />} />
                <Route path="certificates-editing/stats/:id" element={<CertificateStatsPage />} />
    {/* إضافة مسار إرسال الإشعارات للطلاب */}
    <Route path="student-notifications" element={<StudentNotificationsPage />} />
    {/* إضافة مسار إدارة التعليقات */}
    <Route path="comments" element={<CommentsManagementPage />} />
    {/* إضافة مسار أسئلة الطلاب */}
    <Route path="student-questions" element={<StudentQuestions />} />
    {/* إضافة مسار محادثات الطلاب */}
    <Route path="student-chat" element={<StudentChat />} />
    {/* إضافة مسار باقات الاشتراك */}
    <Route path="subscription-packages" element={<SubscriptionPackages />} />
    {/* إضافة مسار إدارة شهادات الطلاب */}
    <Route path="student-certificates" element={<StudentCertificatesPage />} />
    {/* إضافة مسار إحصائيات الاختبارات */}
    <Route path="exam-statistics" element={<ExamStatisticsPage />} />
    <Route path="exam-statistics/:id" element={<ExamDetailsPage />} />
>>>>>>> sketch
    <Route path="favorites" element={<Favorites />} />
    {/* Student Statistics */}
    <Route path="statistics" element={<StudentStatistics />} />
    {/* Other Routes */}
    <Route path="purchases" element={<Purchases />} />
    <Route path="shopping-cart" element={<ShoppingCart />} />
    <Route path="payment-success" element={<PaymentSuccess />} />
    <Route path="wallet" element={<Wallet />} />
    {/* Shopping Cart Routes */}
    <Route
      path="affiliate-marketing"
      element={<AffiliateMarketing />}
    />
    {templateRoutes}
  </Route>
);
