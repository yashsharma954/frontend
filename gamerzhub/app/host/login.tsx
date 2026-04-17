// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useState,useCallback } from "react";
// import { useFocusEffect } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";


// export default function HostLogin() {
//   const router = useRouter();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   useFocusEffect(
//   useCallback(() => {
//     setUsername("");
//     setPassword("");
//   }, [])
// );

  
// const handleLogin = async () => {
//   try {
//     const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });

//     const data = await res.json();

//     if (!data.success) {
//       alert(data.message);
//       return;
//     }

//     alert("host logged in succesfully");
//     // 🔥 ASYNC STORAGE SAVE
//     await AsyncStorage.setItem(
//   "host",
//   JSON.stringify(data.data.host)
// );

// await AsyncStorage.setItem(
//   "token",
//   data.data.accessToken
// );

//     router.replace("./dashboard");

//   } catch (err) {
//     alert("Server error");
//   }
// };

//   return (
//     <View style={styles.container}>

//       {/* LOGO */}
//       <Text style={styles.logo}>GamerzHub</Text>

//       <Text style={styles.title}>Host Login</Text>

//       <TextInput
//         placeholder="UserName"
//         placeholderTextColor="#94a3b8"
        
//         style={styles.input}
//         value={username}
//         onChangeText={setUsername}
//       />

//       <TextInput
//         placeholder="Password"
//         placeholderTextColor="#94a3b8"
//         secureTextEntry
//         style={styles.input}
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.btn} onPress={handleLogin}>
//         <Text style={styles.btnText}>Login</Text>
//       </TouchableOpacity>
     

//       <TouchableOpacity
//   onPress={() => router.push("./forgotpassword/forgot")}
// >
//   <Text style={styles.forgot}>
//     Forgot Password?
//   </Text>
// </TouchableOpacity>


//       <TouchableOpacity onPress={() => router.push("./register")}>
//         <Text style={styles.link}>
//           Create new host account
//         </Text>
//       </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     justifyContent: "center",
//     padding: 24,
//   },

//   logo: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "900",
//     color: "#38bdf8",
//     marginBottom: 10,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#e5e7eb",
//     marginBottom: 25,
//   },

//   input: {
//     backgroundColor: "#020617",
//     borderWidth: 1,
//     borderColor: "#1e293b",
//     borderRadius: 10,
//     padding: 14,
//     color: "#fff",
//     marginBottom: 14,
//   },
//   forgot: {
//   color: "#38bdf8",
//   textAlign: "right",
//   marginBottom: 20,
//   marginTop: 5,
// },


//   btn: {
//     backgroundColor: "#38bdf8",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   btnText: {
//     color: "#020617",
//     textAlign: "center",
//     fontWeight: "800",
//     fontSize: 16,
//   },

//   link: {
//     marginTop: 18,
//     textAlign: "center",
//     color: "#94a3b8",
//   },
// });



import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HostLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Clear fields when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setUsername("");
      setPassword("");
    }, [])
  );

  const handleLogin = async () => {
    if (!username.trim() || !password) {
      alert("Missing Fields Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Login Failed Invalid credentials"+data.message);
        return;
      }

      // Save host data and token
      await AsyncStorage.setItem("host", JSON.stringify(data.data.host));
      await AsyncStorage.setItem("token", data.data.accessToken);

      alert("Welcome Back! Host login successful 🎮");

      // Navigate to Host Dashboard
      router.replace("./dashboard");

    } catch (err) {
      console.error(err);
      alert("Connection Error Unable to connect to server. Please check your internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={["#0a0e17", "#1e2937", "#0f172a"]}
        style={styles.background}
      />

      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="trophy" size={68} color="#67e8f9" />
          <Text style={styles.logo}>GAMERZHUB</Text>
          <Text style={styles.title}>HOST LOGIN</Text>
          <Text style={styles.subtitle}>
            Manage your tournaments and lead the arena
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person" size={20} color="#67e8f9" style={styles.inputIcon} />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#64748b"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed" size={20} color="#67e8f9" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#64748b"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={22} 
                color="#94a3b8" 
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity 
            style={styles.forgotContainer}
            onPress={() => router.push("./forgotpassword/forgot")}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={["#67e8f9", "#22d3ee"]}
              style={styles.gradientButton}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" size="small" />
              ) : (
                <Text style={styles.buttonText}>LOGIN AS HOST</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Register Link */}
          <TouchableOpacity 
            onPress={() => router.push("./register")}
            style={styles.registerLink}
          >
            <Text style={styles.registerText}>
              Don't have a host account?{" "}
              <Text style={styles.registerHighlight}>Create one now →</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 80,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: "#67e8f9",
    letterSpacing: 2,
    marginTop: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f8fafc",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  formContainer: {
    width: "100%",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e2937",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    color: "#f1f5f9",
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    color: "#67e8f9",
    fontWeight: "600",
    fontSize: 15,
  },

  loginButton: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: "center",
  },
  buttonText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  registerLink: {
    marginTop: 32,
    alignItems: "center",
  },
  registerText: {
    color: "#94a3b8",
    fontSize: 15.5,
    textAlign: "center",
  },
  registerHighlight: {
    color: "#67e8f9",
    fontWeight: "700",
  },
});