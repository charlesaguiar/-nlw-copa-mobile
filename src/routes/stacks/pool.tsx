import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Details from "@screens/private/Details";
import Find from "@screens/private/Find";
import Pools from "@screens/private/Pools";

const Stack = createNativeStackNavigator();

export default function PoolStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="list" component={Pools} />
      <Stack.Screen name="find" component={Find} />
      <Stack.Screen name="details" component={Details} />
    </Stack.Navigator>
  );
}
