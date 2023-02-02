import { StyleSheet } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import { Box, Image, HStack, Text, Icon, type } from 'native-base'
import Button from '../../../Components/Button'

const MembershipCard = ({title, point1, point2, point3, month, type, label, onPress, img}) => {
  return (
    <Box borderRadius={12} borderWidth={1} borderColor='gray.400' py={4} alignItems='center' mb={5}> 
        <Image source={img} size={120} alt='name'/>
        <Text color={'#005EAA'} fontWeight={500} fontSize={17}>{title}</Text>
        <Box mt={2} px={2} mr={8}>
            {point1 && <HStack >
              <Icon as = {<Entypo name='dot-single'/>}   size={6}/>
              <Text color={'#535353'} fontWeight={300} fontSize={15}>{point1}</Text>
            </HStack>}
            {point2 && <HStack >
              <Icon as = {<Entypo name='dot-single'/>}   size={6}/>
              <Text color={'#535353'} fontWeight={300} fontSize={15}>{point2}</Text>
            </HStack>}
            {point3 && <HStack>
              <Icon as = {<Entypo name='dot-single'/>}   size={6}/>
              <Text color={'#535353'} fontWeight={300} fontSize={15}>{point3}</Text>
            </HStack> }
        </Box>       

        <Text  color={'#535353'} fontWeight={500} fontSize={17} mt={2}>{month}</Text>

        <Text  color={'gray.500'} fontWeight={400} fontSize={15} mt={2}>{type}</Text>
        <Button label={label} width={'70%'} marginTop={3} onPress={onPress}/>
    </Box>
  )
}

export default MembershipCard

const styles = StyleSheet.create({})