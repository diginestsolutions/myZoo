import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Icon, Pressable, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const OrderSuccess = () => {
    return (
        <Box 
            flex={1} 
            bg={{
                linearGradient: {
                    colors: ["#1A73BA", "#66BE80"],
                    start: [1, 1],
                    end: [1, 0],
                },
            }}
            px={5}
        >

        <Icon as={<Ionicons />} name={'md-checkmark-circle'} color="#fff" size={70} mt={40} alignSelf='center'/>



        <Text textAlign={'center'} color={"#fff"} fontWeight={600} fontFamily={'body'} fontSize={17}>Success</Text>

        <Text textAlign={'center'} color={"#fff"} fontWeight={400} fontFamily={'body'} fontSize={14} my={5}>Order placed successfully. To see more details go to your orders page.
        </Text>


        <Pressable bg='#fff' borderRadius={5} alignItems='center' justifyContent={'center'} mt={5} height={45}>
            <Text color={"#1A73BA"} fontWeight={500} fontFamily={'body'} fontSize={16} >View order details</Text>
        </Pressable>
            
        </Box>
    )
}

export default OrderSuccess

const styles = StyleSheet.create({})