

// import { View, Text, StyleSheet, Animated } from "react-native";
// import { useEffect, useRef } from "react";
// import { useRouter } from "expo-router";
// import { Audio } from "expo-av";

// export default function SplashScreen() {
//   const router = useRouter();

//   const scale = useRef(new Animated.Value(0.4)).current;
//   const opacity = useRef(new Animated.Value(0)).current;
//   const rotate = useRef(new Animated.Value(0)).current;
//   const textY = useRef(new Animated.Value(20)).current;

//   useEffect(() => {
//     playSound();

//     Animated.sequence([
//       Animated.parallel([
//         Animated.timing(scale, {
//           toValue: 1,
//           duration: 900,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacity, {
//           toValue: 1,
//           duration: 900,
//           useNativeDriver: true,
//         }),
//         Animated.timing(textY, {
//           toValue: 0,
//           duration: 900,
//           useNativeDriver: true,
//         }),
//       ]),

//       Animated.delay(1000),

//       Animated.parallel([
//         Animated.timing(opacity, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scale, {
//           toValue: 1.2,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start(() => {
//       router.replace("/(auth)/role");
//     });
//   }, []);

//   const rotation = rotate.interpolate({
//     inputRange: [0, 1],
//     outputRange: ["0deg", "360deg"],
//   });

//   async function playSound() {
//     try {
//       const { sound } = await Audio.Sound.createAsync(
//         require("../assets/sound/startup.mp3")
//       );
//       await sound.playAsync();
//     } catch (e) {
//       console.log("Sound error", e);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require("../assets/images/splashicon.png")}
//         style={[
//           styles.logo,
//           {
//             transform: [{ scale }, { rotate: rotation }],
//             opacity,
//           },
//         ]}
//       />

//       <Animated.Text
//         style={[
//           styles.text,
//           {
//             opacity,
//             transform: [{ translateY: textY }],
//           },
//         ]}
//       >
//         GamerzHub
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 220,
//     height: 220,
//     marginBottom: 14,
//   },
//   text: {
//     color: "#38bdf8",
//     fontSize: 26,
//     fontWeight: "900",
//     letterSpacing: 1.2,
//   },
// });


import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

export default function SplashScreen() {
  const router = useRouter();

  // Initial animation values
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    let soundObject: Audio.Sound | null = null;

    async function playSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sound/startup.mp3")
        );
        soundObject = sound;
        await sound.playAsync();
      } catch (e) {
        console.log("Sound error", e);
      }
    }

    playSound();

    // Professional Staggered Animation Sequence
    Animated.sequence([
      // 1. Fade in and spring the logo up (premium "pop" feel)
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          tension: 20,
          friction: 6, // Lower friction = more bounce
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

      // 2. Slide up and fade in the text shortly after the logo
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(textY, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // 3. Hold for a moment so the user can read it
      Animated.delay(1200),

      // 4. Smooth, rapid exit animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.1, // Slight zoom in as it fades out
          duration: 400,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Transition to the next screen
      router.replace("/(auth)/role");
    });

    // Cleanup sound on unmount to prevent memory leaks
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/splashicon.png")}
        style={[
          styles.logo,
          {
            transform: [{ scale }],
            opacity,
          },
        ]}
        resizeMode="contain"
      />

      <Animated.Text
        style={[
          styles.text,
          {
            opacity: textOpacity,
            transform: [{ translateY: textY }],
          },
        ]}
      >
        GamerzHub
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Slate-900: A richer dark backdrop
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
    // Add subtle glow to logo (works mostly on iOS, use elevation for Android if needed)
    shadowColor: "#38bdf8",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  text: {
    color: "#e0f2fe", // Sky-100: Softer white-blue for premium text
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 2.5,
    // Subtle neon glow for gaming aesthetic
    textShadowColor: "rgba(56, 189, 248, 0.6)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
});
