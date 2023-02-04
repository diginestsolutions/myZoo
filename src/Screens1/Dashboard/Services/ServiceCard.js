import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import ImageTextCard from '../ImageTextCard'
import { Text, Image } from 'native-base'
import { IMAGE_URL } from '../../../config/Constants'

const ServiceCard = ({item, onPress, mx, title }) => {
  const { width, height } = useWindowDimensions()

  return (
    <ImageTextCard 
        onPress={onPress}
        width={width/2-30} 
        mx={mx}
    >
        <Image 
            source={{ uri: `${IMAGE_URL}${item?.images?.UploadedFileName}` }}
            h={120} alt="image" borderTopRadius={10} 
        />
        <Text textAlign={'center'} fontWeight={400} fontFamily={'body'} fontSize={16} my={1} color='#535353'>{title}</Text>                                    

    </ImageTextCard>        
  )
}

export default ServiceCard

const styles = StyleSheet.create({})