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

// export default function OTPVerify() {
//   const router = useRouter();
//   const [otp, setOtp] = useState("");
//   const { phone } = useLocalSearchParams();
//   const verifyOtp = async () => {
//   try {

//     const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/verifyotp", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         phone: phone,
//         otp: otp
//       })
//     });

//      const text = await res.text();   // 👈 json nahi text

//     console.log("SERVER RESPONSE:", text);

//     const data = JSON.parse(text);
//     if (!res.ok) {
//       // server error (invalid password, user not found etc.)
//       alert(data.message);
//       return;
//     }
    

    

//       alert("OTP Verified Successfully");

//       // next screen (reset password)
//       router.push({
//         pathname: "./reset",
//         params: { phone: phone }
//       });

     

//   } catch (error) {
//     console.log("OTP verify error:", error);
//     alert(error);
//   }
// };

// const resendotp = async ()=>{
//   try {
//     const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/host/resendotp",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify({
//         phone: phone
//       })
//     });

//     const data = await res.json();
//      if (!res.ok) {
//       // server error (invalid password, user not found etc.)
//       alert(data.message);
//       return;
//     }
    

//     alert("Your OTP is: " + data.data.otp);
//     router.push({
//   pathname: "./otpverify",
//   params: { phone: phone }
// })

//   } catch (error) {
//     console.log(error);
//     alert("server error ");
//   }
// }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify OTP</Text>
//       <Text style={styles.subtitle}>
//         Enter 6 digit OTP sent to your phone
//       </Text>

//       <TextInput
//         placeholder="Enter OTP"
//         placeholderTextColor="#94a3b8"
//         keyboardType="number-pad"
//         maxLength={6}
//         style={styles.input}
//         value={otp}
//         onChangeText={setOtp}
//       />

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={verifyOtp}
//       >
//         <Text style={styles.btnText}>Verify</Text>
         
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={resendotp}
//       >
//         <Text style={styles.btnText}>Resend OTP</Text>
         
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
//     borderRadius: 12,
//     padding: 16,
//     color: "#fff",
//     letterSpacing: 6,
//     textAlign: "center",
//     fontSize: 18,
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

//   resend: {
//     color: "#94a3b8",
//     textAlign: "center",
//     marginTop: 18,
//   },
// });


// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { useState, useEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";

// export default function OTPVerify() {
//   const router = useRouter();
//   const { phone } = useLocalSearchParams<{ phone: string }>();

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [timer, setTimer] = useState(60); // Resend OTP timer
//   const [canResend, setCanResend] = useState(false);

//   // Masked phone number for display (e.g., +91 ******1234)
//   const maskedPhone = phone
//     ? `+91 ${phone.slice(0, 2)}******${phone.slice(-4)}`
//     : "";

//   // Countdown timer for Resend OTP
//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   const verifyOtp = async () => {
//     if (otp.length !== 6) {
//       alert("Invalid OTP Please enter a 6-digit OTP");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(
//         "https://gamerzhub-backend.onrender.com/api/v1/host/verifyotp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone, otp }),
//         }
//       );

//       const text = await res.text();
//       console.log("SERVER RESPONSE:", text);

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (e) {
//         throw new Error("Invalid server response");
//       }

//       if (!res.ok) {
//         alert("Verification Failed Invalid OTP"+data.message);
//         return;
//       }

//       alert("Success OTP Verified Successfully"
       
//       );
//             router.push({
//               pathname: "./reset",
//               params: { phone },
//             })
//     } catch (error: any) {
//       console.log("OTP verify error:", error);
//       alert("Error Something went wrong"+error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resendotp = async () => {
//     if (!canResend) return;

//     setResendLoading(true);
//     try {
//       const res = await fetch(
//         "https://gamerzhub-backend.onrender.com/api/v1/host/resendotp",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ phone }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert("Error Failed to resend OTP"+data.message);
//         return;
//       }

//       alert("OTP Resent  New OTP has been sent to"+ `${maskedPhone}`+data.data.otp);

//       // Reset timer
//       setTimer(60);
//       setCanResend(false);
//       setOtp(""); // Clear previous OTP

//       // Optional: Show OTP in development only
//       // console.log("New OTP:", data.data?.otp);
//     } catch (error) {
//       console.log("Resend OTP error:", error);
//       alert("Error Failed to resend OTP. Please try again.");
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.content}>
//         {/* Header Icon */}
//         <View style={styles.iconContainer}>
//           <Ionicons name="shield-checkmark-outline" size={80} color="#38bdf8" />
//         </View>

//         <Text style={styles.title}>Verify OTP</Text>
//         <Text style={styles.subtitle}>
//           Enter the 6-digit code sent to{"\n"}
//           <Text style={styles.phoneText}>{maskedPhone}</Text>
//         </Text>

//         <TextInput
//           placeholder="______"
//           placeholderTextColor="#475569"
//           keyboardType="number-pad"
//           maxLength={6}
//           style={styles.input}
//           value={otp}
//           onChangeText={setOtp}
//           autoFocus
//           selectionColor="#38bdf8"
//           textAlign="center"
//           autoComplete="one-time-code" // Helps with auto-fill on iOS/Android
//         />

//         {/* Verify Button */}
//         <TouchableOpacity
//           style={[styles.btn, loading && styles.btnDisabled]}
//           onPress={verifyOtp}
//           disabled={loading || otp.length !== 6}
//         >
//           {loading ? (
//             <ActivityIndicator color="#020617" />
//           ) : (
//             <Text style={styles.btnText}>Verify OTP</Text>
//           )}
//         </TouchableOpacity>

//         {/* Resend Section */}
//         <View style={styles.resendContainer}>
//           <Text style={styles.resendText}>Didn't receive the code?</Text>

//           <TouchableOpacity
//             onPress={resendotp}
//             disabled={!canResend || resendLoading}
//             style={styles.resendButton}
//           >
//             {resendLoading ? (
//               <ActivityIndicator size="small" color="#38bdf8" />
//             ) : (
//               <Text
//                 style={[
//                   styles.resendButtonText,
//                   !canResend && styles.resendDisabled,
//                 ]}
//               >
//                 {canResend
//                   ? "Resend OTP"
//                   : `Resend in ${timer}s`}
//               </Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 24,
//   },
//   iconContainer: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "900",
//     color: "#38bdf8",
//     textAlign: "center",
//     marginBottom: 12,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#94a3b8",
//     textAlign: "center",
//     lineHeight: 24,
//     marginBottom: 40,
//   },
//   phoneText: {
//     color: "#e0f2fe",
//     fontWeight: "600",
//   },
//   input: {
//     backgroundColor: "#0f172a",
//     borderWidth: 2,
//     borderColor: "#1e293b",
//     borderRadius: 16,
//     paddingVertical: 20,
//     paddingHorizontal: 24,
//     color: "#fff",
//     fontSize: 24,
//     letterSpacing: 12,
//     textAlign: "center",
//     marginBottom: 30,
//     fontWeight: "600",
//   },
//   btn: {
//     backgroundColor: "#38bdf8",
//     paddingVertical: 16,
//     borderRadius: 14,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   btnDisabled: {
//     backgroundColor: "#64748b",
//   },
//   btnText: {
//     color: "#020617",
//     fontSize: 17,
//     fontWeight: "800",
//   },
//   resendContainer: {
//     marginTop: 40,
//     alignItems: "center",
//   },
//   resendText: {
//     color: "#64748b",
//     fontSize: 15,
//     marginBottom: 8,
//   },
//   resendButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//   },
//   resendButtonText: {
//     color: "#38bdf8",
//     fontSize: 16,
//     fontWeight: "700",
//   },
//   resendDisabled: {
//     color: "#475569",
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
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function OTPVerify() {
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Masked phone number (e.g., +91 98******12)
  const maskedPhone = phone
    ? `+91 ${phone.slice(0, 2)}******${phone.slice(-4)}`
    : "";

  // Resend OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Invalid OTP Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://gamerzhub-backend.onrender.com/api/v1/host/verifyotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp }),
        }
      );

      const text = await res.text();
      console.log("SERVER RESPONSE:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server");
      }

      if (!res.ok) {
        alert("Verification Failed Invalid OTP"+data.message);
        return;
      }

      // Success
      alert("Success OTP Verified Successfully"
      );
      router.push({
              pathname: "./reset",
              params: { phone },
            });
    } catch (error: any) {
      console.log("OTP verify error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const resendotp = async () => {
    if (!canResend) return;

    setResendLoading(true);
    try {
      const res = await fetch(
        "https://gamerzhub-backend.onrender.com/api/v1/host/resendotp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Failed  to resend OTP"+data.message);
        return;
      }

      alert(
        "OTP Resent A new OTP has been sent to"+` ${maskedPhone}`+" "+data.data.otp
      );

      // Reset timer and clear input
      setTimer(60);
      setCanResend(false);
      setOtp("");

    } catch (error) {
      console.log("Resend OTP error:", error);
      alert("Error Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="shield-checkmark-outline" size={80} color="#38bdf8" />
        </View>

        <Text style={styles.title}>Verify OTP</Text>
        
        <Text style={styles.subtitle}>
          Enter the 6-digit code sent to{"\n"}
          <Text style={styles.phoneText}>{maskedPhone}</Text>
        </Text>

        {/* OTP Input */}
        <TextInput
          placeholder="______"
          placeholderTextColor="#475569"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          value={otp}
          onChangeText={setOtp}
          autoFocus
          selectionColor="#38bdf8"
          textAlign="center"
          autoComplete="one-time-code"
        />

        {/* Verify Button */}
        <TouchableOpacity
          style={[styles.btn, (loading || otp.length !== 6) && styles.btnDisabled]}
          onPress={verifyOtp}
          disabled={loading || otp.length !== 6}
        >
          {loading ? (
            <ActivityIndicator color="#020617" size="small" />
          ) : (
            <Text style={styles.btnText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP Section */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>

          <TouchableOpacity
            onPress={resendotp}
            disabled={!canResend || resendLoading}
            style={styles.resendButton}
          >
            {resendLoading ? (
              <ActivityIndicator size="small" color="#38bdf8" />
            ) : (
              <Text
                style={[
                  styles.resendButtonText,
                  !canResend && styles.resendDisabled,
                ]}
              >
                {canResend ? "Resend OTP" : `Resend in ${timer}s`}
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  phoneText: {
    color: "#e0f2fe",
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0f172a",
    borderWidth: 2,
    borderColor: "#1e293b",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    color: "#fff",
    fontSize: 24,
    letterSpacing: 12,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "600",
  },
  btn: {
    backgroundColor: "#38bdf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  btnDisabled: {
    backgroundColor: "#64748b",
  },
  btnText: {
    color: "#020617",
    fontSize: 17,
    fontWeight: "800",
  },
  resendContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  resendText: {
    color: "#64748b",
    fontSize: 15,
    marginBottom: 8,
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  resendButtonText: {
    color: "#38bdf8",
    fontSize: 16,
    fontWeight: "700",
  },
  resendDisabled: {
    color: "#475569",
  },
});