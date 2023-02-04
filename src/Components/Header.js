import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Box, Icon, HStack, Avatar, Text, StatusBar, Pressable } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import LogoWhite from './LogoWhite'
import { useDispatch, useSelector } from 'react-redux';
import { getcartItemCount } from '../Redux/actions/cartAction'
import Search from '../Pages/Dashboard/Search'
import reactotron from 'reactotron-react-native'
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native'
import * as RootNavigation from '../Navigation/RootNavigation'


const Header = ({onPress, openCart }) => {

    const route = useRoute();

    const { count, loading, error, addPets, addAccessories, itemDelete } = useSelector(state => state.cart)
    const { userData } = useSelector(state => state.auth)
    const { addWishList } = useSelector(state => state.myItems)

    reactotron.log({count})


    // reactotron.log({route: RootNavigation.getCurrentRoute()})

    const dispatch = useDispatch();


    useEffect(() => {

        if(addPets){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getcartItemCount(data))

        }

        else if(addAccessories){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getcartItemCount(data))

        }

        else if(itemDelete){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getcartItemCount(data))

        }
        else if(addWishList){

            let data ={
                UserId: userData?.id,
            }
            dispatch(getcartItemCount(data))

        }else{

            let data ={
                UserId: userData?.id,
            }
            dispatch(getcartItemCount(data))

        }
        

    }, [itemDelete, addWishList, addPets, addAccessories])


  return (
    <>
    <Box 
        height={85} 
        bg={{
            linearGradient: {
                colors: ['#005EAA', '#008BFC'],
                start: [0, 0],
                end: [1, 0],
            },
        }}
    >
        <StatusBar hidden={false} translucent={true} backgroundColor={'#3608c2'} barStyle="dark-content" />


        <HStack alignItems='center' mt={-6} px={2} justifyContent='space-between'>
         
            <Icon as={<EvilIcons />} name={"navicon"} color="#fff" size={36} mt={-1} onPress={onPress}/> 
        
            <LogoWhite/>
            <Pressable mt={-3} onPress={openCart}>
                <Icon as={<FontAwesome />} name={"shopping-cart"} color="#fff" size={26}  />
                {count?.CartCount > 0 && <Avatar backgroundColor={'#DB161B'} size='5' ml={3} mt={-8}>
                    <Text color='#fff' ml={0.45} mt={-0.5}>{count?.CartCount}</Text>
                </Avatar>}
            </Pressable>
                              
        </HStack>
        
    </Box>
    {RootNavigation.getCurrentRoute()?.name === "Dashboard" && <Search onPress={()=>RootNavigation.navigationRef.navigate('Filter')}/>}
    </>
  )
}

export default Header

const styles = StyleSheet.create({})