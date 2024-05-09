import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  clamp,
  withTiming,
} from "react-native-reanimated";
import { ratingCount, initialRating_ } from "./utils/utils";
import { Images } from "./utils/images";
import { CustomRatingProps } from "./utils/interface";

const Rating: React.FC<CustomRatingProps> = ({
  initialRating = 1,
  renderStars = 5,
  starHeight = 40,
  onResult,
  spaceBetween = 0,
  filledImage,
  unfilledImage,
  isHalf = false,
  swipeEnabled = true,
  tapEnabled = true,
  activeTintColor,
  inActiveTintColor,
}) => {
  const containerDimensions = {
    height: starHeight,
    width: starHeight,
  };
  const maxRating = new Array(renderStars).fill(0);
  const position = useSharedValue(
    initialRating
      ? initialRating_(initialRating, starHeight, spaceBetween, renderStars)
      : 0
  );
  const savedPosition = useSharedValue(
    initialRating
      ? initialRating_(initialRating, starHeight, spaceBetween, renderStars)
      : 0
  );
  const panRat = (rates: number) => {
    if (rates > renderStars) {
      return renderStars;
    }
    return rates;
  };

  const onGenerateTap = (value: number, rates: number) => {
    const ar = `${rates}`.split(".");
    if (rates > value && ar.length > 1) {
      return +rates + 0.5;
    }
    return value;
  };

  const panGesture = Gesture.Pan()
    .enabled(swipeEnabled)
    .runOnJS(true)
    .onUpdate((e) => {
      const maxWidth = clamp(
        e.translationX + savedPosition.value,
        0,
        maxRating.length * (starHeight + spaceBetween)
      );
      position.value = maxWidth;
    })
    .onEnd(() => {
      const rates = ratingCount(position.value / (starHeight + spaceBetween));
      if (!isHalf) {
        const value = Math.round(position.value / starHeight);
        position.value = withTiming(
          panRat(value) * starHeight + spaceBetween * +`${rates}`.split(".")[0]
        );
      } else {
        position.value = withTiming(
          rates * starHeight + spaceBetween * +`${rates}`.split(".")[0]
        );
      }
      savedPosition.value = position.value;
      setTimeout(() => {
        onResult &&
          onResult(ratingCount(position.value / (starHeight + spaceBetween)));
      }, 250);
    });

  const Tap = Gesture.Tap()
    .enabled(tapEnabled)
    .runOnJS(true)
    .maxDuration(250)
    .onStart((e) => {
      const maxWidth = clamp(
        e.x,
        0,
        maxRating.length * (starHeight + spaceBetween)
      );
      const halfEnabledValue = Math.round(maxWidth / starHeight);
      const rates = ratingCount(maxWidth / (starHeight + spaceBetween));
      if (!isHalf) {
        const value = halfEnabledValue === 0 ? 1 : halfEnabledValue;
        position.value = withTiming(
          onGenerateTap(value, rates) * starHeight +
            spaceBetween * +`${rates}`.split(".")[0]
        );
      } else {
        position.value = withTiming(
          rates * starHeight + spaceBetween * +`${rates}`.split(".")[0]
        );
      }
    })
    .onEnd((e) => {
      savedPosition.value = position.value;
      setTimeout(() => {
        onResult &&
          onResult(
            ratingCount(
              (isHalf ? e.x : position.value) / (starHeight + spaceBetween)
            )
          );
      }, 250);
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: position.value,
    };
  });

  const unFilled = (): React.ReactNode => {
    return maxRating.map((_, key) => {
      return (
        <View key={key.toString()}>
          <Image
            tintColor={inActiveTintColor ? inActiveTintColor : "grey"}
            style={[
              styles.starImageStyle,
              { ...containerDimensions, marginRight: spaceBetween },
            ]}
            source={unfilledImage ? unfilledImage : Images.ic_star}
          />
        </View>
      );
    });
  };
  const filled = (): React.ReactNode => {
    return maxRating.map((_, key) => {
      return (
        <View key={key.toString()}>
          <Image
            tintColor={activeTintColor ? activeTintColor : undefined}
            style={[
              styles.starImageStyle,
              { ...containerDimensions, marginRight: spaceBetween },
            ]}
            source={filledImage ? filledImage : Images.ic_filled_star}
          />
        </View>
      );
    });
  };
  return (
    <GestureDetector gesture={Gesture.Exclusive(panGesture, Tap)}>
      <Animated.View
        style={[
          styles.hideFlow,
          { width: maxRating.length * (starHeight + spaceBetween) },
        ]}
      >
        <Animated.View style={styles.unFilledContainer}>
          {unFilled()}
        </Animated.View>
        <Animated.View style={[styles.filledContainer, animatedStyle]}>
          {filled()}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default React.memo(Rating);

const styles = StyleSheet.create({
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
  },
  starImageStyle: {
    resizeMode: "cover",
  },
  beforeContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    overflow: "hidden",
  },
  unFilledContainer: {
    flexDirection: "row",
    zIndex: 1,
    position: "absolute",
    right: 0,
  },
  filledContainer: {
    flexDirection: "row",
    zIndex: 999,
    left: 0,
    overflow: "hidden",
  },
  hideFlow: {
    overflow: "hidden",
  },
});
