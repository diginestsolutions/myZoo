import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, ScrollView, Text, HStack, useToast } from 'native-base'


const ShippingAddress = ({address}) => {
  return (
    <Box>
        <Text fontWeight={400} color={'#000'} fontSize={15} mt={3}>{address?.Name}</Text>
        <Text fontWeight={200} color='#3D3D3D' fontSize={13} mt={1}>{`${address?.HouseName} ${address?.HouseNo}`}</Text>
        <HStack>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{address?.Area}</Text>
        </HStack>
        <HStack>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{address?.LandMark}</Text>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{address?.TownCity}</Text>
        </HStack>
        {/* <Text fontWeight={200} color='#3D3D3D' fontSize={13}>dff</Text> */}
    </Box>
  )
}

export default ShippingAddress

const styles = StyleSheet.create({})