import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "@screens/public/SignIn";
import Register from "@screens/public/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function PublicRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="signin" component={SignIn} />
      <Screen name="register" component={Register} />
    </Navigator>
  );
}
