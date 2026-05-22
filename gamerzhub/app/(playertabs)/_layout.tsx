



// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { DrawerToggleButton } from '@react-navigation/drawer';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,           // default sab tabs pe header band
//         tabBarStyle: { backgroundColor: '#0f172a' },
//         tabBarActiveTintColor: '#440aa8',
//         tabBarInactiveTintColor: '#94a3b8',
//       }}
//     >
//       <Tabs.Screen
//         name="home"                   // yeh (playertabs)/home.tsx hoga
//         options={{
//           title: 'Home',
//           headerShown: true,          // sirf home pe header on
//           headerLeft: () => <DrawerToggleButton tintColor="#440aa8" />,
//           headerStyle: { backgroundColor: '#0f172a' },
//           headerTintColor: '#440aa8',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       {/* Explore tab (agar chahiye to uncomment) */}
//       {/* <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="search" size={size} color={color} />
//           ),
//         }}
//       /> */}
//     </Tabs>
//   );
// }


// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { DrawerToggleButton } from '@react-navigation/drawer';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: { backgroundColor: '#0f172a' },
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: 'Home',
//           headerShown: true,
//           headerLeft: () => <DrawerToggleButton />,
//           tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f172a' },
        tabBarActiveTintColor: '#67e8f9',
        tabBarInactiveTintColor: '#94a3b8',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}