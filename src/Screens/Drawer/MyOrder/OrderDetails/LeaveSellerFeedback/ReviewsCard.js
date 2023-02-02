import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Image, Box, Text, Avatar, FlatList, Pressable } from 'native-base'
import Ratings from '../../../../Dashboard/Item/Ratings'

const ReviewsCard = ({onPress}) => {

    const datas = [
        {   id: 1, 
            time:"12:40 AM",
            discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',           
            date:'08/06/2020',
            name:'Muhammed Raheem'
        },
        {   id: 2, 
            time:"Yesterday",
            discription:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',           
            date:'08/06/2020',
            name:'Muhammed Raheem'

        },
       
    
         
    ]

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
                    <Image                
                        source={require('../../../../../Images/user.jpg')} 
                        h={44} w={44} alt="image" borderRadius={22}
                    />
                </Box>
                

                <Box mx={2} >  

                    <Box alignItems={'flex-start'} ml={2}>
                        <Ratings imageSize={16}/>
                    </Box>
                    <HStack justifyContent={'space-between'} >
                        <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} ml={2}>by {item.name}</Text>
                        <Text color={'#B4B4B4'} fontWeight={400} fontFamily="body" fontSize={14} >{item.date}</Text>
                    </HStack>
                    <Box w='98%' mt={1}>
                        <Text color={'#535353'} fontWeight={200} fontFamily="body" fontSize={12} ml={2}>{item.discription}</Text>
                    </Box>
                </Box>
                
                
                             
                
            </HStack>
        )
    }


  return (
    <FlatList 
        data={datas}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
    />  
  )
}

export default ReviewsCard

const styles = StyleSheet.create({})