import { openDatabase } from 'react-native-sqlite-storage';
import { Alert, Platform } from "react-native";
import axios from 'axios';

export const baseUrl = 'https://hacker-news.firebaseio.com/v0';
export const topStories = `${baseUrl}/topstories.json`; 
export const itemUrl = `${baseUrl}/item/`;
//https://hacker-news.firebaseio.com/v0/item/28836903.json?print=pretty

export const db = openDatabase(
    
    {
        name: 'MainDb',
        location:"default"
    },
    () => { },
    (error) => {
        console.log(error)
    }
)

export const createTable = () => {
       
    db.transaction(tx => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);"
        )
    })
}


export const getUserData = () => {
    return new Promise((res, rej) => {
        try {
           db.transaction((tx) => {
              tx.executeSql(
                    "SELECT Name FROM Users",
                    [],
                    (tx, results) => {
                        let len = results.rows.length;
                       
                        if (len > 0) {
                            // console.log(len)
                            let username = results.rows.item(len-1).Name;
                            console.log('Adding name to db', username)
                            res(username);
                        }
                    }
                )
            })
      
        } catch (error) {
            console.log(error)
        }
    })
    
}
  

export const setUserData = async (user) => {
    if (user.length == 0) {
        if (Platform.OS == "android") {
            Alert.alert('Warning!', "Please enter your name")
        } else {
            alert('Warning!', "Please enter your name")
        }
    } else {
        try {
           await db.transaction(async (tx) => {
               await tx.executeSql(
                    "INSERT INTO Users (Name) VALUES('" + user + "')"
                //    "INSERT INTO Users (Name) VALUES(?)",
                //    [name]
                )
           })
           
            return user;
    
        } catch (error){
    console.log(error)
        }
    }

}


    export const getStoriesIds = async (st, limit) => {
        try {
            const res = await axios.get(topStories).then(({ data }) => data)
            return res.slice(st, limit);
        } catch (err) {
            console.log(err)
        }
    }

    export const getStory = async (storyId) => {
        try {
            const res = await axios.get(`${itemUrl + storyId}.json`).then(({ data }) => data)
        
            return res;
        } catch (err) {
            console.error(err);
        }
    }



    export function formatDate(timestamp) {
        const d = new Date(timestamp);
        const time = d.toLocaleTimeString("en-US");
        return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
      }


