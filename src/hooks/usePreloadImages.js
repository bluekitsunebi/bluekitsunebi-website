import { useEffect } from 'react';

const usePreloadImages = (imageUrls) => {
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [imageUrls]);
};

export default usePreloadImages;
