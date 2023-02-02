import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, CheckIcon, Center, Select, Text } from 'native-base'
import { Controller } from "react-hook-form";


const SelectNew = ({placeholder, options, optlabel, optValue, mt, borderColor, textColor, control, fieldName, error, changeValue, defaultValue}) => {
    return (
        <Center mt={mt}>
            <Box w="100%">
            <Controller
                name={fieldName}
                control={control}
                rules={{ required: true }}
                render={({field:  {onChange, value} }) => <Select 
                    defaultValue={defaultValue}
                    selectedValue={value}
                    borderColor={borderColor}
                    mt={1}
                    accessibilityLabel={placeholder}
                    placeholder={placeholder} 
                    placeholderTextColor={textColor}
                    _selectedItem={{
                        bg: "gray.300",
                        endIcon: <CheckIcon size="5"  />
                    }} 
                    onValueChange={(itemValue) => {
                        onChange(itemValue);
                        if(changeValue){
                            changeValue(itemValue)
                        }
                        
                    }}
                >
                    {options && options.map((opt, index) => (
                        <Select.Item key={index} label={opt[optlabel]} value={opt[optValue]} />
                    ))}
                </Select>}
            />
            {error && <Text fontSize={12} color="error.500">{error?.message}</Text>}
            </Box>
        </Center>
    )
}

export default SelectNew

const styles = StyleSheet.create({})