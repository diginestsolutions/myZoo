import { Animated, Easing, StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Box, Center, Icon, Pressable, Text,  Modal, HStack, useDisclose, Alert, VStack, IconButton, CloseIcon} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'

//import HomeNav from '../Screens/Dashboard/HomeNav';
import ChatNav from '../Screens/Chat/ChatNav';
import ListItem from '../Components/ListItem';
import Filter from '../Screens/Filter';
//import AddPost from '../Screens/AddPost';
import Header from '../Components/Header';
import { useRoute } from '@react-navigation/native';
import reactotron from 'reactotron-react-native';
import HomeNav from './HomeNav';
import ProfileNav from './ProfileNav';
import AddPost from '../Pages/AddPost';
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../CustomAxios';
import { LOADING } from '../Redux/constants/homeConstant';
import { toNumber } from 'lodash';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {

    const route = useRoute();

    const { userData } = useSelector(state => state.auth)

    const [placement, setPlacement] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [openAddpost, setOpenAddpost] = useState(false);
    const { width, height } = useWindowDimensions()

    const dispatch = useDispatch()

    const addNewPet = async() => {
        //Check Membership

        let data = {
            "UserId": userData.id
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`user/membership/_plandetails`, data)  
        .then(async response => {

            let details = response?.data?.data;

            if(details?.membership_status === true){
                let petLimit = toNumber(details?.PetLimit);
                let uploadedLimit = details.uploaded
                if(petLimit <= uploadedLimit){
                    //Limit Exceeds
                    //navigation.navigate("memberWarning", { item: details })
                    setShowAlert(true)

                }
                else{
                    navigation.navigate('PostNewItem', { 
                        NoOfImage: parseInt(details?.NoOfImage), 
                        NoOfVideo: parseInt(details?.NoOfVideo), 
                        ImageSize: parseFloat(details?.ImageSize)*1000000, 
                        VideoSize: parseFloat(details?.VideoSize)*1000000, 
                        VideoTime: parseFloat(details?.VideoTime),
                        MyZooPick: details?.Eligibleformyzoo ? true : false  
                    })
                }
                
            }
            else{
                navigation.navigate("MyMembershipPlans")
            }
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

    const addNewAccessory = async() => {
        //Check Membership

        let data = {
            "UserId": userData.id
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`user/membership/_planaccsdetails`, data)  
        .then(async response => {

            let details = response?.data?.data;

            if(details?.membership_status === true){
                let accessoryLimit = toNumber(details?.AccessoriesLimit);
                let uploadedLimit = details.uploaded
                if(accessoryLimit <= uploadedLimit){
                    setShowAlert(true)

                }
                else{
                    navigation.navigate('CreateAccessory', { 
                        NoOfImage: parseInt(details?.NoOfImage), 
                        NoOfVideo: parseInt(details?.NoOfVideo), 
                        ImageSize: parseFloat(details?.ImageSize)*1000000, 
                        VideoSize: parseFloat(details?.VideoSize)*1000000, 
                        VideoTime: parseFloat(details?.VideoTime),
                        MyZooPick: details?.Eligibleformyzoo ? true : false   
                    })
                    
                }
                
            }
            else{
                navigation.navigate("MyMembershipPlans")
            }
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

    const addNewService = async() => {
        //Check Membership

        let data = {
            "UserId": userData.id
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`user/membership/_planservicedetails`, data)  
        .then(async response => {

            let details = response?.data?.data;
            let seviceLimit = toNumber(details?.ServicesLimit);
            let uploadedLimit = details.uploaded
            //reactotron.log(seviceLimit, uploadedLimit)
            if(details?.membership_status === true){
                if(seviceLimit <= uploadedLimit){
                    //Limit Exceeds
                    //navigation.navigate("memberWarning", { item: details })
                    setShowAlert(true)

                }
                else{
                    reactotron.log(seviceLimit, uploadedLimit)
                    navigation.navigate('CreateService', { 
                        NoOfImage: parseInt(details?.NoOfImage), 
                        NoOfVideo: parseInt(details?.NoOfVideo), 
                        ImageSize: parseFloat(details?.ImageSize)*1000000, 
                        VideoSize: parseFloat(details?.VideoSize)*1000000, 
                        VideoTime: parseFloat(details?.VideoTime),
                        MyZooPick: details?.Eligibleformyzoo ? true : false    
                    })
                    
                }
                
            }
            else{
                navigation.navigate("MyMembershipPlans")
            }
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



    // reactotron.log({route})


    const openModal = placement => {
        setOpen(true);
        setPlacement(placement);
      };

    const openAddModal = placement => {
        setOpenAddpost(true);
        setPlacement(placement);
    };
    
    return (
        <>
            <Header 
                onPress={() => navigation.openDrawer()}
                openCart={()=>navigation.navigate('Cart')}   
            />
            <Tab.Navigator 
                initialRouteName='HomeNav'
                screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle :{ height:  60 },
                tabBarItemStyle: { justifyContent: 'center', height: 50 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    color = focused ? '#1A73BA' : '#E0E0E0'
                    if (route.name === 'HomeNav') {
                        iconName = 'ios-home-outline'
                        return <Ionicons name={iconName} size={size} color={color} />;
                        
                    } else if (route.name === 'ChatNav') {
                        iconName = 'md-chatbubble-ellipses-outline';
                        return <Pressable onPress={() => {
                            if(userData?.id){
                                navigation.navigate("ChatNav")
                            }
                            else{
                                navigation.navigate("SignIn")
                            }
                        }}><Ionicons name={iconName} size={size} color={color} /></Pressable>;
                    }else if (route.name === 'Filter') {
                        iconName = 'reader-outline';
                        return( 
                        <>
                        <Pressable onPress={() => openModal("bottom")} width={width/5} alignItems='center'>
                            <Ionicons name={iconName} size={size} color={color}/>
                        </Pressable>
                        <Modal 
                            isOpen={open} 
                            onClose={() => setOpen(false)} safeAreaTop={true}
                            ml={55}
                        >
                            <Modal.Content width={220} {...styles[placement]}>
                            <Modal.Body >
                                <ListItem                                  
                                    text={"My Order"}  
                                    icon={<Octicons/>} 
                                    iconName='stack' 
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyOrder')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}
                                />
                                <ListItem 
                                    marginTop={3}
                                    text={"My Favourites"} 
                                    icon={<Octicons/>} 
                                    iconName='heart-fill'
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyFavourites')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}
                                />
                                <ListItem 
                                    marginTop={3}
                                    text={"My Wishlist"} 
                                    icon={<MaterialIcons/>} 
                                    iconName='list-alt' 
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyWishlist')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}
                                />
                                <ListItem 
                                    marginTop={3}
                                    text={"My Compare List"}   
                                    icon={<MaterialCommunityIcons/>} 
                                    iconName='note-text-outline'
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyCompareList')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}
                                />
                                <ListItem 
                                    marginTop={3}
                                    text={"My Bidding"}  
                                    icon={<FontAwesome/>} 
                                    iconName='circle'
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyBidding')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}

                                />
                                <ListItem 
                                    marginTop={3}
                                    text={"My Items List"}  
                                    icon={<MaterialCommunityIcons/>} 
                                    iconName='note-text-outline'
                                    onPress={()=>{
                                        if(userData?.id){
                                            navigation.navigate('MyItemsList')
                                            setOpen(false)
                                        }
                                        else{
                                            setOpen(false)
                                            navigation.navigate('SignIn')
                                        }
                                    }}
                                />
                            </Modal.Body>
                            
                            </Modal.Content>
                        </Modal>

                        </>
                        )
                    }
                    else if (route.name === 'ProfileNav') {
                        iconName = 'settings-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'AddPost') {
                        return(  
                        <>
                            <Pressable onPress={userData?.id ? () => openAddModal("bottom") : () => navigation.navigate("SignIn")}>
                            <Avatar 
                                bg={"#008ECC"}
                                size={70}
                                shadow='9'
                                top={-19}
                            >
                                <Icon 
                                    as={<FontAwesome5 />} name={'plus'} 
                                    color="#fff" size={50} ml={1.5} 
                                />
                            </Avatar>
                            </Pressable>
                            

                            <Modal
                                isOpen={openAddpost} onClose={() => setOpenAddpost(false)} safeAreaTop={true} mt={190}
                            >  
                                <Avatar 
                                    bg={"#008ECC"}
                                    size={42}
                                    shadow='9'
                                    alignSelf={'center'}
                                    mb={5}
                                >
                                    <Icon 
                                        onPress={()=>{
                                            addNewAccessory()
                                            
                                            setOpenAddpost(false)
                                        }}
                                        as={<FontAwesome />} name={'chain'} color="#fff" size={22}
                                    />
                                </Avatar>
                                <HStack justifyContent={'space-between'} w={'50%'}>
                                <Avatar 
                                    bg={"#008ECC"}
                                    size={42}
                                    shadow='9'
                                >
                                    <Icon 
                                        onPress={()=>{
                                            addNewPet()
                                            
                                            setOpenAddpost(false)
                                        }}
                                        as={<FontAwesome5 />} name={'cat'} 
                                        color="#fff" size={22}
                                    />
                                </Avatar>
                                <Avatar 
                                    bg={"#008ECC"}
                                    size={42}
                                    shadow='9'
                                >
                                    <Icon 
                                        onPress={()=>{
                                            //navigation.navigate('CreateService')
                                            setOpenAddpost(false)
                                            addNewService()
                                        }}
                                        as={<FontAwesome />} name={'scissors'} 
                                        color="#fff" size={22} 
                                    />
                                </Avatar>
                                </HStack>
                            </Modal>
                        </>
                        )
                    }               
                
                },
                
                headerShown: false,
                
            })}
            >
                <Tab.Screen name="HomeNav" component={HomeNav} />
                <Tab.Screen name="ChatNav" component={ChatNav}/>
                <Tab.Screen name="AddPost" component={AddPost}/>
                <Tab.Screen name="Filter" component={Filter}/>
                <Tab.Screen name="ProfileNav" component={ProfileNav}/>
            </Tab.Navigator>
            <Modal 
                            isOpen={showAlert} 
                            onClose={() => setShowAlert(false)} safeAreaTop={true}
                            ml={55}
                        >
                            <Modal.Content bgColor={"transparent"} width={400}>
                            <Modal.Body >
                            <Center>
                <Alert  status="info" colorScheme="warning">
                    <VStack space={2} flexShrink={1} w="100%">
                    <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                        <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                            Warning!
                        </Text>
                        </HStack>
                        <IconButton variant="unstyled" onPress={() => setShowAlert(false)} _focus={{
                        borderWidth: 0
                    }} icon={<CloseIcon size="3" />} _icon={{
                        color: "coolGray.600"
                    }} />
                    </HStack>
                    <Box pl="6" _text={{
                    color: "coolGray.600"
                    }}>
                       You have reached your today's limit
                    </Box>
                    </VStack>
                </Alert>
            </Center>
                            </Modal.Body>
                        </Modal.Content>
                    </Modal>
            </>
    )
}

export default Home

const styles = StyleSheet.create({
    top: {
        marginBottom: "auto",
        marginTop: 0
      },
      bottom: {
        marginBottom: 85,
        marginTop: "auto"
      },
      left: {
        marginLeft: 0,
        marginRight: "auto"
      },
      right: {
        marginLeft: "auto",
        marginRight: 0
      },
      center: {}
})