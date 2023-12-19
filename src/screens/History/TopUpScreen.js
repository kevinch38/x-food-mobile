import {ScrollView, View} from "react-native";
import React from "react";
import HistoryCard from "../../components/HistoryCard";
import image from '../../assets/images/topupimage.png'

const TopUpScreen = () => {
    return(
       <View style={{margin:20}}>
           <ScrollView>
               <HistoryCard image={image} date={`17 Oct, 10:30`} title={`Top Up`} content={`Top Up Success 55.000`}/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
               <HistoryCard/>
           </ScrollView>
       </View>
    )
}

export default TopUpScreen