import { StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { Box, Icon, ScrollView, Text, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonBackground from '../../../Components/CommonBackground'
import Header from '../../../Components/Header'
import Sharebutton from '../../Drawer/MyOrder/OrderDetails/LeaveSellerFeedback/Sharebutton'
import Title from '../../Drawer/MyOrder/Title'
import MyzooPicks from '../MyZooPicks'
import Ratings from '../Item/Ratings'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import ReviewsCard from '../../Drawer/MyOrder/OrderDetails/LeaveSellerFeedback/ReviewsCard'
import Accessories from '../Accessories'


const VendorProfile = ({navigation}) => {
    return (
    <>
    <Header 
        onPress={() => navigation.openDrawer()}
        openCart={()=>navigation.navigate('Cart')}
    />

        <CommonBackground>
            <ScrollView >
            <ImageBackground 
                source={require('../../../Images/vendor.jpg')} 
                borderTopLeftRadius={20}
                borderTopRightRadius={20}
                style={{height:400, width:411}}
                resizeMode='contain'
            >
                <Sharebutton/>
            </ImageBackground>
            <Box width={'95%'} bg={'#fff'}alignSelf='center' borderRadius={10} mt={-10} p={3} elevation={12}>
                <HStack justifyContent={'space-between'}>
                            
                    <Text  fontWeight={400} fontSize={16} color={'#000'}>Shark Land Private Limited</Text>
                 
                    <Icon as={<Ionicons/>} name='ios-checkmark-circle' size={18} color='#57A4FF' ml={1}/>                        
                    
                </HStack>
                <HStack justifyContent={'space-between'}>
                            
                    <Text  fontWeight={400} fontSize={16} color={'#535353'}>Riyadh,KSA</Text>
                    <HStack alignItems={'center'}>
                        <Icon as={<Ionicons/>} name='ios-star' size={19} color='yellow.500' />
                        <Text fontWeight={500} fontSize={16} ml={2} color={'gray.700'}>4.5</Text>
                    </HStack>
                  
                </HStack>                
            </Box>

            <Box p={3}>

                <Title label={'About Company'}/>
                <Box>
                    <Text fontWeight={200} fontSize={15} color={'#535353'}>Energetic, obedient, agile and can compete in dog sports. Adapts well to apartment living, good for new pet owners, tolerates cold weather, affectionate even with kids, doesn’t drool, easy to train and very playful.</Text>
                </Box>

                <MyzooPicks label={'Shark Land pets'}/>

                <Accessories label={'Shark Land accessories'}/>



                <HStack justifyContent={'space-between'} px={10}>
                    <Box alignItems={'center'}>
                        <Text fontSize={50} color={'gray.600'}>5.0</Text>
                        <Ratings imageSize={16}/>
                        <Text fontSize={16} color={'#535353'}>47 item ratings</Text>
                    </Box>
                    <Box alignItems={'center'} justifyContent='center'>
                        
                        <Ratings imageSize={16}/>
                        <Text fontSize={16} color={'#535353'}>0 ratings</Text>
                    </Box>
                </HStack>

                <Title label={'Review and rate item'}/>
                <Box alignItems={'flex-start'}>
                    <Ratings imageSize={22}/>
                </Box>
                <CommonInput placeholder={'Write your rivew here'}/>
                <Text fontSize={11} color={'#535353'} fontWeight={200} mt={2} ml={1}>The name "MyZoo customer will be displayed with your feedback"</Text>
                <Text fontSize={12} color={'#008ECC'} fontWeight={300}  ml={1}>Use a different name"</Text>

                <Button label={'Submit Feedback'} marginTop={5}/>

                <Text fontSize={16} color={'#000'} my={3}>42 reviews</Text>

                <ReviewsCard/>



            </Box>

            

            </ScrollView>
                
        </CommonBackground>
    </>
    )
}

export default VendorProfile

const styles = StyleSheet.create({})