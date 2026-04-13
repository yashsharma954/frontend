




// import { View, Text, StyleSheet, Animated, Easing } from "react-native";
// import { useEffect, useRef } from "react";
// import { useRouter } from "expo-router";
// import { Audio } from "expo-av";

// export default function SplashScreen() {
//   const router = useRouter();

//   // Initial animation values
//   const scale = useRef(new Animated.Value(0.7)).current;
//   const opacity = useRef(new Animated.Value(0)).current;
//   const textOpacity = useRef(new Animated.Value(0)).current;
//   const textY = useRef(new Animated.Value(30)).current;

//   useEffect(() => {
//     let soundObject: Audio.Sound | null = null;

//     async function playSound() {
//       try {
//         const { sound } = await Audio.Sound.createAsync(
//           require("../assets/sound/startup.mp3")
//         );
//         soundObject = sound;
//         await sound.playAsync();
//       } catch (e) {
//         console.log("Sound error", e);
//       }
//     }

//     playSound();

//     // Professional Staggered Animation Sequence
//     Animated.sequence([
//       // 1. Fade in and spring the logo up (premium "pop" feel)
//       Animated.parallel([
//         Animated.spring(scale, {
//           toValue: 1,
//           tension: 20,
//           friction: 6, // Lower friction = more bounce
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacity, {
//           toValue: 1,
//           duration: 800,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),

//       // 2. Slide up and fade in the text shortly after the logo
//       Animated.parallel([
//         Animated.timing(textOpacity, {
//           toValue: 1,
//           duration: 600,
//           easing: Easing.out(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.spring(textY, {
//           toValue: 0,
//           tension: 40,
//           friction: 8,
//           useNativeDriver: true,
//         }),
//       ]),

//       // 3. Hold for a moment so the user can read it
//       Animated.delay(1200),

//       // 4. Smooth, rapid exit animation
//       Animated.parallel([
//         Animated.timing(opacity, {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.in(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(textOpacity, {
//           toValue: 0,
//           duration: 400,
//           easing: Easing.in(Easing.cubic),
//           useNativeDriver: true,
//         }),
//         Animated.timing(scale, {
//           toValue: 1.1, // Slight zoom in as it fades out
//           duration: 400,
//           easing: Easing.in(Easing.cubic),
//           useNativeDriver: true,
//         }),
//       ]),
//     ]).start(() => {
//       // Transition to the next screen
//       router.replace("/(auth)/role");
//     });

//     // Cleanup sound on unmount to prevent memory leaks
//     return () => {
//       if (soundObject) {
//         soundObject.unloadAsync();
//       }
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.Image
//         source={require("../assets/images/splashicon.png")}
//         style={[
//           styles.logo,
//           {
//             transform: [{ scale }],
//             opacity,
//           },
//         ]}
//         resizeMode="contain"
//       />

//       <Animated.Text
//         style={[
//           styles.text,
//           {
//             opacity: textOpacity,
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
//     backgroundColor: "#0f172a", // Slate-900: A richer dark backdrop
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     width: 180,
//     height: 180,
//     marginBottom: 24,
//     // Add subtle glow to logo (works mostly on iOS, use elevation for Android if needed)
//     shadowColor: "#38bdf8",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 20,
//   },
//   text: {
//     color: "#e0f2fe", // Sky-100: Softer white-blue for premium text
//     fontSize: 32,
//     fontWeight: "800",
//     letterSpacing: 2.5,
//     // Subtle neon glow for gaming aesthetic
//     textShadowColor: "rgba(56, 189, 248, 0.6)",
//     textShadowOffset: { width: 0, height: 4 },
//     textShadowRadius: 12,
//   },
// });


import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Animation Values
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(60)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(40)).current;

  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.3)).current;

  let soundObject: Audio.Sound | null = null;

  useEffect(() => {
    // Play premium startup sound
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sound/startup.mp3")
        );
        soundObject = sound;
        await sound.setVolumeAsync(0.7);
        await sound.playAsync();
      } catch (e) {
        console.log("Sound playback error:", e);
      }
    };

    playSound();

    // Cinematic Animation Sequence
    Animated.sequence([
      // Step 1: Logo fade in + pop from bottom
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 25,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoTranslateY, {
          toValue: 0,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Step 2: Text appears with smooth slide
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(textTranslateY, {
          toValue: 0,
          tension: 45,
          friction: 9,
          useNativeDriver: true,
        }),
      ]),

      // Step 3: Tagline fades in
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),

      // Step 4: Hold the beautiful frame
      Animated.delay(1400),

      // Step 5: Elegant fade out with slight zoom
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1.15,
          tension: 50,
          friction: 12,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      router.replace("/(auth)/role"); // Change this if your route is different
    });

    // Cleanup
    return () => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Dynamic Background Gradient */}
      <LinearGradient
        colors={["#0a0e17", "#1e2937", "#0f172a"]}
        style={styles.background}
      />

      {/* Subtle Animated Glow Ring */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            opacity: glowOpacity,
            transform: [{ scale: logoScale }],
          },
        ]}
      />

      {/* Main Logo */}
      <Animated.Image
        source={require("../assets/images/splashicon.png")}
        style={[
          styles.logo,
          {
            transform: [
              { scale: logoScale },
              { translateY: logoTranslateY },
            ],
            opacity: logoOpacity,
          },
        ]}
        resizeMode="contain"
      />

      {/* App Name */}
      <Animated.Text
        style={[
          styles.appName,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        GAMERZHUB
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        style={[
          styles.tagline,
          { opacity: taglineOpacity },
        ]}
      >
        COMPETE • WIN • DOMINATE
      </Animated.Text>

      {/* Version / Footer */}
      <Text style={styles.version}>v1.0 • Esports Arena</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0a0e17",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  /* Glow Ring behind logo */
  glowRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#67e8f9",
    opacity: 0.25,
    shadowColor: "#67e8f9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    shadowColor: "#67e8f9",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },

  appName: {
    fontSize: 42,
    fontWeight: "900",
    color: "#67e8f9",
    letterSpacing: 6,
    textShadowColor: "#67e8f9",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 25,
    marginBottom: 8,
  },

  tagline: {
    fontSize: 15,
    color: "#e0f2fe",
    fontWeight: "600",
    letterSpacing: 4,
    opacity: 0.9,
    marginBottom: 60,
  },

  version: {
    position: "absolute",
    bottom: 40,
    color: "#64748b",
    fontSize: 12,
    fontWeight: "500",
  },
});
