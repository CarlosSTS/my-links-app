import React from "react"
import {useNavigation} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import {FontAwesome} from '@expo/vector-icons'

import OpenLinkBrowser from "../pages/OpenLinkBrowser";
import MyLinks from '../pages/MyLinks'

const Stack = createStackNavigator();

const StackRoutes = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: "center",
      headerBackTitleVisible: false,

      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#132742",
      },
      headerTitleStyle: {
        fontWeight:  "bold"
      },
    }}
    >
        <Stack.Screen name="MyLinks" component={MyLinks}
        options={{ headerShown:false }}
      />

      <Stack.Screen name="OpenLinkBrowser" component={OpenLinkBrowser}
        options={({ route }) => ({ title: route.params,
          headerLeft: () => {
            const {goBack} = useNavigation();
            return (
              <FontAwesome
                style={{marginLeft: 16}}
                name="chevron-left"
                size={32}
                color="#fff"
                onPress={() => goBack()}
              />
            );
          },
        }
           
    )}
      />

    </Stack.Navigator>

  )
}

export default StackRoutes;