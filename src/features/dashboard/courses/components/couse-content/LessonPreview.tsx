import { Card } from "@/components/ui/card";
import { useGetVideoLesson } from "../../hooks/useLessonsQueries";
import { useEffect, useState, useRef } from "react";
import type { SelectedItem } from ".";

interface LessonPreviewProps {
  selectedItem: SelectedItem | null;
}

function LessonPreview({ selectedItem }: LessonPreviewProps) {
  const { data: lessonVideo, isPending } = useGetVideoLesson(
    selectedItem?.lesson?.video_id
  ) as { data: Blob | string | undefined; isPending: boolean };

  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    // Clean up previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (lessonVideo instanceof Blob) {
      // Check if blob is valid and has content
      if (lessonVideo.size > 0) {
        const url = URL.createObjectURL(lessonVideo);
        blobUrlRef.current = url;
        setVideoUrl(url);

        // Optional: Verify the blob URL is accessible
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              console.error("Blob URL is not accessible:", response.status);
              setVideoUrl(undefined);
            }
          })
          .catch((error) => {
            console.error("Error accessing blob URL:", error);
            setVideoUrl(undefined);
          });
      } else {
        console.error("Blob is empty");
        setVideoUrl(undefined);
      }
    } else if (typeof lessonVideo === "string" && lessonVideo.trim()) {
      setVideoUrl(lessonVideo);
    } else {
      setVideoUrl(undefined);
    }

    // Cleanup function
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [lessonVideo]);

  // Handle video load errors
  const handleVideoError = (
    e: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    console.error("Video failed to load:", e);
    console.error("Current video URL:", videoUrl);
    console.error("Lesson video data:", lessonVideo);

    // Try to reload the video after a short delay
    if (videoRef.current) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 1000);
    }
  };

  const handleVideoCanPlay = () => {
    console.log("Video can play:", videoUrl);
  };

  let content;
  switch (selectedItem?.lesson?.type) {
    case "video":
      content = selectedItem.lesson.video_id && (
        <div className="space-y-6">
          <Card className="p-6 shadow-sm border-0">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                معاينة الدرس
              </h3>

              {isPending ? (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">جاري تحميل الفيديو...</p>
                  </div>
                </div>
              ) : videoUrl ? (
                <div
                  className="relative bg-black rounded-lg overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    onError={handleVideoError}
                    onCanPlay={handleVideoCanPlay}
                    onLoadStart={() => console.log("Video load started")}
                    onLoadedData={() => console.log("Video data loaded")}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    <source src={videoUrl} type="video/ogg" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-600 mb-2">فشل في تحميل الفيديو</p>
                    <p className="text-sm text-gray-500">
                      يرجى المحاولة مرة أخرى
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      );
      break;

      break;
    default:
      content = null;
      break;
  }

  return content && <div className="flex-1">{content}</div>;
}

export default LessonPreview;
