import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, Text, Spinner, Modal } from 'native-base'

const Loader = () => {
	return (
		<Box 
			width={45} height={45} bg='#fff' position={'absolute'} 
			alignSelf='center' alignItems={'center'} 
			justifyContent='center' borderRadius={10} shadow={2} top={200}
		>
			<Spinner color={'#86fafc'} size={25}/>
		</Box>
	)
}

export default Loader

const styles = StyleSheet.create({})