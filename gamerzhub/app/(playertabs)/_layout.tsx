// import { Tabs } from 'expo-router';
// import React from 'react';

// import { HapticTab } from '@/components/haptic-tab';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }



// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TabsLayout() {
//   return (
//     <Tabs screenOptions={{ headerShown: false }}>

//       <Tabs.Screen
//         name="../player/home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="search" size={size} color={color} />
//           ),
//         }}
//       />

//     </Tabs>
//   );
// }

// import { Tabs } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,        // header yahan nahi chahiye kyunki drawer ka header use hoga
//       }}
//     >
//       <Tabs.Screen
//         name="home"                // yeh (tabs)/home.tsx se match karega
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="search" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }


import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,        // Default sab tabs pe header hide
        tabBarStyle: { backgroundColor: '#0f172a' }, // optional
      }}
    >
      {/* === SIRF HOME PE HEADER + HAMBURGER === */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true,                          // ← Sirf yahan header on
          headerLeft: () => <DrawerToggleButton />,   // ← Yeh 3 lines wala button
          // headerTitle: 'GamerzHub',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#440aa8',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Explore - No Header */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}