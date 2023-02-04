import { StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, Box, FlatList, HStack, Image, Text } from 'native-base'
import Ratings from './Ratings'

const ReviewList = ({reviews}) => {

    const renderReview = ({item}) => {
        return(
            <HStack>
                <Avatar alt="person" source={require('../../../Images/user.jpg')} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Box>
                    <Ratings defaultRating={parseFloat(item?.Rating)} imageSize={12} />
                    <Text>{item?.Comment}</Text>
                </Box>
            </HStack>
        )
    }


    return (
        <FlatList 
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 20 }}
        />
    )
}

export default ReviewList

const styles = StyleSheet.create({})