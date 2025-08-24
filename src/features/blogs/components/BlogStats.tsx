import { TrendingUp, FileText, Edit, Eye, Heart } from "lucide-react";
import type { Blog } from "@/types/blog";

interface BlogStatsProps {
  blogs: Blog[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

function BlogStats({ blogs }: BlogStatsProps) {
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter(blog => blog.status === 'published').length;
  const draftBlogs = blogs.filter(blog => blog.status === 'draft').length;
  const totalViews = blogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="إجمالي المقالات"
        value={totalBlogs}
        icon={<FileText className="w-8 h-8" />}
        change="+12%"
        changeType="positive"
      />
      <StatCard
        title="المقالات المنشورة"
        value={publishedBlogs}
        icon={<Edit className="w-8 h-8" />}
        change="+8%"
        changeType="positive"
      />
      <StatCard
        title="المسودات"
        value={draftBlogs}
        icon={<FileText className="w-8 h-8" />}
      />
      <StatCard
        title="إجمالي المشاهدات"
        value={totalViews.toLocaleString()}
        icon={<Eye className="w-8 h-8" />}
        change="+15%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي الإعجابات"
        value={totalLikes.toLocaleString()}
        icon={<Heart className="w-8 h-8" />}
        change="+22%"
        changeType="positive"
      />
    </div>
  );
}

export { BlogStats };
