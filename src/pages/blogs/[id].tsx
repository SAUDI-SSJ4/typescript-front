import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, Eye, Tag, MessageCircle, Send, Star, Facebook, Linkedin, Clock, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/features/launch-academy/components/Layout";
import type { Blog } from "@/types/blog";

// Comment interface
interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  rating: number;
}

// Sample blog data - replace with API call
const blogData: Blog[] = [
  {
    id: 1,
    title: "مستقبل الذكاء الاصطناعي في التعليم: كيف ستغير التقنية وجه التعلم؟",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>يشهد قطاع التعليم تطوراً هائلاً مع دخول تقنيات الذكاء الاصطناعي التي تعد بثورة حقيقية في طرق التعلم والتعليم. من المساعدين الذكيين إلى أنظمة التقييم التلقائي، تفتح هذه التقنيات آفاقاً جديدة لتحسين جودة التعليم وجعله أكثر تخصيصاً وفعالية.</p>
        
        <h2>التخصيص في التعلم</h2>
        <p>إحدى أهم فوائد الذكاء الاصطناعي في التعليم هي قدرته على تخصيص التجربة التعليمية لكل طالب على حدة. فبدلاً من النهج التقليدي "مقاس واحد يناسب الجميع"، يمكن للذكاء الاصطناعي تحليل أسلوب تعلم كل طالب وتفضيلاته وسرعة استيعابه لتقديم محتوى مخصص يناسبه.</p>
        
        <h2>المساعدون الأذكياء</h2>
        <p>المساعدون الأذكياء مثل ChatGPT وGoogle Bard يمكنها الإجابة على أسئلة الطلاب على مدار الساعة، وتقديم شروحات مبسطة للمفاهيم المعقدة، ومساعدة الطلاب في حل الواجبات والمشاريع. هذا يوفر دعماً مستمراً للطلاب خارج أوقات الدراسة الرسمية.</p>
        
        <h2>التقييم الذكي</h2>
        <p>يمكن للذكاء الاصطناعي أتمتة عملية التقييم وتقديم ملاحظات فورية للطلاب. كما يمكنه تحليل أداء الطلاب عبر الزمن وتحديد نقاط القوة والضعف لديهم، مما يساعد المعلمين على تطوير استراتيجيات تعليمية أكثر فعالية.</p>
        
        <h2>التحديات والاعتبارات</h2>
        <p>رغم الفوائد الهائلة، هناك تحديات يجب مواجهتها مثل ضمان خصوصية البيانات، وتجنب التحيز في الخوارزميات، والحفاظ على التفاعل البشري في العملية التعليمية. كما يتطلب تطبيق هذه التقنيات تدريب المعلمين وتطوير البنية التحتية التقنية.</p>
        
        <h2>المستقبل</h2>
        <p>نتوقع أن نرى في السنوات القادمة تطوراً أكبر في تطبيقات الذكاء الاصطناعي في التعليم، من الواقع المعزز والافتراضي إلى أنظمة التعلم التكيفية المتطورة. هذا سيغير جذرياً من طبيعة التعليم ويجعله أكثر تفاعلية وشخصية.</p>
      </div>
    `,
    excerpt: "استكشاف كيفية تأثير الذكاء الاصطناعي على مستقبل التعليم والتعلم الرقمي وكيف يمكن للتقنيات الحديثة أن تحسن من تجربة التعلم",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["ذكاء اصطناعي", "تعليم", "تقنية"],
    category: "تقنية",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    views: 1250,
    likes: 89,
  },
];

// Sample comments data
const commentsData: Comment[] = [
  {
    id: 1,
    author: "سارة أحمد",
    content: "مقال رائع! لقد استفدت كثيراً من المعلومات المقدمة حول استخدام الذكاء الاصطناعي في التعليم. أتطلع لرؤية المزيد من هذا المحتوى القيم.",
    createdAt: "2024-01-16T09:30:00Z",
    rating: 5,
  },
  {
    id: 2,
    author: "محمد علي",
    content: "أعتقد أن هناك تحديات أخرى لم يتم ذكرها مثل التكلفة العالية لتطبيق هذه التقنيات في المؤسسات التعليمية الصغيرة.",
    createdAt: "2024-01-16T14:20:00Z",
    rating: 4,
  },
  {
    id: 3,
    author: "فاطمة الزهراء",
    content: "هل يمكن أن تشاركوا أمثلة عملية لأدوات الذكاء الاصطناعي التي يمكن للمعلمين استخدامها الآن؟",
    createdAt: "2024-01-17T11:45:00Z",
    rating: 4,
  },
];

// Related articles data
const relatedArticles: Blog[] = [
  {
    id: 2,
    title: "أفضل الممارسات في تصميم واجهات المستخدم للتطبيقات التعليمية",
    content: "<p>دليل شامل لتصميم واجهات مستخدم فعالة وجذابة للمنصات التعليمية</p>",
    excerpt: "دليل شامل لتصميم واجهات مستخدم فعالة وجذابة للمنصات التعليمية",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تصميم", "واجهات المستخدم", "تطبيقات تعليمية"],
    category: "تصميم",
    status: "published",
    author: "سارة أحمد",
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    views: 850,
    likes: 65,
  },
  {
    id: 3,
    title: "كيفية بناء استراتيجية تسويق رقمي ناجحة للمحتوى التعليمي",
    content: "<p>خطوات عملية لتطوير استراتيجية تسويق رقمي فعالة</p>",
    excerpt: "خطوات عملية لتطوير استراتيجية تسويق رقمي فعالة",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تسويق رقمي", "استراتيجية", "محتوى تعليمي"],
    category: "تسويق",
    status: "published",
    author: "محمد علي",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    views: 720,
    likes: 48,
  },
  {
    id: 4,
    title: "أهمية ريادة الأعمال في العصر الرقمي",
    content: "<p>كيف يمكن للريادة أن تشكل المستقبل وما هي الفرص المتاحة</p>",
    excerpt: "كيف يمكن للريادة أن تشكل المستقبل وما هي الفرص المتاحة",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["ريادة الأعمال", "العصر الرقمي", "فرص"],
    category: "أعمال",
    status: "published",
    author: "فاطمة الزهراء",
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    views: 640,
    likes: 52,
  },
];

const StarRating = ({ rating, onRatingChange, interactive = false }: { rating: number; onRatingChange?: (rating: number) => void; interactive?: boolean }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={() => interactive && onRatingChange && onRatingChange(star)}
        />
      ))}
    </div>
  );
};

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [loading, setLoading] = useState(true);
  
  // Comment form state
  const [commentForm, setCommentForm] = useState({
    content: "",
    rating: 0
  });
  
  // Copy notification state
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    // Simulate loading blog data
    const foundBlog = blogData.find(b => b.id === Number(id));
    setTimeout(() => {
      setBlog(foundBlog || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.content || commentForm.rating === 0) {
      return;
    }

    const newComment: Comment = {
      id: Date.now(),
      author: "مستخدم مجهول",
      content: commentForm.content,
      createdAt: new Date().toISOString(),
      rating: commentForm.rating,
    };

    setComments([newComment, ...comments]);
    setCommentForm({ content: "", rating: 0 });
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || "";
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'x':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setShowCopyNotification(true);
          setTimeout(() => setShowCopyNotification(false), 2000);
        });
        break;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-[rgb(249_250_251)]">
          <div className="text-lg">جاري التحميل...</div>
        </div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-[rgb(249_250_251)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">المقال غير موجود</h1>
            <Link to="/blogs">
              <Button>العودة للمدونة</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[rgb(249_250_251)]">
        <div className="pt-32 md:pt-36 pb-8 md:pb-12">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <article className="flex-1 lg:w-[70%]">


                {/* Article Header */}
                <header className="mb-8">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                  </h1>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-6">
                      <Link to="/academy" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <img 
                          src="/assets/images/logo.svg" 
                          alt="أكاديمية سيان" 
                          className="w-8 h-8 rounded-full"
                        />
                        أكاديمية سيان
                      </Link>
                      <span className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4" />
                        {formatDate(blog.createdAt)}
                      </span>
                      <Badge className="bg-blue-100 text-blue-700 border-0">
                        {blog.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {blog.views?.toLocaleString()} مشاهدة
                      </span>
                      
                      {/* Share Buttons */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare('copy')}
                            className="p-1 h-auto text-gray-600 hover:bg-gray-50"
                            title="نسخ الرابط"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          {showCopyNotification && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full animate-fade-in">
                               تم نسخ رابط المقالة
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('facebook')}
                          className="p-1 h-auto text-blue-600 hover:bg-blue-50"
                        >
                          <Facebook className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('x')}
                          className="p-1 h-auto text-gray-900 hover:bg-gray-50"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare('linkedin')}
                          className="p-1 h-auto text-blue-700 hover:bg-blue-50"
                        >
                          <Linkedin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 md:h-96 object-cover rounded-2xl"
                  />
                </div>

                {/* Article Content */}
                <div 
                  className="prose prose-lg max-w-none mb-8 text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  dir="rtl"
                />

                {/* Keywords */}
                <div className="mb-8 pb-8 bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">الكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Comments Section */}
                <section className="space-y-8">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <h2 className="text-2xl font-bold text-gray-900">
                      التعليقات ({comments.length})
                    </h2>
                  </div>

                  {/* Comment Form */}
                  <div className="bg-white rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-4">اترك تعليقاً</h3>
                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          التقييم *
                        </label>
                        <StarRating 
                          rating={commentForm.rating} 
                          onRatingChange={(rating) => setCommentForm({...commentForm, rating})} 
                          interactive={true}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          التعليق *
                        </label>
                        <Textarea
                          value={commentForm.content}
                          onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                          placeholder="اكتب تعليقك هنا..."
                          rows={4}
                          required
                          dir="rtl"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                        />
                      </div>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">
                        <Send className="w-4 h-4 mr-2" />
                        إرسال التعليق
                      </Button>
                    </form>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} formatDate={formatDate} />
                    ))}
                  </div>
                </section>
              </article>

              {/* Sidebar */}
              <aside className="lg:w-[30%] space-y-6">
                {/* Latest Articles */}
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    المقالات الجديدة
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.slice(0, 3).map((article) => (
                      <Link key={article.id} to={`/blogs/${article.id}`} className="block group">
                        <div className="flex gap-3">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-20 h-12 aspect-[10/6] object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(article.createdAt)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Articles */}
                <div className="bg-white rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-green-600" />
                    مقالات أخرى
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Link key={article.id} to={`/blogs/${article.id}`} className="block group">
                        <div className="flex gap-3">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-20 h-12 aspect-[10/6] object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {article.title}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                {article.category}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDate(article.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CommentCard({ comment, formatDate }: { comment: Comment; formatDate: (date: string) => string }) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{comment.author}</h4>
              <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <StarRating rating={comment.rating} />
        </div>
        
        <p className="text-gray-700 leading-relaxed" dir="rtl">
          {comment.content}
        </p>
      </div>
    </div>
  );
}