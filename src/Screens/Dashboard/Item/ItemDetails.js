import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Text } from 'native-base'
import { useTranslation } from "react-i18next";


const ItemDetails = ({age, weight, size, gender, ageType, weightType, sizeType}) => {
    const { t } = useTranslation();

  return (

    <HStack  justifyContent={'space-between'} mt={2}>
        <Box width={70} height={70} borderRadius={5} borderWidth={1} borderColor={'#E5E5E5'} bg='#F2F2F2' alignItems={'center'} justifyContent={'center'}>
            <Text color={'#B0B0B0'} fontSize={12} fontWeight={400}>{t("ProductDetails.age")}</Text>
            {age && <Text fontSize={13} fontWeight={500} color='#3D3D3D'>{age}{ageType}</Text>}
        </Box>
        <Box width={70} height={70} borderRadius={5} borderWidth={1} borderColor={'#E5E5E5'} bg='#F2F2F2' alignItems={'center'} justifyContent={'center'}>
            <Text color={'#B0B0B0'} fontSize={12} fontWeight={400}>{t("ProductDetails.weight")}</Text>
            {weight && <Text fontSize={13} fontWeight={500} color='#3D3D3D'>{weight}{weightType}</Text>}
        </Box>
        <Box width={70} height={70} borderRadius={5} borderWidth={1} borderColor={'#E5E5E5'} bg='#F2F2F2' alignItems={'center'} justifyContent={'center'}>
            <Text color={'#B0B0B0'} fontSize={12} fontWeight={400}>{t("ProductDetails.size")}</Text>
            {size && <Text fontSize={13} fontWeight={500} color='#3D3D3D'>{size}{sizeType}</Text>}
        </Box>
        <Box width={70} height={70} borderRadius={5} borderWidth={1} borderColor={'#E5E5E5'} bg='#F2F2F2' alignItems={'center'} justifyContent={'center'}>
            <Text color={'#B0B0B0'} fontSize={12} fontWeight={400}>{t("ProductDetails.sex")}</Text>
            {gender && <Text fontSize={13} fontWeight={500} color='#3D3D3D'>{gender==1 ? "Male" : "Female"}</Text>}
        </Box>
    </HStack>

  )
}

export default ItemDetails

const styles = StyleSheet.create({})