import { ImageRequireSource } from "react-native/types";

export interface CustomRatingProps {
  initialRating?: number;
  renderStars?: number;
  starHeight?: number;
  onResult?: (result: number) => void;
  spaceBetween?: number;
  filledImage?: ImageRequireSource;
  unfilledImage?: ImageRequireSource;
  isHalf?: boolean;
  swipeEnabled?: boolean;
  tapEnabled?: boolean;
}
