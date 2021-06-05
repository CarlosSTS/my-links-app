import React from "react"
import { createStackNavigator } from "@react-navigation/stack";

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
        options={({ route }) => {
        
         return({ title: route.params })
        }}
      />

    </Stack.Navigator>

  )
}

export default StackRoutes;