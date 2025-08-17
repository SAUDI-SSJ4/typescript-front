import { cn } from "@/lib/utils";

type RemoteImageProps = {
  onError?: () => void;
  prefix?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

function RemoteImage({
  className,
  src,
  alt = "Image",
  loading = "lazy",
  prefix = "static",
  ...rest
}: RemoteImageProps) {
  // Don't render if src is empty or invalid
  if (!src || typeof src !== 'string' || src.trim() === '') {
    return null;
  }

  // إصلاح مشكلة VITE_API_URL
  const getApiUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (!envUrl) {
      console.warn("VITE_API_URL not defined, using default 127.0.0.1:8000");
      return "http://127.0.0.1:8000";
    }
    
    try {
      new URL(envUrl);
      return envUrl;
    } catch (error) {
      console.warn("Invalid VITE_API_URL, using default 127.0.0.1:8000:", error);
      return "http://127.0.0.1:8000";
    }
  };

  const url = getApiUrl();
  
  // Don't render if API URL is not available
  if (!url) {
    return null;
  }

  try {
    const origin = new URL(url).origin;

    // Normalize src to be relative under uploads/ when needed
    const toRelativeUnderUploads = (input: string): string => {
      let p = input.trim();

      // Strip known prefixes to avoid duplication
      if (p.startsWith('/static/uploads/')) p = p.slice(16);
      else if (p.startsWith('static/uploads/')) p = p.slice(15);
      else if (p.startsWith('/uploads/')) p = p.slice(9);
      else if (p.startsWith('uploads/')) p = p.slice(8);
      else if (p.startsWith('/')) p = p.slice(1);

      return p;
    };

    let imageSrc: string;
    if (src.startsWith('http')) {
      imageSrc = src;
    } else {
      const rel = toRelativeUnderUploads(src);

      // If already starts with static/, don't append uploads again
      if (rel.startsWith('static/')) {
        imageSrc = `${origin}/${rel}`;
      } else if (prefix) {
        // Compose under /static/uploads/
        imageSrc = `${origin}/static/uploads/${rel}`;
      } else {
        imageSrc = `${origin}/${rel}`;
      }
    }
    
    return (
      <img
        src={imageSrc}
        alt={alt}
        loading={loading}
        className={`${cn("h-16 w-16 rounded-lg object-cover")} ${className}`}
        {...rest}
      />
    );
  } catch {
    console.warn('Invalid API URL:', url);
    return null;
  }
}

export default RemoteImage;
