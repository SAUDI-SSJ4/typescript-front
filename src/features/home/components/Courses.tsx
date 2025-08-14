import CourseCard from "@/components/shared/CourseCard";
import Searchbar from "@/components/shared/searchbar";
import { usePublicCourses } from "../hooks/useCoursesQueries";
import type { Course } from "@/types/couse";
import { useCategories } from "@/features/dashboard/courses/hooks/useCoursesQueries";
import { useState } from "react";

export default function Courses() {
  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<string[]>([]);
  const [
    selectedPrices,
    setSelectedPrices,
  ] = useState<string[]>([]);
  const [
    selectedTypes,
    setSelectedTypes,
  ] = useState<string[]>([]);

  // Build filters object
  const filters: Record<
    string,
    string
  > = {};
  if (selectedCategories.length > 0) {
    filters.category =
      selectedCategories.join(",");
  }
  if (selectedPrices.length > 0) {
    filters.price =
      selectedPrices.join(",");
  }
  if (selectedTypes.length > 0) {
    filters.type =
      selectedTypes.join(",");
  }

  const { data: courses, isPending, error } =
    usePublicCourses({
      filters,
    });
  const { data: categories, isPending: categoriesPending } =
    useCategories();

  const handleCategoryChange = (
    categoryId: string,
    checked: boolean
  ) => {
    setSelectedCategories((prev) =>
      checked
        ? [...prev, categoryId]
        : prev.filter(
            (id) => id !== categoryId
          )
    );
  };

  const handlePriceChange = (
    priceValue: string,
    checked: boolean
  ) => {
    setSelectedPrices((prev) =>
      checked
        ? [...prev, priceValue]
        : prev.filter(
            (value) =>
              value !== priceValue
          )
    );
  };

  const handleTypeChange = (
    typeValue: string,
    checked: boolean
  ) => {
    setSelectedTypes((prev) =>
      checked
        ? [...prev, typeValue]
        : prev.filter(
            (value) =>
              value !== typeValue
          )
    );
  };
  if (isPending || categoriesPending) {
    return (
      <div className="text-center">
        جارٍ تحميل الدورات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        حدث خطأ في تحميل الدورات. يرجى المحاولة مرة أخرى.
      </div>
    );
  }

  const staticFilters = {
    price: [
      {
        title: "مجاني",
        value: "free",
      },
      {
        title: "مدفوع",
        value: "paid",
      },
    ],
    type: [
      {
        title: "حضوري",
        value: "attend",
      },
      {
        title: "مباشر",
        value: "live",
      },
      {
        title: "تفاعلي",
        value: "recorded",
      },
    ],
  };
  return (
    <section
      style={{
        background:
          "linear-gradient(136.72deg, rgba(0, 255, 206, 0.1) -16.9%, rgba(209, 209, 209, 0.173594) 34.08%, rgba(172, 172, 172, 0) 135.36%)",
      }}
      className="py-16"
    >
      <div className="container">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-10">
          <h2 className="text-2xl lg:text-3xl text-foreground font-bold text-center sm:text-right">
            كل المواد التدريبية
          </h2>
          <Searchbar className="w-md max-w-full" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-card rounded-[20px] p-6 md:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-card-foreground">
                التصنيف
              </h3>
              <div className="space-y-2">
                {categories?.data && categories.data.length > 0 ? (
                  categories.data.map(
                    (category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedCategories.includes(
                            String(
                              category.id
                            )
                          )}
                          onChange={(e) =>
                            handleCategoryChange(
                              String(
                                category.id
                              ),
                              e.target
                                .checked
                            )
                          }
                        />
                        <span className="text-sm">
                          {category.title}
                        </span>
                      </label>
                    )
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    لا توجد تصنيفات متاحة
                  </p>
                )}
              </div>
              <h3 className="font-semibold text-lg text-card-foreground">
                السعر
              </h3>
              <div className="space-y-2">
                {staticFilters.price.map(
                  (price) => (
                    <label
                      key={price.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedPrices.includes(
                          price.value
                        )}
                        onChange={(e) =>
                          handlePriceChange(
                            price.value,
                            e.target
                              .checked
                          )
                        }
                      />
                      <span className="text-sm">
                        {price.title}
                      </span>
                    </label>
                  )
                )}
              </div>
              <h3 className="font-semibold text-lg text-card-foreground">
                النوع
              </h3>
              <div className="space-y-2">
                {staticFilters.type.map(
                  (type) => (
                    <label
                      key={type.value}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedTypes.includes(
                          type.value
                        )}
                        onChange={(e) =>
                          handleTypeChange(
                            type.value,
                            e.target
                              .checked
                          )
                        }
                      />
                      <span className="text-sm">
                        {type.title}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
          </aside>
          {courses?.data?.courses && courses.data.courses.length > 0 ? (
            <CoursesList
              courses={courses.data.courses}
            />
          ) : !isPending ? (
            <div className="md:col-span-3 text-center text-muted-foreground">
              لا توجد دورات متاحة
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
function CoursesList({
  courses,
}: {
  courses: Course[];
}) {
  return (
    <div className="md:col-span-3">
      <ul className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => (
          <li
            key={course.id}
            className="bg-card hover:shadow-sm transition-colors duration-200 rounded-[20px] p-4"
          >
            <CourseCard
              course={course}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
