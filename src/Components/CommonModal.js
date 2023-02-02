import { StyleSheet } from 'react-native'
import React from 'react'
import { Modal } from 'native-base'

const CommonModal = ({showModal, onClose, children, bg, borderRadius,p}) => {
  return (
    <Modal isOpen={showModal} onClose={onClose}>
        <Modal.Content  borderRadius={borderRadius}>
            <Modal.Body alignItems={'center'} bg={bg} p={p}>
                {children}
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
}

export default CommonModal

const styles = StyleSheet.create({})