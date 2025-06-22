import { Tabs } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'HomeScreen':
              iconName = 'home';
              break;
            case 'Diary':
              iconName = 'journal';
              break;
            case 'ChatBotScreen':
              iconName = 'chatbubble-ellipses';
              break;
            case 'ProfileScreen':
              iconName = 'person';
              break;
            default:
              iconName = 'ellipse';
          }
          return <Ionicons name={`${iconName}-outline`} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4caf50',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(0, 0, 0, 0.3)',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
      })}
    >
      <Tabs.Screen name="HomeScreen" options={{ tabBarLabel: 'Home' }} />
      <Tabs.Screen name="Diary" options={{ tabBarLabel: 'Diary' }} />
      <Tabs.Screen name="ChatBotScreen" options={{ tabBarLabel: 'Assistant' }} />
      <Tabs.Screen name="ProfileScreen" options={{ tabBarLabel: 'Profile' }} />
    </Tabs>
  );
}