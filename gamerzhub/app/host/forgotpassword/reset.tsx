// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { useLocalSearchParams } from "expo-router";

// export default function ResetPassword() {
//   const router = useRouter();
//   const [pass, setPass] = useState("");
//   const [confirm, setConfirm] = useState("");
//   const { phone } = useLocalSearchParams();
//   const updatePassword = async () => {
//   try {

//     const res = await fetch("http://192.168.31.126:8000/api/v1/host/resetpassword", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         phone: phone,
//         password: pass,
//         confirm: confirm
//       })
//     });

//     const text = await res.text();   // 👈 json nahi text

//     console.log("SERVER RESPONSE:", text);

//     const data = JSON.parse(text);

//     if (!res.ok) {
//       alert(data.message);   // backend error
//       return;
//     }

//     alert(data.message);     // Password changed successfully

//     // login screen par bhej do
//     router.replace("../host/login");

//   } catch (error) {
//     console.log("Reset password error:", error);
//     alert("Server error. Try again.");
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Reset Password</Text>

//       <TextInput
//         placeholder="New Password"
//         placeholderTextColor="#94a3b8"
//         secureTextEntry
//         style={styles.input}
//         value={pass}
//         onChangeText={setPass}
//       />

//       <TextInput
//         placeholder="Confirm Password"
//         placeholderTextColor="#94a3b8"
//         secureTextEntry
//         style={styles.input}
//         value={confirm}
//         onChangeText={setConfirm}
//       />

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => router.replace("/host/login")}
//       >
//         <Text style={styles.btnText}>Update Password</Text>
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

//   title: {
//     fontSize: 24,
//     fontWeight: "900",
//     color: "#38bdf8",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#1e293b",
//     borderRadius: 10,
//     padding: 14,
//     color: "#fff",
//     marginBottom: 14,
//   },

//   btn: {
//     backgroundColor: "#38bdf8",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 10,
//   },

//   btnText: {
//     textAlign: "center",
//     fontWeight: "800",
//     fontSize: 16,
//     color: "#020617",
//   },
// });


import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPassword() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const updatePassword = async () => {
    if (!pass || !confirm) {
      alert("Error Please fill in all fields");
      return;
    }

    if (pass.length < 6) {
      alert("Weak Password Password must be at least 6 characters long");
      return;
    }

    if (pass !== confirm) {
      alert("Mismatch Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://192.168.31.126:8000/api/v1/host/resetpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone,
            password: pass,
            confirm: confirm,
          }),
        }
      );

      const text = await res.text();
      console.log("SERVER RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        alert("Failed  to reset password"+data.message);
        return;
      }

      // Success
      alert("Success Password reset successfully"+data.message
      );
      router.replace("../login")
    } catch (error: any) {
      console.log("Reset password error:", error);
      alert("Error Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Header Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed-outline" size={80} color="#38bdf8" />
        </View>

        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>
          Create a strong new password for your account
        </Text>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="New Password"
            placeholderTextColor="#475569"
            secureTextEntry={!showPass}
            style={styles.input}
            value={pass}
            onChangeText={setPass}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPass(!showPass)}
          >
            <Ionicons
              name={showPass ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm New Password"
            placeholderTextColor="#475569"
            secureTextEntry={!showConfirm}
            style={styles.input}
            value={confirm}
            onChangeText={setConfirm}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirm(!showConfirm)}
          >
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#94a3b8"
            />
          </TouchableOpacity>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={updatePassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#020617" />
          ) : (
            <Text style={styles.btnText}>Update Password</Text>
          )}
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("../host/login")}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    color: "#fff",
    fontSize: 16,
    paddingRight: 50, // Space for eye icon
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  btn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  btnDisabled: {
    backgroundColor: "#64748b",
  },
  btnText: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
  },
  backButton: {
    marginTop: 24,
    alignItems: "center",
  },
  backText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },
});