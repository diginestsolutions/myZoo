import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import DrawerContent from './DrawerContent';
import LoadingModal from '../Components/LoadingModal';
import RNBootSplash from "react-native-bootsplash";


const Drawer = createDrawerNavigator();

const Menu = () => {

  const [showModal, setShowModal] = useState(false);


  const { loading } = useSelector(state => state.auth)


  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  }, [])
  

    useEffect(()=>{

        if(loading){
            setShowModal(true)
        }else{
            setShowModal(false)
        }

    }, [loading])
  return (    

    <>

        <Drawer.Navigator 
            initialRouteName='Home' 
            screenOptions={{ 
                headerShown: false,
                drawerType: 'front',
                swipeEdgeWidth: 0
            }} 
            drawerContent={(props) => <DrawerContent {...props}/>}
        >
            
            <Drawer.Screen name="Home" component={Home}/>
            
        </Drawer.Navigator>
        
        <LoadingModal isVisible={showModal}/>
    </>
    
    

  )
}

export default Menu

const styles = StyleSheet.create({})