import React, { useState } from 'react'
import { HStack, Text, Switch } from 'native-base'
import reactotron from 'reactotron-react-native'
//import { Switch } from 'react-native'


const Toggle = ({ enable, onValueChange, label, mb, value }) => {

  const [checked, setChecked] = useState(enable)

  // const onChangeSwitch = (value) => {
  //   setChecked(value);
  //   onChange(value)
  // }
    
  return (   
    <HStack alignItems='center' mt={3} mb={mb}>
        <Text fontWeight={500} color='#515151' mr={4} ml={1} fontFamily='body'>{label}</Text>
        <Switch  
          onToggle={onValueChange} 
          isChecked={value} 
          size="sm" 
        />
        {/* <Switch
            onThumbColor={'#48A750'}
            onTrackColor={'#B7FFBD'}
            offThumbColor={'#B7B7B7'}      
            offTrackColor={'#E5E5E5'}
            onValueChange={onValueChange}
            value={value}
            style={{ height: 10 }}
        />   */}
    </HStack> 
  )
}
export default Toggle

