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

// export default function ForgotPassword() {
//   const router = useRouter();
//   const [phone, setPhone] = useState("");
//   const sendOtp = async () => {
//   try {
//     const res = await fetch("http://192.168.31.126:8000/api/v1/host/sendotp",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify({
//         phone: phone
//       })
//     });

//     const data = await res.json();
//     console.log("data is ",data);

//     alert("Your OTP is: " + data.data.otp);
//    

//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <Text style={styles.subtitle}>
//         Enter your registered phone number
//       </Text>

//       <TextInput
//         placeholder="Phone Number"
//         placeholderTextColor="#94a3b8"
//         keyboardType="number-pad"
//         style={styles.input}
//         value={phone}
//         onChangeText={setPhone}
//       />

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={sendOtp}
//       >
//         <Text style={styles.btnText}>Send OTP</Text>
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
//   },

//   subtitle: {
//     textAlign: "center",
//     color: "#94a3b8",
//     marginVertical: 12,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "#1e293b",
//     borderRadius: 10,
//     padding: 14,
//     color: "#fff",
//     marginTop: 20,
//   },

//   btn: {
//     backgroundColor: "#38bdf8",
//     padding: 14,
//     borderRadius: 10,
//     marginTop: 25,
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
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (phone.length !== 10) {
      alert("Invalid Number Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://192.168.31.126:8000/api/v1/host/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone,
        }),
      });

      const data = await res.json();
      console.log("data is ", data);

      if (data.success) {
        alert(
          "OTP Sent We have sent a verification code to your phone number"+data.data.otp
        );
        router.push({
                  pathname: "./otpverify",
                  params: { phone: phone },
                })
      } else {
        alert("Error Failed to send OTP"+data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error Something went wrong. Please try again.");
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
      >
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="lock-closed" size={68} color="#67e8f9" />
          <Text style={styles.title}>FORGOT PASSWORD</Text>
          <Text style={styles.subtitle}>
            Don't worry, we'll help you reset it
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>REGISTERED PHONE NUMBER</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              placeholder="98765 43210"
              placeholderTextColor="#64748b"
              keyboardType="number-pad"
              maxLength={10}
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendOtp}
            disabled={loading}
          >
            <LinearGradient
              colors={["#67e8f9", "#22d3ee"]}
              style={styles.gradientButton}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text style={styles.buttonText}>SEND OTP</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.note}>
            You will receive a 6-digit OTP on this number
          </Text>
        </View>

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backLink}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Back to Login</Text>
        </TouchableOpacity>
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
  },

  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#67e8f9",
    marginTop: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#1e2937",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  countryCode: {
    color: "#67e8f9",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    color: "#f1f5f9",
    fontSize: 18,
  },

  sendButton: {
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

  note: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    marginTop: 20,
  },

  backLink: {
    marginTop: 32,
    alignItems: "center",
  },
  backText: {
    color: "#94a3b8",
    fontSize: 16,
    fontWeight: "600",
  },
});