
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function JoinTournament() {
  const { id } = useLocalSearchParams();
const tournamentId = String(id);
 // tournamentId
  const router = useRouter();

  const [step, setStep] = useState("MOBILE");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [playerId, setPlayerId] = useState(null);

  // 🔵 SEND OTP
  const sendOtp = async () => {
    if (mobile.length !== 10) {
      alert("Enter valid mobile number");
      return;
    }

   const res= await fetch("http://192.168.31.126:8000/api/v1/player/sendotp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: mobile, 
       tournamentId
      }),
    });

  const data= await res.json();
  alert(data.data);
  console.log("data is ",data);
    setStep("OTP");
  };

  // 🟢 VERIFY OTP
  const verifyOtp = async () => {
    try{
    const res = await fetch(
      "http://192.168.31.126:8000/api/v1/player/verifyotp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: mobile,
          otp,
          tournamentId
        }),
      }
    );

    const data = await res.json();

    if(data.success){
      alert("OTP IS VERIFIED");
      
    }

    if (!data.success) {
      alert("Invalid OTP");
      return;
    }
  

    // 🔥 REAL USER CREATED
    setPlayerId(data.data._id);
    await AsyncStorage.setItem("tempUserId", data.data._id);

router.push({
  pathname: "./payment",
  params: {
    id: tournamentId,
    phone: mobile,
  },
});
    }
    catch(error){
      console.log("error is",error);
    } 
  };

  const resendotp = async ()=>{
  try {
    const res = await fetch("http://192.168.31.126:8000/api/v1/player/resendotp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        phone: mobile,
      })
    });

    const data = await res.json();
     if (!data.success) {
      // server error (invalid password, user not found etc.)
      alert(data.message);
      return;
    }
    

    alert("Your OTP is: " + data.data.otp);
//     router.push({
//   pathname: "./otpverify",
//   params: { phone: phone }
// })

  } catch (error) {
    console.log(error);
    alert("server error ");
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join Tournament</Text>

      {step === "MOBILE" && (
        <>
          <TextInput
            placeholder="Enter Mobile Number"
            keyboardType="numeric"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      )}

      {step === "OTP" && (
        <>
          <TextInput
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify & Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity
                  style={styles.button}
                  onPress={resendotp}
                >
                  <Text style={styles.buttonText}>Resend OTP</Text>
                   
                </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    color: "#38bdf8",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#020617",
    fontWeight: "bold",
  },
});
