
// modulo de tipado para el componente de galley

declare module "react-image-gallery" {
    import { Component, ReactNode } from "react";
  
    interface ImageGalleryItem {
      original: string;
      thumbnail: string;
      fullscreen?: string;
      originalHeight?: number;
      originalWidth?: number;
      loading?: "lazy" | "eager";
      thumbnailHeight?: number;
      thumbnailWidth?: number;
      thumbnailLoading?: "lazy" | "eager";
      originalClass?: string;
      thumbnailClass?: string;
      renderItem: (item: ImageGalleryItem) => ReactNode;
      renderThumbInner?: (item: ImageGalleryItem) => ReactNode;
      originalAlt?: string;
      thumbnailAlt?: string;
      originalTitle?: string;
      thumbnailTitle?: string;
      thumbnailLabel?: string;
      description?: string;
      srcSet?: string;
      sizes?: string;
      bulletClass?: string;
    }
  
    interface ImageGalleryProps {
      items: ImageGalleryItem[];
      infinite?: boolean;
      lazyLoad?: boolean;
      showNav?: boolean;
      showThumbnails?: boolean;
      thumbnailPosition?: "top" | "bottom" | "left" | "right";
      showFullscreenButton?: boolean;
      useBrowserFullscreen?: boolean;
      useTranslate3D?: boolean;
      showPlayButton?: boolean;
      isRTL?: boolean;
      showBullets?: boolean;
      showIndex?: boolean;
      autoPlay?: boolean;
      disableThumbnailScroll?: boolean;
      disableKeyDown?: boolean;
      disableSwipe?: boolean;
      disableThumbnailSwipe?: boolean;
      onErrorImageURL?: string;
      indexSeparator?: string;
      slideDuration?: number;
      swipingTransitionDuration?: number;
      slideInterval?: number;
      slideOnThumbnailOver?: boolean;
      flickThreshold?: number;
      swipeThreshold?: number;
      stopPropagation?: boolean;
      startIndex?: number;
      onImageError?: (event: Event) => void;
      onThumbnailError?: (event: Event) => void;
      onThumbnailClick?: (event: Event, index: number) => void;
      onBulletClick?: (event: Event, index: number) => void;
      onImageLoad?: (event: Event) => void;
      onSlide?: (currentIndex: number) => void;
      onBeforeSlide?: (nextIndex: number) => void;
      onScreenChange?: (isFullscreen: boolean) => void;
      onPause?: (currentIndex: number) => void;
      onPlay?: (currentIndex: number) => void;
      onClick?: (event: Event) => void;
      onTouchMove?: (event: Event) => void;
      onTouchEnd?: (event: Event) => void;
      onTouchStart?: (event: Event) => void;
      onMouseOver?: (event: Event) => void;
      onMouseLeave?: (event: Event) => void;
      additionalClass?: string;
      renderCustomControls?: () => ReactNode;
      renderLeftNav?: (onClick: () => void, disabled: boolean) => ReactNode;
      renderRightNav?: (onClick: () => void, disabled: boolean) => ReactNode;
      renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => ReactNode;
      renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => ReactNode;
      useWindowKeyDown?: boolean;
    }
  
    export default class ImageGallery extends Component<ImageGalleryProps> {
      play(): void;
      pause(): void;
      toggleFullScreen(): void;
      slideToIndex(index: number): void;
      getCurrentIndex(): number;
    }
  }
  