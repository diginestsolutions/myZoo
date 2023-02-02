import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, TextArea } from 'native-base'
import { Controller } from 'react-hook-form'

const TextAreaInput = ({placeholder, fieldName, control, error}) => {
  return (
    <Box alignItems="center" w="100%">
        <Controller
            control={control}
            rules={{
                required: true,
            }}   
        
            render={({ field: { onChange, onBlur, value  } }) => (
            <TextArea 
                onChangeText={onChange}
                value={value}
                h={20} 
                placeholder={placeholder} w="100%" 
                onBlur={onBlur}
            />
            )}
            name={fieldName}
        /> 
        {error && <Text fontFamily={"body"} fontWeight="bold" color={"red.500"}  ml={2}>{error?.message}</Text>}
    </Box>
  )
}

export default TextAreaInput

const styles = StyleSheet.create({})