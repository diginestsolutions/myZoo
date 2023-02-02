import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Input, Avatar, FlatList } from 'native-base'

const Conversation = () => {

    const datas = [
        {   id: 1, 
            receive:'Is the bus late today?',
            receiveTime:"8:30 AM, Today",           
            send:'Hiii',
            sendTime:'8:32 AM, Today'
        },
        {   id: 2, 
            receive:'Is the bus late today?', 
            receiveTime:"8:50 AM, Today",          
            send:'Yes mam, 5 mins late due to traffic block',
            sendTime:'9:00 AM, Today'
        },       
    ]      

    const renderItems = ({item}) => {    
    return(
        <>
            <Box alignItems={'center'}my={2}>
                <Box alignSelf={'flex-start'} bg='#00000029' borderTopRadius={15} borderBottomRightRadius={15} p={2}>
                    <Text color={'#0A2638'} fontWeight={200} fontFamily="body" fontSize={14} >{item.receive}</Text>
                    <Text color={'#707070'} fontWeight={200} fontFamily="body" fontSize={11} alignSelf={'flex-end'} >{item.receiveTime}</Text>

                </Box>
                
            </Box>

            <Box alignItems={'center'} my={2}>
                <Box alignSelf={'flex-end'} bg='#A0D5F5'  borderTopRadius={15} borderBottomLeftRadius={15} p={2}>
                    <Text color={'#0A2638'} fontWeight={200} fontFamily="body" fontSize={14} >{item.send}</Text>
                    <Text color={'#707070'} fontWeight={200} fontFamily="body" fontSize={11} alignSelf={'flex-end'} >{item.sendTime}</Text>
                </Box>
                
            </Box>
        </>
        
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

export default Conversation

const styles = StyleSheet.create({})