import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Countries from "@app/screens/Countries";
import CountryDetail from "@app/screens/CountryDetail";

const Stack = createNativeStackNavigator();

export default function () {
  return (
    <>
      <Stack.Navigator
        initialRouteName={"Countries"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={'Countries'}
          component={Countries}
        />
        <Stack.Screen
          name={'CountryDetail'}
          component={CountryDetail}
        />
        
      </Stack.Navigator>
    </>
  );
}
