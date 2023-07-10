import { ImageBackground } from "react-native";
import { styled } from "nativewind";

import blurbg from '../src/assets/luz.png'
import Stripes from '../src/assets/stripes.svg'

import{
  useFonts, Roboto_400Regular, Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import{
  BaiJamjuree_700Bold
} from '@expo-google-fonts/bai-jamjuree'
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store'

const StyledStripes = styled(Stripes)

export default function layout(){
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({Roboto_400Regular, Roboto_700Bold, BaiJamjuree_700Bold})

  useEffect(()=>{
    SecureStore.getItemAsync('token').then(token => {
      console.log(!!token)

      setIsUserAuthenticated(!!token)
    })
  },[])

  if(!hasLoadedFonts){
    return <SplashScreen />
  }

  return(
    <ImageBackground 
      source={blurbg} 
      className='flex-1 bg-gray-900 relative '
      imageStyle={{position: 'absolute', left: '-100%'}}>
        
      <StyledStripes className='absolute left-2'/>      
      <StatusBar style="light" translucent/>

      <Stack 
        screenOptions={{ 
        headerShown:false, 
        contentStyle: {backgroundColor: 'transparent'} ,
        animation:'fade'
      }}>
        <Stack.Screen name="index" 
        redirect={isUserAuthenticated} />       
        <Stack.Screen name="memories"/>
        <Stack.Screen name="new"/>
      </Stack>
    </ImageBackground>
  )
}