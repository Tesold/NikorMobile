import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect, useSelector } from 'react-redux';
import { RootState} from '../redux/store';
import { LoginScreen } from '../src/views/LoginViews/LogInView';
import { LoginStackNavigator } from './loginStack/loginStack';
import { MainTabs } from './MainNavigation';
 
export function AppView()
{
    
    const Stack = createNativeStackNavigator();
    
    let isLogin = useSelector((state:RootState) => state.login.isLOG_IN);

    console.log('isLogin: '+isLogin);

    return(
    <Stack.Navigator>
        {isLogin ?<Stack.Screen options = {{headerShown: false}} name="Home" component={MainTabs} />:
            <Stack.Screen options = {{headerShown: false}} name="LoginScreen" component={LoginStackNavigator} />}
    </Stack.Navigator>
    )
  }