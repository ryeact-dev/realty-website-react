import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Image({ src, ...rest }) {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    let objectUrl;

    if (src.toString().includes('https://' || 'http://')) {
      setImgSrc(src);
    } else {
      objectUrl = URL.createObjectURL(src);
      setImgSrc(objectUrl);
    }

    // Revoke the object URL after the image has finished loading
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  // return <img {...rest} src={imgSrc} alt={''} loading='lazy' />;
  return (
    <LazyLoadImage
      {...rest}
      effect='blur'
      wrapperProps={{
        // If you need to, you can tweak the effect transition using the wrapper style.
        style: { transitionDelay: '1s' },
      }}
      src={imgSrc}
    />
  );
}
