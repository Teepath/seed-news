import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SafeAreaView, View, StyleSheet, Text, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import { white, red, } from './utils/colors';
import { Image } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import { createTable, db } from './utils/api_data';
import { setUserActionCreator, getUserHandle} from "./action/action"
import { Headline, withTheme  } from 'react-native-paper';


// const db = openDatabase(
    
//     {
//         name: 'MainDb',
//         location:"default"
//     },
//     () => { },
//     (error) => {
//         console.log(error)
//     }
// )

function Login ({navigation}) {
    const [name, setName] = useState("");
    const dispatch = useDispatch()

    //create Taber
    
    // const { dispatch, navigation, deckId } = props;
    const handleName = (val) => {
        console.log(val)
      setName(val)

    }

    useEffect(() => {
    createTable();
    dispatch(getUserHandle(navigation))    
    }, [])

   
    const handleSubmit = () => {
        if (name.length == 0) {
            if (Platform.OS == "android" || Platform.OS =='ios') {
                Alert.alert("Warning!", 'Please write your your name')  
            } else {
                alert('Please enter your email')
            }

        } else {
            if (Platform.OS == "android") {
               dispatch(setUserActionCreator(name, navigation))
            }
         
        }
        
       
    }

    const { colors, fonts } = useTheme();
  
    return (
        <View style={styles.container}>
            <Text style={{ color: colors.accent, fontSize: 40, margin:10}}> Daily News  </Text>
            <Image source={require('./assets/home.png')} style={styles.img} />
            
            <KeyboardAvoidingView  style={styles.input} behavior="padding">
                <TextInput value={ name} placeholder="Enter your Name" style={{fontSize: 30}}
                   onChangeText={(value)=>  handleName(value) }          
                />
                   </KeyboardAvoidingView>
                   
             <Button raised theme={{ roundness: 5 }} onPress={()=> handleSubmit()}>
            <Text style={{fontSize:Platform.OS === "web"?fonts.regular: 30}}> Login </Text>
    </Button>
                        
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#00008b',
        justifyContent: 'center',
        alignItems: "center",
        width: "100%",
    },


  
  

    img: {
        width: "30%",
        height:"10%"
    },
    input: {
        borderRadius: 10,
        borderWidth: 1,
        width: "80%",
        backgroundColor: "#fff",
        margin: 20,
        fontSize: 30,
        padding: 20
    },
});


export default Login;