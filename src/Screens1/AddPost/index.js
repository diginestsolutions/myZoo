import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text } from 'native-base'
import Button from '../../Components/Button'

const AddPost = ({navigation}) => {
  return (
    <Box  flex={1} p={4}>
      <Button label={'post new item'} onPress={()=>navigation.navigate('PostNewItem')}/>
      <Button label={'Create Accessory'} onPress={()=>navigation.navigate('CreateAccessory')} marginTop={5}/>
      <Button label={'Create Service'} onPress={()=>navigation.navigate('CreateService')} marginTop={5}/>

    </Box>
  )
}

export default AddPost

const styles = StyleSheet.create({})