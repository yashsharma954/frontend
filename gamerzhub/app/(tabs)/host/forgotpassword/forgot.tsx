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

export default function ForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const sendOtp = async () => {
  try {
    const res = await fetch("http://192.168.31.126:8000/api/v1/host/sendotp",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        phone: phone
      })
    });

    const data = await res.json();
    console.log("data is ",data);

    alert("Your OTP is: " + data.data.otp);
    router.push({
  pathname: "./otpverify",
  params: { phone: phone }
})

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your registered phone number
      </Text>

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#94a3b8"
        keyboardType="number-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={sendOtp}
      >
        <Text style={styles.btnText}>Send OTP</Text>
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
    borderRadius: 10,
    padding: 14,
    color: "#fff",
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
});
