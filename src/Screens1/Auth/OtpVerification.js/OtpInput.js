import { StyleSheet } from 'react-native'
import React from 'react'
import OTPTextInput from 'react-native-otp-textinput'

const OtpInput = ({onchange}) => {
    return(     
        <OTPTextInput 
            inputCount={6}
            textInputStyle={styles.container}
            tintColor='#E5E5E5'  
            handleTextChange={onchange}            
        />  
    )
}

export default OtpInput

const styles = StyleSheet.create({
    container:{
        borderColor:'#E5E5E5',
        borderWidth:1,
        height:60,
 
    }
})