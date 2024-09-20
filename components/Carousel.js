import { StyleSheet, Text, View,FlatList,TouchableOpacity, Image ,Preview} from "react-native";
import React from "react";
import {FlatListSlider} from 'react-native-flatlist-slider';
import { full } from "@cloudinary/url-gen/qualifiers/fontHinting";
import { fill } from "@cloudinary/url-gen/actions/resize";

const Carousel = () => {
  // const images = [
  //   "https://b.zmtcdn.com/data/dish_photos/a49/18e4cd38093be595aee2d18cb58e3a49.jpg?fit=around%7C130:130&crop=130:130;*,*",
  //   "https://b.zmtcdn.com/data/dish_photos/a49/18e4cd38093be595aee2d18cb58e3a49.jpg?fit=around%7C130:130&crop=130:130;*,*",
  // ];
  const images = [
    {
     image:'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
     desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
   {
     image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
     desc:
       'Red fort in India New Delhi is a magnificient masterpeiece of humans',
   },
   {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
  {
    image:'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
   ]

   
  return (
    <FlatListSlider
    data={images}
    width= {this.width}
    timer={5000}
    
    onPress={item => alert(JSON.stringify(item))}
    indicatorActiveWidth={40}
    contentContainerStyle={{paddingHorizontal: 1}}
  />
  )
};

export default Carousel;

const styles = StyleSheet.create({

});


