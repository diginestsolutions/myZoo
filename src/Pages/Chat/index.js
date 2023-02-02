import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, useToast } from 'native-base'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getChattedUserlist } from '../../Redux/actions/chatAction'
import reactotron from 'reactotron-react-native'
import ChatCard from './ChatCard'
import CommonBackground from '../../Components/CommonBackground';
import Heading from '../../Components/Heading';
import { LOADING } from '../../Redux/constants/homeConstant';
import customAxios from '../../CustomAxios';


const Chat = ({navigation}) => {

    const toast = useToast()

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth)
  const [chattedUser, setChattedUser] = useState([])

  //reactotron.log({chattedUser})


  
  



    useEffect(() => {
        let data = {
            loggedInUserId: userData?.id,
        }
        getChattedUserlist(data)
    }, [])

    const getChattedUserlist = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`api/profile/chat/messages/conversations`, data)  
        .then(async response => {
            setChattedUser(response.data.data)
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

    // useEffect(() => {
    //     if(error){
    //         toast.show({ title: 'Error', description: error })
    //         dispatch({
    //             type: RESET_ERROR
    //         })
    //     }
    // }, [error])

const renderItems = ({item}) => (
    <ChatCard 
        item={item} 
        onPress={()=>navigation.navigate('ChatScreen', { item })}  
        mx={2.5}         
    />
)
  return (
    <>
   
    <CommonBackground>
            <Heading label={t("Messages.msg")}/>

            <FlatList 
                data={chattedUser}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />  
            
    </CommonBackground>
    </>
  )
}

export default Chat

const styles = StyleSheet.create({})