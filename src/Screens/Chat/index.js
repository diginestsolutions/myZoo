import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, ScrollView, Text, FlatList } from 'native-base'
import Header from '../../Components/Header'
import ChatCard from './ChatCard'
import Heading from '../../Components/Heading'
import CommonBackground from '../../Components/CommonBackground'
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux'
import { getChattedUserlist } from '../../Redux/actions/chatAction'
import reactotron from 'reactotron-react-native'


const Chat = ({navigation}) => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.auth)
  const { chattedUser, error } = useSelector(state => state.chat)

  //reactotron.log({chattedUser})


  
  


  const datas = [
    {   id: 1, 
        time:"12:40 AM",
        chat:'I want to buy your pet…',           
        count:'2',
        name:'Muhammed Raheem'
    },
    {   id: 2, 
        time:"Yesterday",
        chat:'I want to buy your pet…',           
        count:'3',
        name:'Muhammed Raheem'

    },    
     
]

    useEffect(() => {
        let data = {
            loggedInUserId: userData?.id,
        }
        dispatch(getChattedUserlist(data))
    }, [])

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
                data={chattedUser ? chattedUser : []}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
            />  
            
    </CommonBackground>
    </>
  )
}

export default Chat

const styles = StyleSheet.create({})