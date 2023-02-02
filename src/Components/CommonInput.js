import { StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Input, Icon, Text, InputGroup } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'

const CommonInput = ({placeholder, mt, width, keyboardType, inputType, topLabel, iconName, onPress, height, control, fieldName, error, ml, numLines }) => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show);

  return (
    <>
        { topLabel && <Text color={'#535353'} ml={2} mt={2} mb={1} fontWeight={200} fontSize={13} fontFamily='body'>{topLabel}</Text>}

        <Controller
            control={control}
            rules={{
                required: true,
            }}   
        
            render={({ field: { onChange, onBlur, value  } }) => (
            
                <Input 
                    
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeholder}
                    fontFamily={"body"} 
                    fontWeight={400} 
                    placeholderTextColor='#B4B4B4'
                    numberOfLines={numLines}
                    mt={mt}
                    ml={ml}
                    h={height}
                    rightElement={ inputType === "password" ? <Icon as={<Ionicons />} name={show ? "eye-off-outline": "eye-outline" } color={show ? 'red.600' : "#008ECC" } size={4} mr={3} onPress={handleClick}/> : <Icon as={<Ionicons />} name={iconName} color="#535353" size={5} mr={3} onPress={onPress}/>} 
                    
                    
                                
                    type ={inputType === "password"  ?  show ? "text" : "password" : ''}    
                    
                    width={width}  
                    fontSize={14}    
                    keyboardType={keyboardType} 
                />
            )}
            name={fieldName}
        /> 
        {error && <Text fontFamily={"body"} fontWeight="bold" color={"red.500"}  ml={2}>{error?.message}</Text>}

    </>

  )
}

export default CommonInput

const styles = StyleSheet.create({})

