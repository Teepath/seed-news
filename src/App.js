
import  React, {useEffect} from 'react';
import {
  NavigationContainer, DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import RNBootSplash from "react-native-bootsplash";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, Image } from 'react-native';
import { PreferencesContext } from './utils/themeContext';
import { purple, white, black } from "./utils/colors";
import { Provider } from "react-redux";
import middlewares from "./middlewares"
import { createStore } from "redux";
import reducer from "./redux"
import {
  configureFonts, DefaultTheme, 
  // DarkTheme as PaperDarkTheme,
  // DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';


import Login from "./Login";
import HomeScreen from "./Home";
import About from './About';

import { fontConfig } from './utils/fonts';



// const CombinedDefaultTheme = {
//   ...PaperDefaultTheme,
//   ...NavigationDefaultTheme,
// };
// const CombinedDarkTheme = { ...PaperDarkTheme, ...NavigationDarkTheme };

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#bada55',
    background: "tomato"
    
  },
};


const Tab = createMaterialTopTabNavigator();

const TabNav = () => (<Tab.Navigator
  backBehavior="initialRoute"
  shifting={true}
  sceneAnimationEnabled={false}
  screenOptions={({ route }) => ({
    tabBarIcon: ({ color, size }) => {
     
        
    },
   
    tabBarActiveTintColor: Platform.OS === 'android' || Platform.OS === 'web'? purple : purple,
    style: {
      backgroundColor: purple,
    },
    indicatorStyle: {
      backgroundColor: 'yellow',
    },
    
  })}

>
  <Tab.Screen name="News" component={HomeScreen}
 
  />
  <Stack.Screen name="About" component={About} />

</Tab.Navigator>
);

const Stack = createStackNavigator();

  function App() {
  // const [isThemeDark, setIsThemeDark] = React.useState(false);
  // let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  // const toggleTheme = React.useCallback(() => {
  //   return setIsThemeDark(!isThemeDark);
  // }, [isThemeDark]);
    
    

    useEffect(() => {

      RNBootSplash.hide({ duration: 500 });

      
    }, []);


  // const preferences = React.useMemo(
  //   () => ({
  //     toggleTheme,
  //     isThemeDark,
  //   }),
  //   [toggleTheme, isThemeDark]
  // )
    
    
  const Store = createStore(reducer, middlewares);
      

    return (
      <Provider store={Store}>
    {/* <PreferencesContext.Provider value={preferences}> */}
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="Login"
            screenOptions={{
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor:'#0080ff'
              },
            }} 
          >
             <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}/>
          <Stack.Screen name="Home"  component={TabNav}  options={{ headerTitle: 'Top News' ,  headerTintColor: white, headerStyle: {
            backgroundColor: purple,
            }
            }} />
             <Tab.Screen name="News" component={HomeScreen}
 options={{ headerTitle: 'News' ,  headerTintColor: white, headerStyle: {
  backgroundColor: purple,
}
}} 
            />
 <Tab.Screen name="About" component={HomeScreen}
 options={{ headerTitle: 'About' ,  headerTintColor: white, headerStyle: {
  backgroundColor: purple,
}
}} 
 />
           
         
        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
        {/* </PreferencesContext.Provider> */}
        </Provider>
      
  );
  }

export default App;
 