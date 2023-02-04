import { StyleSheet } from 'react-native'
import React from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';

const Ratings = ({imageSize, defaultRating, onFinishRating, readonly}) => {
  return (
        <Rating
            imageSize={imageSize}
            reviews={''}
            defaultRating={defaultRating}
            onFinishRating={onFinishRating}
            ratingCount={5}
            startingValue={defaultRating}
            readonly={readonly}
        />
    )
}

export default Ratings

const styles = StyleSheet.create({})