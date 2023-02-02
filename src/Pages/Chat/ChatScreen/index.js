import { StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Box, Text, Icon, Image, HStack, Input } from 'native-base'
import CommonBackground from '../../../Components/CommonBackground'
import Header from '../../../Components/Header'
import Conversation from './Conversation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { conversatnChatHistory, sendMessage } from '../../../Redux/actions/chatAction'
//import socket from "../../../utils/socket";


const ChatScreen = ({ navigation, route }) => {

    const { userData } = useSelector(state => state.auth)
    const { productChatSuccess } = useSelector(state => state.chat)

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const { item } = route.params

    //reactotron.log({item : route.params})


    useEffect(() => {
        if(item?.UserID){
            let data = {
                loggedInUserId: userData?.id,
                userId: item?.UserID
            }

            dispatch(conversatnChatHistory(data))
            
        }
    }, [item])

    //👇🏻 Runs when the component mounts
    // useLayoutEffect(() => {
    //     function fetchGroups() {
    //         fetch("http://localhost:4000/api")
    //             .then((res) => res.json())
    //             .then((data) => setRooms(data))
    //             .catch((err) => console.error(err));
    //     }
    //     fetchGroups();
    // }, []);

    //👇🏻 Runs whenever there is new trigger from the backend
    // useEffect(() => {
    //     socket.on("roomsList", (rooms) => {
    //         reactotron.log(rooms);
    //     });
    // }, [socket]);


    const sendMessageNew = () => {
        let data = {
            body : message,
            isLink: false,
            loggedInUserId: userData?.id,
            to: item.userID
        }

        dispatch(sendMessage(data))
    }

    useEffect(() => {
        if(productChatSuccess){
            dispatch({
                type: RESET_ERROR
            })
        }
    }, [productChatSuccess])
    

  return (
    <>
    
    <CommonBackground>
        <HStack 
            borderBottomColor='#EFEBEB' 
            borderBottomWidth={1} pb={2}
            alignItems='center'
            mt={3}
            justifyContent='center'
        >
            <Box>
                <Image                
                    source={require('../../../Images/user.jpg')} 
                    h={44} w={44} alt="image" borderRadius={22}
                />
            </Box>
            <Text 
                color={'#008ECC'} 
                fontSize={17} 
                fontWeight={500} 
                fontFamily={'body'}
                ml={2}
            >{item?.Name}</Text>
        </HStack>

        <Box p={4}>
            <Conversation/>

        </Box>
        <Box position={'absolute'} w='100%' bottom={0}>
            <Input 
                placeholder='Write a message'
                onChangeText={(value) => setMessage(value)}
                rightElement={<Icon as={<Ionicons />} name={"ios-arrow-forward"} onPress={sendMessageNew} color="#707070" size={36} mr={2}/> } 
                height={85}
            />
        </Box>       

            
    </CommonBackground>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})