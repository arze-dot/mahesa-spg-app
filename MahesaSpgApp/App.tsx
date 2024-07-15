import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

// Define types for navigation
type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

type InputStackParamList = {
  InputHome: undefined;
  Outlet: undefined;
  Product: undefined;
  Aset: undefined;
  SPG: undefined;
};

type DashboardTabParamList = {
  Home: undefined;
  Input: undefined;
  Report: undefined;
};

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login</Text>
    <Button title="Go to Dashboard" onPress={() => navigation.navigate('Dashboard')} />
  </View>
);

const HomeScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home</Text>
  </View>
);

const ReportScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Report</Text>
  </View>
);

const OutletScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Outlet</Text>
  </View>
);

const ProductScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Product</Text>
  </View>
);

const AsetScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Aset</Text>
  </View>
);

const SPGScreen: React.FC = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>SPG</Text>
  </View>
);

const InputHomeScreen: React.FC<NativeStackScreenProps<InputStackParamList, 'InputHome'>> = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Outlet')}>
      <Text style={styles.cardText}>Outlet</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Product')}>
      <Text style={styles.cardText}>Product</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Aset')}>
      <Text style={styles.cardText}>Aset</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SPG')}>
      <Text style={styles.cardText}>SPG</Text>
    </TouchableOpacity>
  </View>
);

// Create the necessary navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<DashboardTabParamList>();
const InputStack = createNativeStackNavigator<InputStackParamList>();

function InputStackNavigator() {
  return (
    <InputStack.Navigator >
      <InputStack.Screen name="InputHome" component={InputHomeScreen} />
      <InputStack.Screen name="Outlet" component={OutletScreen} />
      <InputStack.Screen name="Product" component={ProductScreen} />
      <InputStack.Screen name="Aset" component={AsetScreen} />
      <InputStack.Screen name="SPG" component={SPGScreen} />
    </InputStack.Navigator>
  );
}

function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Input" component={InputStackNavigator} />
      <Tab.Screen name="Report" component={ReportScreen} />
    </Tab.Navigator>
  );
}

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
  },
});

export default App;
