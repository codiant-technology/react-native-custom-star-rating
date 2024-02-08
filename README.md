## React Native Rating

This library enables the use of both Swipe and Tap rating features in a single component and is compatible with both Android and iOS platforms.

<p align="left">
   <img  width="150" height="300" src="https://github.com/codiant-technology/react-native-rating/blob/main/assets/IMG.png">
   <img  width="150" height="300" src="https://github.com/codiant-technology/react-native-rating/blob/main/assets/SwipeStar.gif">
</p>

## Features

- Support Swipe and Tap Gesture rating.
- You can enable half start Rating.
- You can update the images for both the filled and unfilled states.

### Installation

`$ yarn add react-native-custom-star-rating`

Or

`$ npm install react-native-custom-star-rating`

## Usage

```javascript
import Rating from "react-native-custom-star-rating";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Rating
         filledImage={require(./yourImage.png)} //@notRequired
         unfilledImage={require(./yourImage.png)} //@notRequired
         onResult={result => {
            console.log('result : ', result);
         }}
      />
    </View>
  );
};

export default App;
```

## Install

```shell

npm i react-native-gesture-handler@2.12.1
npm i react-native-reanimated@3.4.2

```

## Props

| prop          | default           | type                   | description                                                                                |
| ------------- | ----------------- | ---------------------- | ------------------------------------------------------------------------------------------ |
| initialRating | 1                 | number                 | Initial value for the rating                                                               |
| renderStarts  | 5                 | number                 | For Render numbers of Starts                                                               |
| startHeight   | 40                | number                 | Height and Width of Start                                                                  |
| onResult      |                   | function(value:number) | The "onResult" is a callback function that provides the final rating output.               |
| spaceBetween  | 0                 | number                 | spaceBetween prop is used for provide space between starts                                 |
| filledImage   | FilledStart.png   | ImageRequireSource     | The "filledImage" property is used to specify your own image for the filled star.          |
| unfilledImage | UnFilledStart.png | ImageRequireSource     | The "unfilledImage" property is used to specify your own image for the unfilled star.      |
| isHalf        | false             | boolean                | The "isHalf" property is used to enable the functionality of half-star rating.             |
| swipeEnabled  | true              | boolean                | The "swipeEnabled" property is used to enable the Swipe functionality in Rating component. |
