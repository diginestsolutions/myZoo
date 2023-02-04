import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, Select, CheckIcon, Center, } from 'native-base'


const SelectLanguage = () => {
    let [language, setLanguage] = useState("");
  return (
    <Center>
        <Box w="70" >
            <Select selectedValue={language}  
            accessibilityLabel="Language" placeholder="" _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
            }}  onValueChange={itemValue => setLanguage(itemValue)}>
            <Select.Item label="EN" value="en" />
            <Select.Item label="FR" value="fr" />
            <Select.Item label="SA" value="sa" />
            <Select.Item label="ML" value="ml" />

            </Select>
        </Box>
    </Center>
  )
}

export default SelectLanguage

const styles = StyleSheet.create({})