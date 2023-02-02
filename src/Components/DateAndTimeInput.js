import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, HStack, Pressable, ScrollView, Text, View } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DateAndTimeInput = ({openCalendar, label, dateAndTime}) => {

    const { width, height } = useWindowDimensions()


  return (
    <Box  alignSelf='center'>    
        <Pressable
            onPress={openCalendar}
            width={width-24} 
            mt={3}
            height={37}
            borderRadius={5}
            flexDirection="row"
            alignItems={'center'}
            px={3}
            justifyContent='space-between'
            borderWidth={1}
            borderColor={'#00000029'}
        >
        
            <Text textAlign={'center'} fontWeight={200} fontFamily="body" color={"#000"} fontSize={12}>End Date {dateAndTime? dateAndTime : "DD/MM/YYYY"}</Text>
            <Ionicons 
                name={'ios-calendar-outline'} 
                size={20} color={"#000"} 
            />
            
        </Pressable>

    </Box>
  )
}

export default DateAndTimeInput

const styles = StyleSheet.create({})