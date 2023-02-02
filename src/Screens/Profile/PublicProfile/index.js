import { StyleSheet } from 'react-native'
import React, {useEffect} from 'react'
import { Box, Image, ScrollView, Spinner, useToast } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Header from '../../../Components/Header'
import Heading from '../../../Components/Heading'
import CommonInput from '../../../Components/CommonInput'
import Button from '../../../Components/Button'
import ProfileDp from '../ProfileDp'
import CommonBackground from '../../../Components/CommonBackground'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { RESET_ERROR } from '../../../Redux/constants/homeConstant'
import { getPublicProfile, updatePublicProfile } from '../../../Redux/actions/settingsAction'
import { RESET } from '../../../Redux/constants/settingsConstant'
import { IMAGE_URL } from '../../../config/Constants'
import reactotron from '../../../ReactotronConfig'



const PublicProfile = ({navigation}) => {

    const dispatch = useDispatch();
    const toast = useToast()  

    const { publicPro, loading, error, showProfile } = useSelector(state => state.settings)
    const { userData, userProfile } = useSelector(state => state.auth)

    // reactotron.log({userProfile})

    useEffect(() => {
        let data ={
            UserId: userData?.id,
        }
        dispatch(getPublicProfile(data))

    }, [])
  

    useEffect(() => {

        if(error){
            toast.show({ title: 'Error', description: error })
            dispatch({
            type: RESET_ERROR
            })
        }

    }, [error])

 

    useEffect(() => {
        if(error){
            dispatch({
                type: RESET_ERROR       
            })

            toast.show({
                title: 'Error',
                description : error
            })
        
        }    
        if(publicPro){

            dispatch({
                type: RESET       
            })
            
            toast.show({
                title: 'Updated',
            })
            
        }
    }, [error, publicPro])



    const schema = yup.object({   

        PublicName: yup.string().required(),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver : yupResolver(schema)
    });

    const onSubmit = data => {
        let datas={
            PublicName: data.PublicName,
            UserId: userData?.id,
            _id: userProfile?._id,
            Location:"dfdfdf"
        }

        dispatch(updatePublicProfile(datas))
    };
    

  return (
    <>
   
    <CommonBackground>
        <Heading label={'Public Profile'}/>
        
        <ScrollView p={4} >
   
            <ProfileDp >
                <Image                
                    source={{uri:`${IMAGE_URL}${userProfile?.Image?.[0]?.UploadedFileName}`}} 
                    h={100} w={100} alt="image" borderRadius={50} mt={2}
                />
            </ProfileDp>

            <Box mb={10}>
                <CommonInput 
                    control={control}
                    error={errors.PublicName}
                    fieldName="PublicName" 
                    placeholder={'Full Name'} 
                    topLabel={'Full Name'}
                />
                

                { loading ? <Spinner/> : <Button 
                    onPress={handleSubmit(onSubmit) }
                    label={'Update Profile'} 
                    topLabel={4} marginTop={5}
                />}
            </Box>    

         </ScrollView>
            
    </CommonBackground>
</>
  )
}

export default PublicProfile

const styles = StyleSheet.create({})