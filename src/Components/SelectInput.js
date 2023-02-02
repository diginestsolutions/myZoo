import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, CheckIcon, Center, Select } from 'native-base'


const SelectInput = ({placeholder, changeValue, selectedValue, options, optlabel, optValue, mt, borderColor, textColor}) => {

  return (
    <Center mt={mt}>
        <Box w="100%">
            <Select 
                borderColor={borderColor}
                mt={1}
                selectedValue={selectedValue}  
                accessibilityLabel={placeholder}
                placeholder={placeholder} 
                placeholderTextColor={textColor}
                
                _selectedItem={{
                    bg: "gray.300",
                    endIcon: <CheckIcon size="5"  />
                }} 
                onValueChange={itemValue => changeValue(itemValue)}
            >
                {options && options.map((opt, index) => (
                    <Select.Item key={index} label={opt[optlabel]} value={opt[optValue]} />
                ))}
            </Select>
        </Box>
    </Center>
  )
}

export default SelectInput

const styles = StyleSheet.create({})