import { StyleSheet } from 'react-native'
import React from 'react'
import { Box } from 'native-base'

const CommonBackground = ({children}) => {
  return (
    
    <Box bg='#fff' flex={1}>
        <Box 
            height={21} 
            bg={{
                linearGradient: {
                    colors: ['#005EAA', '#008BFC'],
                    start: [0, 0],
                    end: [1, 0],
                },
            }}
        />
        <Box bg={'#fff'} flex={1} borderTopRadius={25} mt={-5}>
            {children}
        </Box>
    </Box>
    
  )
}

export default CommonBackground

const styles = StyleSheet.create({})