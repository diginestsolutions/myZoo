import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Pressable, Modal, Text, Icon, FlatList } from 'native-base'
import { IMAGE_URL } from '../config/Constants'
import Flags from '../Pages/Currency/Flags'
import { useDispatch, useSelector } from 'react-redux'
import { countriesList } from '../Redux/actions/authAction'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'


const CountryPicker = ({ label, onSelectCountry }) => {

    const [selectedCountry, setSelectedCountry] = useState([])
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch()

    const { countryList } = useSelector(state => state.auth)

    useEffect(() => {
        if(!countryList){
            dispatch(countriesList())
        }
        
        
    }, [])

    const renderItems = ({item}) => {
        
        return(
            <Flags 
                image={{ uri: `${IMAGE_URL}${item?.Flag?.UploadedFileName}` }} 
                country={item.Country}
                code={item.CountryCode}
                onPress={()=>{
                    setSelectedCountry(item)
                    setShowModal(false)
                    onSelectCountry(item?._id)
                }}
            />                
        )
    }

    return (
        <>
            <Text 
                color={'#535353'} 
                ml={2} 
                mt={2} 
                mb={-1} 
                fontWeight={500} 
                fontSize={13} 
                fontFamily='body'
            >
                {label}
            </Text>
            <Pressable 
                borderWidth={1} 
                borderColor='#00000029'
                justifyContent={'space-between'} 
                flexDir='row' 
                alignItems={'center'}
                borderRadius={4} pr={2} mt={2} pl={2.5}
                minH={35}
                onPress={() => setShowModal(true)}
            >
                <Text color='gray.400' fontWeight={200} fontFamily='body'  fontSize={13}>{selectedCountry?.Country ? selectedCountry?.Country : 'Select Country'}</Text>
                <Icon as={<Ionicons/>} name={'chevron-down'} color="#3D3D3DAC" size={22}/>
            </Pressable>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Select Country</Modal.Header>
                <Modal.Body>
                    <FlatList 
                        data={countryList}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItems}
                    />
                </Modal.Body>
                </Modal.Content>
            </Modal>
        </>
    )
}

export default CountryPicker

const styles = StyleSheet.create({})