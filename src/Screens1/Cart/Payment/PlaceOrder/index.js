import { StyleSheet, useWindowDimensions, ImageBackground } from 'react-native'
import React, {useState} from 'react'
import { Box, HStack, ScrollView, Text, Icon, Checkbox } from 'native-base'

import { useTranslation } from "react-i18next";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CommonBackground from '../../../../Components/CommonBackground';
import Heading from '../../../../Components/Heading';
import Button from '../../../../Components/Button';
import PaymentInfoCard from '../../../Drawer/MyOrder/OrderDetails/PaymentInfoCard';
import ShippingAddress from '../../../Drawer/MyOrder/ShippingAddress';
import OrderSummeryCard from '../../../Drawer/MyOrder/OrderDetails/OrderSummeryCard';
import Title from '../../../Drawer/MyOrder/Title';
import CommonSubtitle from '../../../Auth/CommonSubtitle';


const PlaceOrder = ({navigation}) => {

    const [toggleCheckBox, setToggleCheckBox] = useState('');


  const { t } = useTranslation();
  const { width, height } = useWindowDimensions()

  return (
    <>
  
    <CommonBackground>
        <ScrollView>
            <Heading label={'Place Order'}/>

            <Box px={4}>

                <Title label={'Order Now'}/>


                <HStack borderWidth={1} borderColor={'#00000028'}  my={3} p={2} alignItems='center'>
                    <Icon as={<MaterialCommunityIcons />} name={'bell-ring'} color="#008ECC" size={5} mx={3} />

                    <Checkbox value={toggleCheckBox} colorScheme="info" onChange={(newValue) => setToggleCheckBox(newValue)}/>
                    <Box w={'75%'} ml={2}>
                        <Text fontWeight={200} fontFamily="body" color='#008ECC' fontSize={11}>check this box to default to these delivery options in the future</Text>
                    </Box>
                </HStack>



                <Box borderWidth={1} borderColor={'#00000028'}  mt={3} p={2}>
                    <Box >
                        <Text fontFamily="body" fontWeight={400} fontSize={13} color='#515151'>{'Shipping to: Aneed, Al Harshplanet view, Calicut'}</Text>
                        <Text fontFamily="body" fontWeight={200} fontSize={13} color='#515151' >Estimated delivery: 13 oct 2020-20 oct 2020</Text>
                    </Box>
                </Box>




                


                <OrderSummeryCard/>

                <HStack borderWidth={1} borderColor={'#00000028'}  my={3} p={2} alignItems='center' justifyContent={'space-between'}>
                    <Box >
                        <Text fontFamily="body" fontWeight={200} fontSize={13} color='#515151'>{'Pay With'}</Text>
                        <Text fontFamily="body" fontWeight={500} fontSize={13} color='#515151' >Visa ending in 8907</Text>
                    </Box>
                    <Icon as={<Ionicons />} name={'chevron-forward'} color="#535353" size={5} ml={3} />
                </HStack>

                <HStack borderWidth={1} borderColor={'#00000028'}  my={3} p={2} alignItems='center' justifyContent={'space-between'}>
                    <Box >
                        <Text fontFamily="body" fontWeight={200} fontSize={13} color='#515151'>{'Delivery to'}</Text>
                        <Text fontFamily="body" fontWeight={500} fontSize={13} color='#515151' >Aneed</Text>
                        <Text fontFamily="body" fontWeight={200} fontSize={13} color='#515151' >Al Harshplanet view, Calicut, </Text>

                    </Box>
                    <Icon as={<Ionicons />} name={'chevron-forward'} color="#535353" size={5} ml={3} />
                </HStack>

                <HStack borderWidth={1} borderColor={'#00000028'}  my={3} p={2} alignItems='center' justifyContent={'space-between'}>
                    <Box >
                        <Text fontFamily="body" fontWeight={200} fontSize={13} color='#515151'>{'Add delivery instructions'}</Text>
                    </Box>
                    <Icon as={<Ionicons />} name={'chevron-forward'} color="#535353" size={5} ml={3} />
                </HStack>

                <HStack 
                    borderWidth={1} borderColor={'#B4B4B4'} 
                    p={3} alignItems='center' mx={1} my={3} borderRadius={7} 
                >
                    <ImageBackground 
                        source={require('../../../../Images/lost.jpg')}               
                        style={{height:110, width:110}}>
                    </ImageBackground>
                    <Box w={'80%'}>
                        <Text fontWeight={400} fontFamily="body" fontSize={13} color='#515151' ml={2}>{'Item Name'}</Text>
                        <Text fontWeight={400} fontFamily="body" fontSize={14} color='#008ECC' ml={2}>{'Price'}</Text>
                        <HStack borderWidth={0.5} borderColor='#70707059' width={width/6} mx={2} alignItems='center'>
                            <Text fontWeight={200} fontFamily="body" fontSize={13} color='#707070' ml={2}>{'Qty'}</Text>
                            <Icon as={<Ionicons />} name={'chevron-down-sharp'} color="#535353" size={5} ml={3} />
                        </HStack>
                    </Box>
                    
                    
                </HStack>

              

                <Button 
                    onPress={()=>navigation.navigate('OrderSuccess')}
                    label={'Place your order'} 
                />

            </Box>

            

            
            
        </ScrollView>        
    </CommonBackground>
    </>
  )
}

export default PlaceOrder

const styles = StyleSheet.create({})