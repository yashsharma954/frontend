

import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

export default function SplashScreen() {
  const router = useRouter();

  const scale = useRef(new Animated.Value(0.4)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    playSound();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(textY, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(1000),

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      router.replace("/(auth)/role");
    });
  }, []);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sound/startup.mp3")
      );
      await sound.playAsync();
    } catch (e) {
      console.log("Sound error", e);
    }
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/splash_icon.png")}
        style={[
          styles.logo,
          {
            transform: [{ scale }, { rotate: rotation }],
            opacity,
          },
        ]}
      />

      <Animated.Text
        style={[
          styles.text,
          {
            opacity,
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
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 14,
  },
  text: {
    color: "#38bdf8",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
});

