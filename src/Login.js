import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SafeAreaView, View, StyleSheet, Text, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput, Platform, Alert } from 'react-native';
import { white, red, } from './utils/colors';
import { Image } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { createTable, db } from './utils/api_data';
import { setUserActionCreator, getUserHandle} from "./action/action"


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
        <SafeAreaView style={styles.container}>
            <Image source={require('./assets/home.png')} style={ styles.img}/>
            <KeyboardAvoidingView  style={styles.input} behavior="padding">
                <TextInput value={ name} placeholder="Enter your Name" style={{fontSize: 30}}
                   onChangeText={(value)=>  handleName(value) }          
                />
                   </KeyboardAvoidingView>
                   
             <Button raised theme={{ roundness: 5 }} onPress={()=> handleSubmit()}>
            <Text style={{fontSize:Platform.OS === "web"?fonts.regular: 30}}> Submit</Text>
    </Button>
                        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#00008b',
        justifyContent: 'center',
        alignItems: "center",
        width:"100%"
    },


    text: {
        fontSize: 35,
        margin: "auto",
        padding: 20
    },
    textBtn: {
        fontSize: 25,
        color: white
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