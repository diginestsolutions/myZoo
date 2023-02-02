import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Pressable, Image, Icon } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from "react-i18next";
import reactotron from 'reactotron-react-native';
import { IMAGE_URL } from '../../config/Constants';


const AddImage = ({onPress, image, video, NoOfImage, NoOfVideo, imageArray}) => {

  const { t } = useTranslation();

  return (
    <Pressable  borderWidth={1} p={3} borderRadius={4} borderColor='gray.300'>
        <Text fontSize={16}color={'gray.600'} fontFamily='body' fontWeight={200}>{t("PostNewItem.imgVdo")}</Text>
        <Box flexDir={"row"}>
            {imageArray?.map((img, index) =>  <Image key={index} source={{ uri: `${IMAGE_URL}${img.ClientFileName}`  }} height={75} width={75} m={2} resizeMode="cover" alt="image" />)}
            {image && image?.map((img, index) =>  <Image key={index} source={{ uri: img.uri }} height={75} width={75} m={2} resizeMode="cover" alt="image" />)}
            {video && video?.map(vi => <Box height={75} width={75} justifyContent="center" alignItems={"center"} shadow={1} borderWidth={0.5} margin={1}><FontAwesome name='video-camera' color={'#000'} size={25}/></Box>)}
        </Box>
        <Pressable 
            onPress={onPress}
            bg='blue.100' width={75} height={75} my={3} 
            alignItems={'center'} justifyContent={'center'}
        >
            <FontAwesome name='camera' color={'#000'} size={25}/>
            <Text fontSize={10}color={'blue.700'} mt={2} fontFamily='body' fontWeight={200}>{t("PostNewItem.addImg")}</Text>
        </Pressable>
        <Text fontSize={12}color={'gray.600'} fontWeight={200} fontFamily='body'>{`You can add upto ${NoOfImage} images and ${NoOfVideo} videos`}</Text>
    </Pressable>
  )
}

export default AddImage

const styles = StyleSheet.create({})