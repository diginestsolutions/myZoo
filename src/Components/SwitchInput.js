import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Switch, HStack, Text } from 'native-base'
import reactotron from 'reactotron-react-native'

const SwitchInput = ({ fieldName, control, label, changeValue }) => {
    return (
        <HStack alignItems='center' mt={3}>
            <Text fontWeight={500} color='#515151' mr={4} ml={1} fontFamily='body'>{label}</Text>
            <Controller
                control={control}
                render={({ field: {onChange, value} }) => (
                    <Switch
                        onToggle={(val) => {
                            onChange(val)
                            changeValue(val)
                        }}
                        isChecked={value}
                        defaultIsChecked={true}
                    />
                )}
                name={fieldName}
                defaultValue={true}
            />
        </HStack>
    )
}

export default SwitchInput

const styles = StyleSheet.create({})