
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function JoinTournament() {
//   const { id } = useLocalSearchParams();
// const tournamentId = String(id);
//  // tournamentId
//   const router = useRouter();

//   const [step, setStep] = useState("MOBILE");
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [playerId, setPlayerId] = useState(null);

//   // 🔵 SEND OTP
//   const sendOtp = async () => {
//     if (mobile.length !== 10) {
//       alert("Enter valid mobile number");
//       return;
//     }

//    const res= await fetch("https://gamerzhub-backend.onrender.com/api/v1/player/sendotp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phone: mobile, 
//        tournamentId
//       }),
//     });

//   const data= await res.json();
//   alert(data.data);
//   console.log("data is ",data);
//     setStep("OTP");
//   };

//   // 🟢 VERIFY OTP
//   const verifyOtp = async () => {
//     try{
//     const res = await fetch(
//       "https://gamerzhub-backend.onrender.com/api/v1/player/verifyotp",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           phone: mobile,
//           otp,
//           tournamentId
//         }),
//       }
//     );

//     const data = await res.json();

//     if(data.success){
//       alert("OTP IS VERIFIED");
      
//     }

//     if (!data.success) {
//       alert("Invalid OTP");
//       return;
//     }
  

//     // 🔥 REAL USER CREATED
//     setPlayerId(data.data._id);
//     await AsyncStorage.setItem("tempUserId", data.data._id);

// router.push({
//   pathname: "./payment",
//   params: {
//     id: tournamentId,
//     phone: mobile,
//   },
// });
//     }
//     catch(error){
//       console.log("error is",error);
//     } 
//   };

//   const resendotp = async ()=>{
//   try {
//     const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/player/resendotp",{
//       method:"POST",
//       headers:{
//         "Content-Type":"application/json"
//       },
//       body: JSON.stringify({
//         phone: mobile,
//       })
//     });

//     const data = await res.json();
//      if (!data.success) {
//       // server error (invalid password, user not found etc.)
//       alert(data.message);
//       return;
//     }
    

//     alert("Your OTP is: " + data.data.otp);
// //     router.push({
// //   pathname: "./otpverify",
// //   params: { phone: phone }
// // })

//   } catch (error) {
//     console.log(error);
//     alert("server error ");
//   }
// };



//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Join Tournament</Text>

//       {step === "MOBILE" && (
//         <>
//           <TextInput
//             placeholder="Enter Mobile Number"
//             keyboardType="numeric"
//             maxLength={10}
//             value={mobile}
//             onChangeText={setMobile}
//             style={styles.input}
//           />
//           <TouchableOpacity style={styles.button} onPress={sendOtp}>
//             <Text style={styles.buttonText}>Send OTP</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {step === "OTP" && (
//         <>
//           <TextInput
//             placeholder="Enter OTP"
//             keyboardType="numeric"
//             maxLength={6}
//             value={otp}
//             onChangeText={setOtp}
//             style={styles.input}
//           />
//           <TouchableOpacity style={styles.button} onPress={verifyOtp}>
//             <Text style={styles.buttonText}>Verify & Continue</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//                   style={styles.button}
//                   onPress={resendotp}
//                 >
//                   <Text style={styles.buttonText}>Resend OTP</Text>
                   
//                 </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#020617",
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     color: "#38bdf8",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 30,
//     textAlign: "center",
//   },
//   input: {
//     backgroundColor: "#0f172a",
//     padding: 14,
//     borderRadius: 12,
//     color: "#fff",
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: "#38bdf8",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#020617",
//     fontWeight: "bold",
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
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function JoinTournament() {
  const { id } = useLocalSearchParams();
  const tournamentId = String(id);
  const router = useRouter();

  const [step, setStep] = useState<"MOBILE" | "OTP">("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // Send OTP
  const sendOtp = async () => {
    if (mobile.length !== 10) {
      alert("Invalid Number Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/player/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone: mobile, 
          tournamentId 
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Sent Check your phone for the verification code:"+data.data.otp);
        setStep("OTP");
      } else {
        alert("Error Failed to send OTP");
      }
    } catch (error) {
       alert("Error Something went wrong. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Invalid OTP Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/player/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: mobile,
          otp,
          tournamentId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Success Phone verified successfully!");

        // Save temp user ID
        await AsyncStorage.setItem("tempUserId", data.data._id);

        // Move to Payment Screen
        router.push({
          pathname: "./payment",
          params: {
            id: tournamentId,
            phone: mobile,
          },
        });
      } else {
         alert("Verification Failed Invalid OTP");
      }
    } catch (error) {
      alert("Error Something went wrong during verification");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setResending(true);
    try {
      const res = await fetch("https://gamerzhub-backend.onrender.com/api/v1/player/resendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: mobile }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Resent A new OTP has been sent to your number"+data.data.otp);
      } else {
        alert("Error Failed to resend OTP");
      }
    } catch (error) {
      alert("Error Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0a0e17", "#1e2937"]}
        style={styles.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="trophy" size={48} color="#67e8f9" />
        <Text style={styles.title}>JOIN TOURNAMENT</Text>
        <Text style={styles.subtitle}>
          Verify your number to secure your spot
        </Text>
      </View>

      <View style={styles.card}>
        {step === "MOBILE" && (
          <>
            <Text style={styles.label}>ENTER YOUR MOBILE NUMBER</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                placeholder="98765 43210"
                keyboardType="numeric"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                style={styles.input}
                placeholderTextColor="#64748b"
              />
            </View>

            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={sendOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text style={styles.primaryButtonText}>SEND OTP</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {step === "OTP" && (
          <>
            <Text style={styles.label}>ENTER VERIFICATION CODE</Text>
            <Text style={styles.otpSubtitle}>
              We sent a 6-digit code to +91 {mobile}
            </Text>

            <TextInput
              placeholder="••••••"
              keyboardType="numeric"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
              style={styles.otpInput}
              placeholderTextColor="#64748b"
              textAlign="center"
            />

            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={verifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#0f172a" />
              ) : (
                <Text style={styles.primaryButtonText}>VERIFY & JOIN</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.resendButton} 
              onPress={resendOtp}
              disabled={resending}
            >
              <Text style={styles.resendText}>
                {resending ? "Sending..." : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Security Note */}
      <Text style={styles.securityNote}>
        🔒 Your number is secure and will only be used for tournament updates
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e17",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#67e8f9",
    marginTop: 16,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 40,
  },

  card: {
    backgroundColor: "#1e2937",
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "#334155",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 8,
    letterSpacing: 0.5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 24,
  },
  countryCode: {
    paddingLeft: 20,
    color: "#67e8f9",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    flex: 1,
    padding: 18,
    color: "#f1f5f9",
    fontSize: 18,
  },

  otpInput: {
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 16,
    color: "#f1f5f9",
    fontSize: 28,
    letterSpacing: 12,
    textAlign: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#67e8f9",
  },

  primaryButton: {
    backgroundColor: "#67e8f9",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#0f172a",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  resendButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  resendText: {
    color: "#67e8f9",
    fontWeight: "600",
    fontSize: 15,
  },

  securityNote: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    marginTop: 40,
    paddingHorizontal: 40,
  },
});