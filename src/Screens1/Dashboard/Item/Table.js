import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { Box, HStack, ScrollView, Text, Icon, Input, FlatList } from 'native-base'
import { useTranslation } from "react-i18next";


const Table = ({Type, Category, Breed, Price, Age, ageType, Gender, Colors, Size, sizeType, City, ZipCode, Country}) => {

    const { t } = useTranslation();

  return (
    <Box borderRadius={10} borderWidth={1} my={3} borderColor='#EFEBEB'> 

        {Type && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.type")}</Text>
            </Box>
            <Box w={'50%'}>
                {Type=="" ? <Text ml={3} my={2} fontWeight={300} color='#515151'>-</Text> : <Text ml={3} my={2} fontWeight={300} color='#515151'>{Type}</Text>}
            </Box>
        </HStack>
        }  

        {Category && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.cat")}</Text>
            </Box>
            <Box w={'50%'}>
                {Category=="" ? <Text ml={3} my={2} fontWeight={300} color='#515151'>-</Text> : <Text ml={3} my={2} fontWeight={300} color='#515151'>{Category}</Text>}
            </Box>
        </HStack> 
        }  

        {City==""|| City && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB' >
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.city")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{City}</Text>
            </Box>
        </HStack>}

        {ZipCode=="" ||ZipCode  && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB' >
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.zip")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{ZipCode}</Text>
            </Box>
        </HStack>}
        
        {Breed && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.breed")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{Breed}</Text>
            </Box>
        </HStack>}

        {Country && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB' >
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.country")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{Country}</Text>
            </Box>
        </HStack>}

        {Price && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.price")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{Price}</Text>
            </Box>
        </HStack>}

        {Age=="" || Age &&<HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.age")}</Text>
            </Box>
            <Box w={'50%'}>
                {Age=="" ? <Text ml={3} my={2} fontWeight={300} color='#515151'>-</Text> : <Text ml={3} my={2} fontWeight={300} color='#515151'>{Age} {ageType}</Text>}
            </Box>
        </HStack> 
        }
        
        {Gender && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.gender")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{Gender==1 ? "Male" : "Female"}</Text>
            </Box>
        </HStack>}
        {Colors && <HStack borderBottomWidth={1} borderColor='#EFEBEB'>
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.color")}</Text>
            </Box>
            <Box w={'50%'}>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{Colors}</Text>
            </Box>
        </HStack>}

        {Size=="" || Size  && <HStack >
            <Box w={'50%'} borderRightWidth={1} borderColor='#EFEBEB'>
                <Text ml={3} my={2} fontWeight={300} color='#515151'>{t("ProductDetails.size")}</Text>
            </Box>
            <Box w={'50%'}>
                {Size=="" ? <Text ml={3} my={2} fontWeight={300} color='#515151'>-</Text> : <Text ml={3} my={2} fontWeight={300} color='#515151'>{Size} {sizeType}</Text>}
            </Box>
        </HStack> 
        }
    </Box> 
  )
}

export default Table

const styles = StyleSheet.create({})