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

export default function ResetPassword() {
  const router = useRouter();
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const { phone } = useLocalSearchParams();
  const updatePassword = async () => {
  try {

    const res = await fetch("http://192.168.31.126:8000/api/v1/host/resetpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: phone,
        password: pass,
        confirm: confirm
      })
    });

    const text = await res.text();   // 👈 json nahi text

    console.log("SERVER RESPONSE:", text);

    const data = JSON.parse(text);

    if (!res.ok) {
      alert(data.message);   // backend error
      return;
    }

    alert(data.message);     // Password changed successfully

    // login screen par bhej do
    router.replace("../host/login");

  } catch (error) {
    console.log("Reset password error:", error);
    alert("Server error. Try again.");
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        placeholder="New Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={pass}
        onChangeText={setPass}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.replace("/host/login")}
      >
        <Text style={styles.btnText}>Update Password</Text>
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
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    marginBottom: 14,
  },

  btn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    color: "#020617",
  },
});
