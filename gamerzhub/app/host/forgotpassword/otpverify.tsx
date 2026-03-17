import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function OTPVerify() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const { phone } = useLocalSearchParams();
  const verifyOtp = async () => {
  try {

    const res = await fetch("http://192.168.31.126:8000/api/v1/host/verifyotp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        otp: otp
      })
    });

     const text = await res.text();   // 👈 json nahi text

    console.log("SERVER RESPONSE:", text);

    const data = JSON.parse(text);
    if (!res.ok) {
      // server error (invalid password, user not found etc.)
      alert(data.message);
      return;
    }
    

    

      alert("OTP Verified Successfully");

      // next screen (reset password)
      router.push({
        pathname: "./reset",
        params: { phone: phone }
      });

     

  } catch (error) {
    console.log("OTP verify error:", error);
    alert(error);
  }
};

const resendotp = async ()=>{
  try {
    const res = await fetch("http://192.168.31.126:8000/api/v1/host/resendotp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        phone: phone
      })
    });

    const data = await res.json();
     if (!res.ok) {
      // server error (invalid password, user not found etc.)
      alert(data.message);
      return;
    }
    

    alert("Your OTP is: " + data.data.otp);
    router.push({
  pathname: "./otpverify",
  params: { phone: phone }
})

  } catch (error) {
    console.log(error);
    alert("server error ");
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter 6 digit OTP sent to your phone
      </Text>

      <TextInput
        placeholder="Enter OTP"
        placeholderTextColor="#94a3b8"
        keyboardType="number-pad"
        maxLength={6}
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={verifyOtp}
      >
        <Text style={styles.btnText}>Verify</Text>
         
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={resendotp}
      >
        <Text style={styles.btnText}>Resend OTP</Text>
         
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#38bdf8",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#94a3b8",
    marginVertical: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    letterSpacing: 6,
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },

  btn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
  },

  btnText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    color: "#020617",
  },

  resend: {
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 18,
  },
});
