import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Image, Box, Text, Avatar, Pressable } from 'native-base'
import { IMAGE_URL } from '../../config/Constants'
import moment from 'moment'
import { isString } from 'lodash'

const ChatCard = ({onPress, item}) => {   

  
        
    return(
        <Pressable 
            flexDirection={'row'}
            alignItems='center'
            minHeight={60}
            px={3}
            onPress={onPress}
        >   
            <Box>
                <Image                
                    source={ item?.opponent?.[0]?.UserProfile?.length > 0 ? { uri: `${IMAGE_URL}${item?.opponent?.[0]?.UserProfile?.[0]?.Image?.[0]?.UploadedFileName}` } : require('../../Images/user.jpg') } 
                    h={44} w={44} alt="image" borderRadius={22}
                />
            </Box>
            <HStack alignItems={'center'} borderBottomWidth={1} borderColor='#00000029' pb={3} mt={3} mx={6}>

                <Box mx={2} flex={0.65} ml={-2} >                    
                    <Text color={'#3D3D3D'} fontWeight={400} fontFamily="body" fontSize={14} ml={2}>{item?.opponent?.[0]?.UserProfile.length > 0 ? item?.opponent?.[0]?.UserProfile?.[0]?.FirstName : 'Admin'}</Text>
                    <Text color={'#535353'} fontWeight={200} fontFamily="body" fontSize={12} ml={2}>{ isString(item?.lastMessage) ? item?.lastMessage: item?.lastMessage?.name}</Text>             
                </Box>
                <Box  flex={0.3} alignItems='flex-end' mr={-3}>
                    <Text color={'#535353'} fontWeight={200} fontFamily="body" fontSize={12} ml={2}>{moment(item?.date, "DD-MM-YYYY HH:mm:ss").fromNow() }</Text>
                
                </Box>
            
            </HStack>                  
            
        </Pressable>
    )
}


export default ChatCard

const styles = StyleSheet.create({})