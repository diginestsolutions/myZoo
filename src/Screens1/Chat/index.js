import { StyleSheet } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { Box, ScrollView, Text, FlatList, useToast } from 'native-base'
import Header from '../../Components/Header'
import ChatCard from './ChatCard'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getChattedUserlist } from '../../Redux/actions/chatAction'
import reactotron from 'reactotron-react-native'
import LoadingContext from '../../context/loading'
import customAxios from '../../CustomAxios'


const Chat = ({navigation}) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth)
  const toast = useToast()
  //const { chattedUser, error } = useSelector(state => state.chat)

  const [chattedUser, setChattedUser] = useState([])

  const context = useContext(LoadingContext)

  //reactotron.log({chattedUser})


  
  


  
    useEffect(() => {
        getChatUsers()
    }, [])

    const getChatUsers = async() => {
        let data = {
            loggedInUserId: userData?.id,
        }
        context.setLoading(true)
        await customAxios.post(`api/profile/chat/messages/conversations`, data)  
        .then(async response => {
            setChattedUser(response.data.data)
            context.setLoading(false)
    
        })
        .catch(async error => {
    
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.500'
            })
    
            context.setLoading(false)
        });
    }


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
                data={chattedUser ? chattedUser : []}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                refreshing={context.loading}
                onRefresh={getChatUsers}
            />  
            
    </CommonBackground>
    </>
  )
}

export default Chat

const styles = StyleSheet.create({})