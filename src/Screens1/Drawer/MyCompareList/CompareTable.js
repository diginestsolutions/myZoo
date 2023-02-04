import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text } from 'native-base'
import { useTranslation } from "react-i18next";


const CompareTable = ({mt}) => {

  const { t } = useTranslation();

  return (
    <Box width={170} height={350} m={1} mt={mt}  borderWidth={1} borderColor={'gray.400'} justifyContent='space-between'>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text  p={2} fontWeight={300}>{t("CompareItems.custRat")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.price")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.cat")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.breed")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.gen")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.age")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.weight")}</Text>
        </Box>
        <Box borderBottomWidth={1} borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.sellNme")}</Text>
        </Box>
        <Box  borderColor={'gray.400'}>
            <Text borderBottomWidth={1} borderColor={'gray.400'} p={2} fontWeight={300}>{t("CompareItems.loc")}</Text>        
        </Box>
    </Box>          

  )
}

export default CompareTable

const styles = StyleSheet.create({})