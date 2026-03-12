import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export default function HostRegister() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [photo, setPhoto] = useState(null);
  const [username,setUsername]=useState("");


  function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}




const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1,1],
    quality: 1,
  });

  if (!result.canceled) {
    const imageUri = result.assets[0].uri;
    console.log("IMAGE URI:", imageUri);
    setPhoto(imageUri);
  }
};
const handleRegister = async () => {

  if (!name || !phone || !password || !confirm||!username) {
    alert("All fields are required");
    return;
  }

  if (password !== confirm) {
    alert("Password not matched");
    return;
  }

  if (!isValidPhone(phone)) {
  alert("Invalid phone number");
  return;
}

  const formData = new FormData();

  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("password", password);
  formData.append("username",username);

  // if (photo) {
  //   console.log("photo is ",photo);
  //   formData.append("avatar", {
  //     uri: photo,
  //     type: "image/jpeg",
  //     name: "host.jpg",
  //   });
  // }
  
  if (photo) {

  if (Platform.OS === "web") {
    const response = await fetch(photo);
    const blob = await response.blob();

    formData.append("avatar", blob, "host.jpg");
  } else {
    formData.append("avatar", {
      uri: photo,
      type: "image/jpeg",
      name: "host.jpg",
    });
  }

}

  try {
    const res = await fetch(
        
      "http://192.168.31.126:8000/api/v1/host/register",
      {
        method: "POST",
        body: formData,
      }
    );
  
    const data = await res.text();
    console.log("data is",data);

    if (!res.ok) {
      alert(data.message || "Registration failed");
      return;
    }

    alert("Host account created successfully ✅");

    router.replace("./login");

  } catch (error) {
    console.log("error is ",error);
    alert("Server error");
  }
};

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <Text style={styles.logo}>GamerzHub</Text>

      <Text style={styles.title}>Create Host Account</Text>
     

<TouchableOpacity
  style={styles.avatarBox}
  onPress={photo ? () => setPhoto(null) : pickImage}
>
  <Image
    source={
      photo
        ? { uri: photo }
        : require("../../../assets/images/icon.png")
    }
    style={styles.avatar}
  />

  <Text style={styles.addPhoto}>
    {photo ? "Remove Photo" : "Add Photo"}
  </Text>

</TouchableOpacity>
      <TextInput
        placeholder="Host Name"
        placeholderTextColor="#94a3b8"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />


      <TextInput
        placeholder="Username"
         placeholderTextColor="#94a3b8"
        style={styles.input}
         value={username}
         onChangeText={setUsername}
      />
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#94a3b8"
        keyboardType="number-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />
      


      <TextInput
        placeholder="Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#94a3b8"
        secureTextEntry
        style={styles.input}
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("./login")}>
        <Text style={styles.link}>
          Already a host? Login
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

  btn: {
    backgroundColor: "#38bdf8",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  avatarBox: {
  alignItems: "center",
  marginBottom: 25,
},

avatar: {
  width: 110,
  height: 110,
  borderRadius: 55,
  borderWidth: 2,
  borderColor: "#38bdf8",
},

addPhoto: {
  marginTop: 8,
  color: "#38bdf8",
  fontSize: 13,
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
