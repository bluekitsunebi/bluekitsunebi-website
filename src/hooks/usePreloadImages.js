// import { useEffect, useState } from 'react';

// const usePreloadImages = (imageUrls) => {
//   const [imagesLoaded, setImagesLoaded] = useState(false);

//   useEffect(() => {
//     const loadImage = (url) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = url;
//         img.onload = resolve;
//         img.onerror = reject;
//       });
//     };

//     Promise.all(imageUrls.map(loadImage))
//       .then(() => setImagesLoaded(true))
//       .catch((err) => console.error('Failed to load images', err));
//   }, [imageUrls]);

//   return imagesLoaded;
// };

// export default usePreloadImages;
