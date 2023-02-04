import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Icon, HStack, Input, Pressable } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useTranslation } from "react-i18next";


const Search = ({onPress}) => {

  const { t } = useTranslation();

  return (
    <Pressable
        onPress={onPress} 
        flexDir="row"
        shadow={1} 
        borderRadius={15} 
        width={'93%'} 
        bg="#fff"
        height={49}         
        mt={-5}
        alignSelf='center'
        alignItems='center'
        paddingX={3}
        mb={0.5}
        position="absolute"
        top={83}
        zIndex={100}
    >
        <Icon as={<Fontisto/>} name='search' color='#1A73BA' size={17}/>
        
        <Input 
            placeholder={t("Dashboard.search")} 
            w={'50%'} borderColor='transparent' flex={1}
            variant="unstyled"
            isDisabled
            
        />
        
        <Icon as={<FontAwesome/>} name='navicon' color='#1A73BA' size={17} onPress={onPress}/>
    
    </Pressable>
    
  )
}

export default Search

const styles = StyleSheet.create({})