// import { Drawer } from 'expo-router/drawer';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerShown: false,
//           drawerStyle: {
//             width: 300,
//             backgroundColor: '#0f172a',
//           },
//           drawerActiveBackgroundColor: '#1e40af',
//           drawerActiveTintColor: '#ffffff',
//           drawerInactiveTintColor: '#94a3b8',
//           drawerLabelStyle: { fontSize: 16, fontWeight: '500' },
//         }}
//       >
//         {/* ================== Sirf Yeh Items Drawer Mein Dikhenge ================== */}

//         <Drawer.Screen
//           name="(playertabs)"
//           options={{
//             drawerLabel: '🏠 Home',
//             title: 'Home',
//           }}
//         />

//         {/* <Drawer.Screen
//           name="explore"
//           options={{
//             drawerLabel: '🔍 Explore Tournaments',
//             title: 'Explore',
//           }}
//         /> */}

//         <Drawer.Screen
//           name="player/room"
//           options={{
//             drawerLabel: '🎮 My Room / Join Room',
//             title: 'My Room',
//           }}
//         />

//         <Drawer.Screen
//           name="player/tournament"
//           options={{
//             drawerLabel: '🏆 My Tournaments',
//             title: 'My Tournaments',
//           }}
//         />

//         <Drawer.Screen
//           name="player/payment"
//           options={{
//             drawerLabel: '💰 Wallet & Payments',
//             title: 'Wallet',
//           }}
//         />

//         {/* Logout (optional) */}
//         <Drawer.Screen
//           name="logout"   // agar logout screen bana hai to
//           options={{
//             drawerLabel: '🚪 Logout',
//             title: 'Logout',
//           }}
//         />

//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }


// // import { Tabs } from 'expo-router';

// // export default function RootLayout() {
// //   return <Tabs screenOptions={{ headerShown: false }} />;
// // }

// import { Drawer } from 'expo-router/drawer';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerShown: false,
//           drawerStyle: { width: 300, backgroundColor: '#0f172a' },
//           drawerActiveBackgroundColor: '#1e40af',
//           drawerActiveTintColor: '#ffffff',
//           drawerInactiveTintColor: '#94a3b8',
//         }}
//       >
//         <Drawer.Screen
//           name="(playertabs)"
//           options={{ drawerLabel: '🏠 Home', title: 'Home' }}
//         />

//         <Drawer.Screen
//           name="player/room"
//           options={{ drawerLabel: '🎮 My Room / Join Room' }}
//         />

//         <Drawer.Screen
//           name="player/tournament"
//           options={{ drawerLabel: '🏆 My Tournaments' }}
//         />

//         <Drawer.Screen
//           name="player/payment"
//           options={{ drawerLabel: '💰 Wallet & Payments' }}
//         />

//         {/* Host Section (Optional - agar drawer mein chahiye to) */}
//         <Drawer.Screen
//           name="(host)"
//           options={{ drawerLabel: '🎤 Host Dashboard', title: 'Host' }}
//         />

//         <Drawer.Screen
//           name="logout"
//           options={{ drawerLabel: '🚪 Logout' }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }



import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,           // Default header hide
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0a0e17' },
        }}
      >
        {/* Root Redirect Screen */}
        <Stack.Screen name="index" />

        {/* Player Tabs Group */}
        <Stack.Screen 
          name="(playertabs)" 
          options={{ animation: 'fade' }} 
        />

        {/* Host Group */}
        <Stack.Screen 
          name="(host)" 
          options={{ animation: 'fade' }} 
        />

        {/* Auth Screens */}
        <Stack.Screen name="(auth)" />

        {/* Other Individual Screens */}
        <Stack.Screen name="player/room" />
        <Stack.Screen name="player/tournament" />
        <Stack.Screen name="player/payment" />
        <Stack.Screen name="logout" />
      </Stack>
    </GestureHandlerRootView>
  );
}