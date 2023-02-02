import { StyleSheet } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'

import { Box, Image, HStack, Text, Icon, type, useToast } from 'native-base'
import Button from '../../Components/Button'
import { IMAGE_URL } from '../../config/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../Redux/constants/homeConstant'
import customAxios from '../../CustomAxios'
import { useNavigation } from '@react-navigation/native'

const MembershipCard = ({ label, item }) => {

	const { userData } = useSelector(state => state.auth)

	const navigation = useNavigation()

	const toast = useToast()

	const dispatch = useDispatch()

	const purchaseMemberShip = async(id) => {

		let data = {
			UserId: userData?.id,
			MembershipId: id
		}

		dispatch({
            type: LOADING,
            payload: true
        })

		await customAxios.post(`Front_End/CartMob/hyper_membership`, data)  
        .then(async response => {

            navigation.navigate('Payment', { id: response.data.id, mode: 'membership', membershipId: id })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {

            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.400'
            })
    
            dispatch({
                type: LOADING,
                payload: false
            })
        });

	}

	return (
		<Box borderRadius={12} borderWidth={1} borderColor='gray.400' py={4} alignItems='center' mb={5} w="98%">
			<Image source={{ uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}` }} size={120} alt='name' resizeMode='contain' />
			<Text color={'#005EAA'} fontWeight={500} fontSize={17}>{item?.Name}</Text>
			<Box mt={2} px={2} mr={8}>
				{item?.Conditions?.map((point, index) => (
					<HStack key={index}>
						<Icon as={<Entypo name='dot-single' />} size={6} />
						<Text color={'#535353'} fontWeight={300} fontSize={15}>{point?.Condition}</Text>
					</HStack>
				))}
			</Box>

			<Text color={'#535353'} fontWeight={500} fontSize={17} mt={2}>{item?.Duration}</Text>

			<Text color={'gray.500'} fontWeight={400} fontSize={15} mt={2}>{item?.Price == 0 ? 'Free' : item?.Price}</Text>
			<Button label={label} width={150} marginTop={3} onPress={() => purchaseMemberShip(item?._id) } />
		</Box>
	)
}

export default MembershipCard

const styles = StyleSheet.create({})