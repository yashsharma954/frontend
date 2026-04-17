

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ActivityIndicator,
//   Alert,
//   Platform,
//   ScrollView,
//   KeyboardAvoidingView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import * as ImagePicker from "expo-image-picker";

// export default function HostRegister() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // Validation Functions
//   const isValidPhone = (phone: string): boolean => {
//     const phoneRegex = /^[0-9]{10}$/;
//     return phoneRegex.test(phone);
//   };

//   // const isValidUsername = (username: string): boolean => {
//   //   return /^[a-zA-Z0-9_]{3,20}$/.test(username);
//   // };

//   // Image Picker
//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setPhoto(result.assets[0].uri);
//     }
//   };

//   const removePhoto = () => setPhoto(null);

//   // Main Register Handler
//   const handleRegister = async () => {
//     // Basic Validation
//     if (!name.trim() || !username.trim() || !phone || !password || !confirmPassword) {
//       alert("Missing Fields All fields are required.");
//       return;
//     }

    

//     if (!isValidPhone(phone)) {
//       alert("Invalid Phone Please enter a valid 10-digit phone number.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Password Mismatch Passwords do not match.");
//       return;
//     }

//     if (password.length < 6) {
//       alert("Weak Password Password must be at least 6 characters long.");
//       return;
//     }

//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name.trim());
//     formData.append("username", username.trim().toLowerCase());
//     formData.append("phone", phone);
//     formData.append("password", password);

//     if (photo) {
//       if (Platform.OS === "web") {
//         const response = await fetch(photo);
//         const blob = await response.blob();
//         formData.append("avatar", blob, "avatar.jpg");
//       } else {
//         formData.append("avatar", {
//           uri: photo,
//           type: "image/jpeg",
//           name: "avatar.jpg",
//         } as any);
//       }
//     }

//     try {
//       const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/register", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         alert("Registration Failed",  );
//         return;
//       }

//       // alert("Success Host account created successfully!", [
//       //   { text: "OK", onPress: () => router.replace("./login") },
//       // ]);

//       alert("Host account created successfully ✅");

//     router.replace("./login");

//     } catch (error) {
//       console.error("Registration Error:", error);
//       alert("Connection Error Unable to connect to server. Please check your internet.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
//         {/* Header */}
//         <Text style={styles.logo}>GamerzHub</Text>
//         <Text style={styles.title}>Create Host Account</Text>

//         {/* Avatar Picker */}
//         <TouchableOpacity
//           style={styles.avatarContainer}
//           onPress={photo ? removePhoto : pickImage}
//           activeOpacity={0.8}
//         >
//           {/* <Image
//             source={photo ? { uri: photo } : require("../../assets/images/icon.png")}
//             style={styles.avatar}
//           /> */}
//           <Image
//                source={
//                  photo
//                   ? { uri: photo }
//                 : require("../../assets/images/icon.png")
//                 }
//             style={styles.avatar}
//             />
//           <View style={styles.avatarOverlay}>
//             <Text style={styles.avatarText}>
//               {photo ? "Remove Photo" : "Add Profile Photo"}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* Input Fields */}
//         <TextInput
//           placeholder="Full Name"
//           placeholderTextColor="#94a3b8"
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           autoCapitalize="words"
//         />

//         <TextInput
//           placeholder="Username (unique)"
//           placeholderTextColor="#94a3b8"
//           style={styles.input}
//           value={username}
//           onChangeText={setUsername}
//           autoCapitalize="none"
//           autoCorrect={false}
//         />

//         <TextInput
//           placeholder="Phone Number"
//           placeholderTextColor="#94a3b8"
//           keyboardType="number-pad"
//           maxLength={10}
//           style={styles.input}
//           value={phone}
//           onChangeText={setPhone}
//         />

//         <TextInput
//           placeholder="Password"
//           placeholderTextColor="#94a3b8"
//           secureTextEntry
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//         />

//         <TextInput
//           placeholder="Confirm Password"
//           placeholderTextColor="#94a3b8"
//           secureTextEntry
//           style={styles.input}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//         />

//         {/* Register Button */}
//         <TouchableOpacity
//           style={[styles.btn, loading && styles.btnDisabled]}
//           onPress={handleRegister}
//           disabled={loading}
//           activeOpacity={0.85}
//         >
//           {loading ? (
//             <ActivityIndicator color="#0e2cb2" size="small" />
//           ) : (
//             <Text style={styles.btnText}>Create Host Account</Text>
//           )}
//         </TouchableOpacity>

//         {/* Login Link */}
//         <TouchableOpacity onPress={() => router.push("./login")} style={styles.linkContainer}>
//           <Text style={styles.linkText}>
//             Already a host? <Text style={styles.linkHighlight}>Login here</Text>
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#020617",
//     justifyContent: "center",
//     padding: 24,
//     paddingTop: 60,
//   },

//   logo: {
//     textAlign: "center",
//     fontSize: 32,
//     fontWeight: "900",
//     color: "#38bdf8",
//     marginBottom: 8,
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 18,
//     color: "#e5e7eb",
//     marginBottom: 30,
//     fontWeight: "600",
//   },

//   avatarContainer: {
//     alignSelf: "center",
//     marginBottom: 30,
//     position: "relative",
//   },

//   avatar: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: "#38bdf8",
//   },

//   avatarOverlay: {
//     position: "absolute",
//     bottom: -10,
//     backgroundColor: "#0f172a",
//     paddingHorizontal: 14,
//     paddingVertical: 4,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#38bdf8",
//   },

//   avatarText: {
//     color: "#38bdf8",
//     fontSize: 12,
//     fontWeight: "600",
//   },

//   input: {
//     backgroundColor: "#020617",
//     borderWidth: 1.5,
//     borderColor: "#1e293b",
//     borderRadius: 12,
//     padding: 16,
//     color: "#fff",
//     fontSize: 16,
//     marginBottom: 16,
//   },

//   btn: {
//     backgroundColor: "#38bdf8",
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: "center",
//   },

//   btnDisabled: {
//     opacity: 0.7,
//   },

//   btnText: {
//     color: "#020617",
//     fontWeight: "800",
//     fontSize: 16,
//   },

//   linkContainer: {
//     alignItems: "center",
//   },

//   linkText: {
//     color: "#94a3b8",
//     fontSize: 15,
//   },

//   linkHighlight: {
//     color: "#38bdf8",
//     fontWeight: "600",
//   },
// });



import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function HostRegister() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Validation
  const isValidPhone = (phone: string): boolean => /^[0-9]{10}$/.test(phone);

  // Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const removePhoto = () => setPhoto(null);

  // Register Handler
  const handleRegister = async () => {
    if (!name.trim() || !username.trim() || !phone || !password || !confirmPassword) {
      alert("Missing Fields All fields are required");
      return;
    }

    if (!isValidPhone(phone)) {
      alert("Invalid Phone Please enter a valid 10-digit phone number");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password Mismatch Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Weak Password Password must be at least 6 characters long");
      return;
    }

    if (username.length < 3) {
      alert("Invalid Username Username must be at least 3 characters");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("username", username.trim().toLowerCase());
    formData.append("phone", phone);
    formData.append("password", password);

    if (photo) {
      if (Platform.OS === "web") {
        const response = await fetch(photo);
        const blob = await response.blob();
        formData.append("avatar", blob, "avatar.jpg");
      } else {
        formData.append("avatar", {
          uri: photo,
          type: "image/jpeg",
          name: "avatar.jpg",
        } as any);
      }
    }

    try {
      const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert(
          "🎉 Account Created Your host account has been created successfully." 
        );
        router.replace("./login");
      } else {
        alert("Registration Failed Something went wrong"+ data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Connection Error unable to connect to server. Please check your internet.");
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
          <Ionicons name="trophy" size={60} color="#67e8f9" />
          <Text style={styles.logo}>GAMERZHUB</Text>
          <Text style={styles.title}>BECOME A TOURNAMENT HOST</Text>
          <Text style={styles.subtitle}>
            Create epic events and lead the arena
          </Text>
        </View>

        {/* Avatar Picker */}
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={photo ? removePhoto : pickImage}
          activeOpacity={0.85}
        >
          <Image
            source={
              photo
                ? { uri: photo }
                : require("../../assets/images/icon.png")
            }
            style={styles.avatar}
          />
          
          <View style={styles.avatarOverlay}>
            <Text style={styles.avatarText}>
              {photo ? "CHANGE PHOTO" : "ADD PROFILE PHOTO"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <TextInput
            placeholder="Username (unique)"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#64748b"
            keyboardType="number-pad"
            maxLength={10}
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            placeholder="Create Password"
            placeholderTextColor="#64748b"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#64748b"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, loading && styles.buttonDisabled]}
            onPress={handleRegister}
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
                <Text style={styles.buttonText}>CREATE HOST ACCOUNT</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity 
            onPress={() => router.push("./login")} 
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already a host?{" "}
              <Text style={styles.loginHighlight}>Login here →</Text>
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
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 34,
    fontWeight: "900",
    color: "#67e8f9",
    letterSpacing: 2,
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 20,
  },

  avatarContainer: {
    alignSelf: "center",
    marginBottom: 32,
    position: "relative",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#67e8f9",
    shadowColor: "#67e8f9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  avatarOverlay: {
    position: "absolute",
    bottom: -12,
    alignSelf: "center",
    backgroundColor: "#1e2937",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#67e8f9",
  },
  avatarText: {
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  formContainer: {
    width: "100%",
  },

  input: {
    backgroundColor: "#1e2937",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    padding: 18,
    color: "#f1f5f9",
    fontSize: 16,
    marginBottom: 16,
  },

  registerButton: {
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
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
  buttonDisabled: {
    opacity: 0.7,
  },

  loginLink: {
    marginTop: 28,
    alignItems: "center",
  },
  loginText: {
    color: "#94a3b8",
    fontSize: 15.5,
  },
  loginHighlight: {
    color: "#67e8f9",
    fontWeight: "700",
  },
});