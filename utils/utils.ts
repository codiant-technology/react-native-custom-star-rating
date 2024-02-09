export const ratingCount = (rating: number): number => {
  if (rating && typeof rating == "number") {
    if (rating > 0) {
      const count = Math.round(rating * 10) / 10;
      const arr = `${count}`.split(".");
      if (arr.length > 1) {
        if (+arr[1] > 5) {
          return +arr[0] + 1;
        } else if (+arr[1] >= 3) {
          return +`${arr[0]}.5`;
        }
        return +arr[0];
      }
      return +arr[0];
    }
    return 0;
  }
  return 0;
};

/**
 *
 * @param initialRating
 * @param starHeight
 * @param spaceBetween
 * @param maxRating
 * @returns ratingPosition
 */
export const initialRating_ = (
  initialRating: number,
  starHeight: number,
  spaceBetween: number,
  maxRating: number
) => {
  if (initialRating > maxRating) {
    const rate1 =
      maxRating * starHeight + spaceBetween * +`${initialRating}`.split(".")[0];
    return rate1;
  }
  const rate =
    initialRating * starHeight +
    spaceBetween * +`${initialRating}`.split(".")[0];
  return rate;
};
