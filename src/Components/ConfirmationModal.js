import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { HStack, Box, Modal, Text, Pressable } from 'native-base'

const ConfirmationModal = ({isVisible, onClose, yes, no }) => {
    
  const { width, height } = useWindowDimensions()

const [showModal, setShowModal] = useState(false);


  return (
    <Modal isOpen={isVisible} onClose={onClose}>
        <Box  bg={'#fff'} borderRadius={5}>
            <Text textAlign={'center'} fontWeight={400} fontFamily="body" color='#000' fontSize={14} mt={2}>Confirm Logout</Text>
            <Text textAlign={'center'} fontWeight={100} fontFamily="body" color='#000' fontSize={14} m={3}>Are you sure, do you want to logout?</Text>
            <HStack borderColor={'#F4F4F4'} borderTopWidth={0.5}>
                <Pressable 
                    onPress={yes}
                    flex={0.5} alignItems={'center'} justifyContent='center' 
                    borderRightWidth={0.5} borderColor={'#F4F4F4'}
                >
                    <Text color={'#008ECC'} fontWeight={400} fontFamily="body" fontSize={14} py={2}>YES</Text>
                </Pressable>
                <Pressable 
                    onPress={no}
                    flex={0.5} alignItems={'center'} justifyContent='center'
                >
                    <Text color={'#008ECC'} fontWeight={400} fontFamily="body" fontSize={14} >NO</Text>
                </Pressable>
            </HStack>
        </Box>
    </Modal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({})
