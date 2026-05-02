

// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }} />
//   );
// }





// import { Drawer } from 'expo-router/drawer';
// import { DrawerToggleButton } from '@react-navigation/drawer';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerShown: true,                    // Header dikhega
//           headerLeft: () => <DrawerToggleButton />, // Yeh automatic 3 lines wala button deta hai
//           drawerStyle: { width: 280 },          // Optional: drawer ki width
//         }}
//       >
//         {/* Drawer mein sirf yeh ek entry hoga jo pura tabs group kholega */}
//         <Drawer.Screen
//           name="(tabs)"
//           options={{
//             title: 'GamerzHub',
//             drawerLabel: 'Main Menu',
//             headerTitle: 'GamerzHub',           // Header mein title
//           }}
//         />
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }


// import { Drawer } from 'expo-router/drawer';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// export default function RootLayout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerShown: false,        // ← Sab jagah header hide by default
//           drawerStyle: { width: 280 },
//         }}
//       >
//         <Drawer.Screen
//           name="(playertabs)"
//           options={{
//             // title: 'GamerzHub',
          //   drawerLabel: 'Main',
          // }}
        // />

        {/* Agar aur screens hain jaise role, profile etc. to unko bhi add kar sakte ho */}
        {/* <Drawer.Screen name="(auth)" options={{ drawerLabel: 'Auth' }} /> */}
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }


import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: { width: 300 },
          drawerActiveBackgroundColor: '#3b82f6',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#cbd5e1',
        }}
      >
        {/* Sirf yeh screens Drawer mein dikhenge */}
        <Drawer.Screen
          name="(playertabs)"
          options={{
            title: 'Home',
            drawerLabel: '🏠 Home',
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="explore"                    // Agar explore alag screen hai to
          options={{
            title: 'Explore',
            drawerLabel: '🔍 Explore',
          }}
        />

        {/* Join Room / My Room - Yeh important hai tumhare liye */}
        <Drawer.Screen
          name="player/room"                 // apna actual path daal do
          options={{
            title: 'Join Room',
            drawerLabel: '🎮 My Room / Join Room',
          }}
        />

        <Drawer.Screen
          name="player/tournament"           // My Tournaments
          options={{
            title: 'My Tournaments',
            drawerLabel: '🏆 My Tournaments',
          }}
        />
        <Drawer
  screenOptions={{
    headerShown: false,
    drawerStyle: { width: 300 },
  }}
  // Yeh important hai - sirf jo explicitly Drawer.Screen mein define kiye hain wahi dikhega
></Drawer>

        {/* Agar aur chahiye to yahan add kar sakte ho */}
        {/* 
        <Drawer.Screen 
          name="profile" 
          options={{ drawerLabel: '👤 Profile' }} 
        /> 
        */}

      </Drawer>
    </GestureHandlerRootView>
  );
}