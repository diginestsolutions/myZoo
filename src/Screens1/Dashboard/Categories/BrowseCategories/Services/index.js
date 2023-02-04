import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, FlatList, HStack, Image, Pressable, useToast } from 'native-base'
import ServiceCard from '../../../Services/ServiceCard'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_SERVICE } from '../../../../../Redux/constants/homeConstant'
import { useNavigation } from '@react-navigation/native'

const Services = ({}) => {

    const navigation = useNavigation();

    const { services, error } = useSelector(state => state.home)
    const { width } = useWindowDimensions()


    const renderItems = ({item}) => (
        <Box w={width/2}>
          <ServiceCard 
              onPress={()=>navigation.navigate('ServiceSubCategory',{service: item.title})}
              mx={4}
              title={item.Name}
              item={item}
          />
        </Box>
    )



  return (
    <Box flex={1} bg='#fff' alignItems='center'>
      <FlatList 
            data={services}
            keyExtractor={(item) => item._id}
            renderItem={renderItems}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    </Box>
  )
}

export default Services

const styles = StyleSheet.create({})