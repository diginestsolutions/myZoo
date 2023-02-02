import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../Pages/Dashboard'
import Categories from '../Pages/Categories';
import PetsDetails from '../Pages/Categories/PetsDetails';
import ProductDetails from '../Pages/ProductDetails';
import BidForItem from '../Pages/MyBidding/BidForItem';
import Checkout from '../Pages/Cart/Checkout';
import Cart from '../Pages/Cart';
import EditAddress from '../Pages/Profile/DeliveryAddress/EditAddress';
import AddANewAddress from '../Pages/Profile/DeliveryAddress/AddANewAddress';
import Payment from '../Pages/Cart/Payment';
import MyOrder from '../Pages/MyOrder';
import TrackItem from '../Pages/MyOrder/TrackItem';
import MyWishlist from '../Pages/MyWishlist';
import MyFavourites from '../Pages/MyFavourites';
import MyBidding from '../Pages/MyBidding';
import MyItemsList from '../Pages/MyItemsList';
import MyCompareList from '../Pages/MyCompareList';
import MyMembershipPlans from '../Pages/MyMembershipPlans';
import Faqs from '../Pages/FAQs';
import ContactUs from '../Pages/ContactUs';
import Profile from '../Pages/Profile';
import TermsAndPrivacyPolicy from '../Pages/TermsAndPrivacyPolicy';
import AboutApp from '../Pages/AboutApp';
import PostNewItem from '../Pages/AddPost/PostNewItem';
import SelectedAccessory from '../Pages/Categories/SelectedAccessory';
import CreateAccessory from '../Pages/AddPost/CreateAccessory';
import CreateService from '../Pages/AddPost/CreateService';
import ServiceDetails from '../Pages/Categories/ServiceDetails';
import OrderDetails from '../Pages/MyOrder/OrderDetails';
import LeaveSellerFeedback from '../Pages/MyOrder/OrderDetails/LeaveSellerFeedback';
import LeaveDeliveryFeedback from '../Pages/MyOrder/OrderDetails/LeaveDeliveryFeedback';
import WriteProductReview from '../Pages/MyOrder/OrderDetails/WriteProductReview';
import ReturnRequest from '../Pages/MyOrder/OrderDetails/ReturnRequest';
import OrderSuccess from '../Pages/Cart/Payment/PlaceOrder/OrderSuccess';
import EditItem from '../Pages/AddPost/EditItem';
// import ServiceSubCategory from './Services/ServiceSubCategory';
// import MyOrder from '../Drawer/MyOrder';
// import Cart from '../Cart';
//import BrowseCategories from './Categories/BrowseCategories';
// import SubService from './Categories/BrowseCategories/Services/SubService';
// import MyZooPicksTab from './Categories/MyZooPicksTab';
// import TrackItem from '../Drawer/MyOrder/TrackItem';
// import OrderDetails from '../Drawer/MyOrder/OrderDetails';
// import LeaveSellerFeedback from '../Drawer/MyOrder/OrderDetails/LeaveSellerFeedback';
// import LeaveDeliveryFeedback from '../Drawer/MyOrder/OrderDetails/LeaveDeliveryFeedback';
// import WriteProductReview from '../Drawer/MyOrder/OrderDetails/WriteProductReview';
// import ReturnRequest from '../Drawer/MyOrder/OrderDetails/ReturnRequest';
// import MyWishlist from '../Drawer/MyWishlist';
// import Checkout from '../Cart/Checkout';
// import MyFavourites from '../Drawer/MyFavourites';
// import MyBidding from '../Drawer/MyBidding';
// import MyItemsList from '../Drawer/MyItemsList';
// import BidForItem from '../Drawer/MyBidding/BidForItem';
// import MyCompareList from '../Drawer/MyCompareList';
// import MyMembershipPlans from '../Drawer/MyMembershipPlans';
// import Currency from '../Drawer/Currency';
// import SelectCountry from '../Profile/SelectCountry';
// import SelectedPet from './Categories/BrowseCategories/Pets/SelectedPet';
// import SelectedAccessory from './Categories/BrowseCategories/Accessories/SelectedAccessory';
// import Payment from '../Cart/Payment';
// import VendorProfile from './Vendors/VendorProfile';
// import FilterResult from '../Filter/FilterResult';
// import Filter from '../Filter';
// import PostNewItem from '../AddPost/PostNewItem';
// import CreateAccessory from '../AddPost/CreateAccessory';
// import CreateService from '../AddPost/CreateService';
// import AddANewAddress from '../Profile/DeliveryAddress/AddANewAddress';
// import EditAddress from '../Profile/DeliveryAddress/EditAddress';
// import RecentPosts from './Item/RecentPosts.js';
// import ProductDetails from './Item/ProductDetails';
// import ContactUs from '../Drawer/ContactUs';
// import TermsAndPrivacyPolicy from '../Drawer/TermsAndPrivacyPolicy';
// import AboutApp from '../Drawer/AboutApp';
// import Faqs from '../Drawer/FAQs';
// import Profile from '../Profile';
// import PlaceOrder from '../Cart/Payment/PlaceOrder';
// import OrderSuccess from '../Cart/Payment/PlaceOrder/OrderSuccess';
// import Dashboard from '../../Pages/Dashboard';
//import ProductDetails from './Product/ProductDetails';

const Stack = createNativeStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator initialRouteName='Dashboard'  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} initialParams={{ title: "home" }} />
        <Stack.Screen name="ProductDetails" component={ProductDetails}/>
        <Stack.Screen name="BidForItem" component={BidForItem}/>
        <Stack.Screen name="Checkout" component={Checkout}/>
        <Stack.Screen name="Cart" component={Cart}/>
        <Stack.Screen name="EditAddress" component={EditAddress}/>
        <Stack.Screen name="AddANewAddress" component={AddANewAddress}/>
        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="MyOrder" component={MyOrder}/>
        <Stack.Screen name="TrackItem" component={TrackItem}/>
        <Stack.Screen name="MyWishlist" component={MyWishlist}/>
        <Stack.Screen name="MyFavourites" component={MyFavourites}/>
        <Stack.Screen name="MyBidding" component={MyBidding}/>
        <Stack.Screen name="MyItemsList" component={MyItemsList}/>
        <Stack.Screen name="EditPost" component={EditItem}/>
        <Stack.Screen name="MyCompareList" component={MyCompareList}/>
        <Stack.Screen name="MyMembershipPlans" component={MyMembershipPlans}/>
        <Stack.Screen name="Faqs" component={Faqs}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="ContactUs" component={ContactUs}/>
        <Stack.Screen name="AboutApp" component={AboutApp}/>
        <Stack.Screen name="TermsAndPrivacyPolicy" component={TermsAndPrivacyPolicy}/>
        <Stack.Screen name="PostNewItem" component={PostNewItem}/>
        <Stack.Screen name="SelectedAccessory" component={SelectedAccessory}/>
        <Stack.Screen name="CreateAccessory" component={CreateAccessory}/>
        <Stack.Screen name="CreateService" component={CreateService}/>
        <Stack.Screen name="ServiceSubCategory" component={ServiceDetails}/>

        <Stack.Screen name="OrderDetails" component={OrderDetails}/>

        <Stack.Screen name="LeaveSellerFeedback" component={LeaveSellerFeedback}/>
        <Stack.Screen name="WriteProductReview" component={WriteProductReview}/>
        <Stack.Screen name="LeaveDeliveryFeedback" component={LeaveDeliveryFeedback}/>
        <Stack.Screen name="ReturnRequest" component={ReturnRequest}/>
        <Stack.Screen name="OrderSuccess" component={OrderSuccess}/>




        {/* <Stack.Screen name="Cart" component={Cart}/>
        <Stack.Screen name="Checkout" component={Checkout}/>
        <Stack.Screen name="AddANewAddress" component={AddANewAddress}/>
        <Stack.Screen name="EditAddress" component={EditAddress}/>

        <Stack.Screen name="Payment" component={Payment}/>
        <Stack.Screen name="PlaceOrder" component={PlaceOrder}/>
        <Stack.Screen name="OrderSuccess" component={OrderSuccess}/> */}



        <Stack.Screen name="BrowseCategories" component={Categories}/>
        <Stack.Screen name="petsDetails" component={PetsDetails}/>
        {/* <Stack.Screen name="SubService" component={SubService}/>
        <Stack.Screen name="SelectedPet" component={SelectedPet}/>
        <Stack.Screen name="SelectedAccessory" component={SelectedAccessory}/>

        <Stack.Screen name="MyZooPicksTab" component={MyZooPicksTab}/>

        <Stack.Screen name="RecentPosts" component={RecentPosts}/>

        <Stack.Screen name="ServiceSubCategory" component={ServiceSubCategory}/>
        <Stack.Screen name="VendorProfile" component={VendorProfile}/>

        <Stack.Screen name="MyOrder" component={MyOrder}/>
        <Stack.Screen name="TrackItem" component={TrackItem}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails}/>
        <Stack.Screen name="LeaveSellerFeedback" component={LeaveSellerFeedback}/>
        <Stack.Screen name="LeaveDeliveryFeedback" component={LeaveDeliveryFeedback}/>
        <Stack.Screen name="WriteProductReview" component={WriteProductReview}/>
        <Stack.Screen name="ReturnRequest" component={ReturnRequest}/>

        <Stack.Screen name="MyWishlist" component={MyWishlist}/>
        <Stack.Screen name="MyFavourites" component={MyFavourites}/>
        <Stack.Screen name="MyBidding" component={MyBidding}/>
        <Stack.Screen name="BidForItem" component={BidForItem}/>

        <Stack.Screen name="MyItemsList" component={MyItemsList}/>
        <Stack.Screen name="MyCompareList" component={MyCompareList}/>
        <Stack.Screen name="MyMembershipPlans" component={MyMembershipPlans}/>
        <Stack.Screen name="Currency" component={Currency}/>
        <Stack.Screen name="SelectCountry" component={SelectCountry}/>

        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Faqs" component={Faqs}/>
        <Stack.Screen name="ContactUs" component={ContactUs}/>
        <Stack.Screen name="TermsAndPrivacyPolicy" component={TermsAndPrivacyPolicy}/>
        <Stack.Screen name="AboutApp" component={AboutApp}/>
    
        <Stack.Screen name="Filter" component={Filter}/>
        <Stack.Screen name="FilterResult" component={FilterResult}/>

        <Stack.Screen name="PostNewItem" component={PostNewItem}/>
        <Stack.Screen name="CreateAccessory" component={CreateAccessory}/>
        <Stack.Screen name="CreateService" component={CreateService}/> */}

        
    </Stack.Navigator>
  )
}

export default HomeNav

const styles = StyleSheet.create({})