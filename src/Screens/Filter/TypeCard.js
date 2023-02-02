import { StyleSheet } from 'react-native'
import React from 'react'
import { Pressable, Text } from 'native-base'

const TypeCard = ({label, onPress, selected, my, item}) => {
  return (
    <Pressable   
        style={selected ? styles.tabSelected : styles.tabNotSelected} onPress={onPress} my={my}
        // bg= {selected === item?._id ? "#005EAA" : 'gray.500'} 
    >
        <Text style={selected ? styles.selectedText : styles.notSelectedText}>{label}</Text>                        
    </Pressable>
  )
}

export default TypeCard

const styles = StyleSheet.create({

  tabSelected: {    
    height:30,
    backgroundColor:'#1A73BA',
    marginLeft:5,
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    elevation:3,
    marginRight:5 
  },
  tabNotSelected:{    
    height:30,
    backgroundColor:'#F0F0F0',
    marginLeft:5, 
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
    marginRight:5,
    elevation:3      
  },
  selectedText:{
    fontWeight:'500',
    color:'white',
    fontSize:13,
    paddingLeft:10,
    paddingRight:10
  },
  notSelectedText:{
    fontWeight:'500',
    color:'#535353',
    fontSize:13,
    paddingLeft:10,
    paddingRight:10

  },
})