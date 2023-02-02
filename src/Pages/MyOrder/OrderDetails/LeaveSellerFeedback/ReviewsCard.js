import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Image, Box, Text, Avatar, FlatList, Pressable } from 'native-base'
import Ratings from '../../../ProductDetails/Ratings'
import { IMAGE_URL } from '../../../../config/Constants'

const ReviewsCard = ({reviewList}) => {

    const renderImage = (item) => {
        if(item?.UserType === 4){
            if(item?.Profile?.length > 0){
                return(
                    <Image                
                        source={{ uri: `${IMAGE_URL}${item?.Profile?.[0]?.Image?.[0]?.UploadedFileName}` }} 
                        h={44} w={44} alt="image" borderRadius={22}
                    />
                )
            }
            else{
                return(
                    <Image                
                        source={require('../../../../Images/user.jpg')} 
                        h={44} w={44} alt="image" borderRadius={22}
                    />
                )
            }
            
        }
        else{
            return(
                <Image                
                    source={require('../../../../Images/user.jpg')} 
                    h={44} w={44} alt="image" borderRadius={22}
                />
            )
        }
        
    }

    const renderName = (item) => {
        if(item?.UserType === 4){
            if(item?.Profile?.length > 0){
                return(
                    <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} ml={2}>by {`${item?.Profile?.[0]?.FirstName} ${item?.Profile?.[0]?.LastName}`}</Text>
                )
            }
            else{
                return(
                    <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} ml={2}>by {item?.user?.Name}</Text>
                )
            }
        }
        else{
            return(
                <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} ml={2}>by {item?.user?.Name}</Text>
            )
        }
    }

    const renderItems = ({item}) => {
        
        return(
            <HStack                 
                minHeight={60}
                px={3}
                borderBottomWidth={0.5}
                pb={2}
                borderColor='#B4B4B4'
            >   
                <Box mt={5}>
                    {renderImage(item)}
                    
                </Box>
                

                <Box mx={2} >  

                    <Box alignItems={'flex-start'} ml={2}>
                        <Ratings imageSize={16} defaultRating={item?.Rating} readonly />
                    </Box>
                    <HStack justifyContent={'space-between'} >
                        {renderName(item)}
                        
                        <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} >{item.date}</Text>
                    </HStack>
                    <Box w='98%' mt={1}>
                        <Text color={'#535353'} fontWeight={200} fontFamily="body" fontSize={12} ml={2}>{item.Comment}</Text>
                    </Box>
                </Box>
                
                
                             
                
            </HStack>
        )
    }


  return (
    <FlatList 
        data={reviewList}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
    />  
  )
}

export default ReviewsCard

const styles = StyleSheet.create({})