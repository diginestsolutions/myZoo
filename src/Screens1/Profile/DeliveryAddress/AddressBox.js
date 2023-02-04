import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Box, Text, Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'


const AddressBox = ({ item, mt, selected, onChanged}) => {
  
  return (
    <HStack 
        alignItems={'center'} justifyContent='space-between'  
        pb={1.5} mt={mt} borderBottomWidth={1} borderColor='gray.300'
    > 
        <Box flex={0.9}>
            <Text fontWeight={400} color={'#000'} fontSize={15} mt={3}>{item.Name}</Text>
            <Text fontWeight={200} color='#3D3D3D' fontSize={13} mt={1}>{item.HouseName}</Text>
            <HStack>
                <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{item.Area}, </Text>
            </HStack>
            <HStack>
                <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{item.stat.StateName}, </Text>
                <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{item.PostalCode}</Text>
            </HStack>
            
            <Text fontWeight={200} color='#3D3D3D' fontSize={13}>{item.Country}</Text>
        </Box>
        <Box flex={0.2} alignItems='flex-end'>
            <Icon 
                onPress={onChanged} 
                as={<Ionicons name={ selected === item?._id ? "ios-checkmark-circle" : "ellipse-outline"} />} 
                color={ selected === item?._id ? "#005EAA" : 'gray.500'}
                size={25}
            />
        </Box>
        
        
    </HStack>
  )
}

export default AddressBox

const styles = StyleSheet.create({})