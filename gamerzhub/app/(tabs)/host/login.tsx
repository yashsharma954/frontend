import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HostLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
const handleLogin = async () => {
  try {
    const res = await fetch("http://192.168.31.126:8000/api/v1/host/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("host logged in succesfully");
    // 🔥 ASYNC STORAGE SAVE
    await AsyncStorage.setItem(
  "host",
  JSON.stringify(data.host)
);

await AsyncStorage.setItem(
  "token",
  data.accessToken
);

    router.replace("./dashboard");

  } catch (err) {
    alert("Server error");
  }
};

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Text style={styles.logo}>GamerzHub</Text>

      <Text style={styles.title}>Host Login</Text>

      <TextInput
        placeholder="UserName"
        placeholderTextColor="#94a3b8"
        keyboardType="number-pad"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
     

      <TouchableOpacity
  onPress={() => router.push("./host/forgot")}
>
  <Text style={styles.forgot}>
    Forgot Password?
  </Text>
</TouchableOpacity>


      <TouchableOpacity onPress={() => router.push("./register")}>
        <Text style={styles.link}>
          Create new host account
        </Text>
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

  logo: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "900",
    color: "#38bdf8",
    marginBottom: 10,
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    color: "#e5e7eb",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 10,
    padding: 14,
    color: "#fff",
    marginBottom: 14,
  },
  forgot: {
  color: "#38bdf8",
  textAlign: "right",
  marginBottom: 20,
  marginTop: 5,
},


  btn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },

  btnText: {
    color: "#020617",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
  },

  link: {
    marginTop: 18,
    textAlign: "center",
    color: "#94a3b8",
  },
});
