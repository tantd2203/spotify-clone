import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import React ,{useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

WebBrowser.maybeCompleteAuthSession();
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};
const LoginScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      if(accessToken !=null){
          navigation.replace("Main");
        } else {
             AsyncStorage.removeItem("token");
        }
      }
    checkTokenValidity();
  },[])
  
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'bd46c90eac774c7ab87bce8047ed9cc5',
      scopes: ["user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public"],
      usePKCE: false,
      redirectUri: makeRedirectUri({
        scheme: 'spotify-projects'
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      AsyncStorage.setItem("token",code);
      navigation.navigate("Main")
      console.log(response);
    }
  }, [response]);



  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
    <SafeAreaView>
      <View style={{ height: 80 }} />
      <Entypo
        style={{ textAlign: "center" }}
        name="spotify"
        size={80}
        color="white"
      />
      <Text
        style={{
          color: "white",
          fontSize: 40,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 40,
        }}
      >
        Millions of Songs Free on spotify!
      </Text>

      <View style={{ height: 80 }} />
      <Pressable
           onPress={() => {
            promptAsync();
          }}
        style={{
          backgroundColor: "#1DB954",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginVertical:10
        }}
      >
        <Text>Sign In with spotify</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#131624",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"row",
          alignItems:"center",
          marginVertical:10,
          borderColor:"#C0C0C0",
          borderWidth:0.8
        }}
      >
        <MaterialIcons name="phone-android" size={24} color="white" />
        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
      </Pressable>

      <Pressable
      
        style={{
          backgroundColor: "#131624",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"row",
          alignItems:"center",
          marginVertical:10,
          borderColor:"#C0C0C0",
          borderWidth:0.8
        }}
      >
      <AntDesign name="google" size={24} color="red" />
        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with Google</Text>
      </Pressable>

      <Pressable
        style={{
          backgroundColor: "#131624",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          flexDirection:"row",
          alignItems:"center",
          marginVertical:10,
          borderColor:"#C0C0C0",
          borderWidth:0.8
        }}
      >
       <Entypo name="facebook" size={24} color="blue" />
        <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign In with facebook</Text>
      </Pressable>
    </SafeAreaView>
  </LinearGradient>
  )
}

export default LoginScreen

const styles = StyleSheet.create({});
