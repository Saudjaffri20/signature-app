import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import SignatureScreen from './src/screens/Signature';



const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
            <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />    
            <Stack.Screen options={{headerShown: true, title : "Go Back"}} name="Signature" component={SignatureScreen} />    
      </Stack.Navigator>
    </NavigationContainer>
  );
}

