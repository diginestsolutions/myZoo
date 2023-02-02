import { StyleSheet, View } from 'react-native'
import React from 'react'
import MembershipCard from '../Pages/MyMembershipPlans/MembershipCard'
import { IMAGE_URL } from '../config/Constants'
import { Box, Icon, Text, Button } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const MemberShipWarning = ({route, navigation}) => {

    const { item } = route.params
    return (
        <Box bgColor={"#fff"} borderRadius={20} py={10} mx={2} alignItems="center" mt={20}>
            
            <Button variant={"link"} position="absolute" top={0} right={2}  onPress={() => navigation.goBack() }>
            <Icon as={<Ionicons />} name='close-outline' color={"black"} size={25} />
            </Button>
            <MembershipCard
                img={{ uri: `${IMAGE_URL}${item?.Image?.UploadedFileName}` }}
                title={item?.Name}
                point1={item?.Conditions?.[0]?.Condition}
                point2={item?.Conditions?.[1]?.Condition}
                point3={item?.Conditions?.[2]?.Condition}
                month={item?.Duration}
                type={item?.Price}
                label={"Upgrade"}
                onPress={() => {
                    navigation.navigate("MyMembershipPlans")
                }}
            />
            <Text>Your Limit Exceeds the current membership limit.</Text>
        </Box>
    )
}

export default MemberShipWarning

const styles = StyleSheet.create({})