import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, ScrollView, Text, HStack, useToast } from 'native-base'


const ShippingAddress = () => {
  return (
    <Box>
        <Text fontWeight={400} color={'#000'} fontSize={15} mt={3}>Amal</Text>
        <Text fontWeight={200} color='#3D3D3D' fontSize={13} mt={1}>Abc</Text>
        <HStack>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>xwe, </Text>
        </HStack>
        <HStack>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>ddf, </Text>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>34535</Text>
        </HStack>
        <Text fontWeight={200} color='#3D3D3D' fontSize={13}>dff</Text>
    </Box>
  )
}

export default ShippingAddress

const styles = StyleSheet.create({})