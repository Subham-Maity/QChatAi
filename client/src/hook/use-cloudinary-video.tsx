import { useEffect, useState } from "react";

interface UseCloudinaryVideoReturn {
  videoUrl: string | null;
  loading: boolean;
}

const useCloudinaryVideo = (publicId: string): UseCloudinaryVideoReturn => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(`/api/video?publicId=${publicId}`);
        const data = await response.json();

        if (response.ok) {
          setVideoUrl(data.url);
        } else {
          console.error(data.error);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching video URL:", error);
        setLoading(false);
      }
    };

    fetchVideoUrl();
  }, [publicId]);

  return { videoUrl, loading };
};

export default useCloudinaryVideo;
