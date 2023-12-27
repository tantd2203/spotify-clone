import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import HomeScreen from "./screens/HomeScreen";

function BottomTabs(){
    
    return (
        <Tab.Navigator>
            <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel : "Home",
                headerShown : false ,
                tabBarStyle :{color: "white"}

            }}
            />
        </Tab.Navigator>
    )
}