import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { Text, Icon, Pressable, Select, CheckIcon, Box } from 'native-base'

const SelectLanguage = ({ text, onPress, marginTop, rightText, icon, iconName, mb }) => {

    const [language, setLanguage] = useState("ENGLISH");

    const { width, height } = useWindowDimensions()

    return (
        <Pressable 
            marginY={1.5}
            // onPress={onPress}
            flexDir={"row"} 
            alignItems="center" 
            mt={marginTop}
            mb={mb}
            bg='#fff'
        >   
        
            <Icon as={icon} name={iconName} color={"#008ECC"} ml={7} size={19} />
     
            <Box width={width/2.8}  ml={3.5}>
                <Text color={"#008ECC"} fontWeight={400} textAlign="left"  fontSize={14} fontFamily='body'>{text}</Text>
            </Box>
            <Box>

                <Select 
                    fontWeight={400}
                    fontSize={14}
                    color={'#B4B4B4'}
                    borderColor={'#fff'}
                    selectedValue={language} 
                    placeholder={language}
                    minWidth="200" 
                    accessibilityLabel="Language" 
                    _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} 
                    onValueChange={itemValue => setLanguage(itemValue)}
                >
                    <Select.Item label="ENGLISH" value="ENGLISH" />
                    <Select.Item label="ARABIC" value="ARABIC" />
                    
                </Select>

            </Box>
            


        
        </Pressable>
    )
}

export default SelectLanguage

const styles = StyleSheet.create({})