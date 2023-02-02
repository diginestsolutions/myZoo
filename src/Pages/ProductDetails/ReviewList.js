import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Avatar, Box, FlatList, HStack, Image, Text } from 'native-base'
import Ratings from './Ratings'
import moment from 'moment'
import customAxios from '../../CustomAxios'

const ReviewList = ({productId}) => {

    const [reviewList, setReviewlist] = useState()

    useEffect(() => {
        if(productId){
            let data = {
                "ProductId": productId
            }
            getReviewList(data)
        }
    }, [productId])

    const getReviewList = async(data) => {
        await customAxios.post(`admin/Productdetails/_listallproductreview`, data)  
        .then(async response => {

            setReviewlist(response.data)
    
        })
        .catch(async error => {
            
        });
    }
    

    const renderReview = ({item}) => {
        return(
            <HStack justifyContent={"space-between"}>
                <HStack>
                <Avatar alt="person" source={require('../../Images/user.jpg')} style={{ width: 30, height: 30, marginRight: 10 }} />
                <Box alignItems={"flex-start"}>
                    <Ratings defaultRating={parseFloat(item?.Rating)} imageSize={12} />
                    <Text color={"gray.400"}>{item?.user?.Name}</Text>
                    <Text>{item?.Comment}</Text>
                </Box>
                </HStack>
                <Text fontFamily={"body"} color="gray.500" fontSize={12}>{moment(item?.ReviewedOn).format("DD-MM-YYYY") }</Text>
            </HStack>
        )
    }


    return (
        <FlatList 
            data={reviewList}
            renderItem={renderReview}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingTop: 20 }}
        />
    )
}

export default ReviewList

const styles = StyleSheet.create({})