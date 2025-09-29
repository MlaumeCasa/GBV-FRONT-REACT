import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Greet({ navigation }) {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [pin, setPin] = useState("");
  const [reason, setReason] = useState("");
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // SOS Button Animation (Pulsing Effect)
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  const sendSOS = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      Alert.alert("✅ Success", "SOS alert has been sent successfully!");
    } catch {
      Alert.alert(
        "❌ Network Error",
        "Please check your connection or call emergency services directly."
      );
    }
  };

  const handleCancelSubmit = () => {
    if (!pin || !reason) {
      Alert.alert("⚠️ Error", "Please enter your PIN and reason.");
      return;
    }
    setCancelModalVisible(false);
    Alert.alert("✅ Cancelled", "Your SOS request has been cancelled.");
    setPin("");
    setReason("");
  };

  return (
    <View style={styles.container}>
      {/* SOS Button */}
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity style={styles.sosButton} onPress={sendSOS}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>
        NO TO <Text style={{ color: "red" }}>GBV</Text>
      </Text>
      <Text style={styles.subtitle}>An immediate, life-saving resource.</Text>

      {/* Cancel Button */}
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setCancelModalVisible(true)}
      >
        <Icon name="times-circle" size={20} color="black" style={{ marginRight: 8 }} />
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Icon name="sign-in" size={20} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Cancel Modal */}
      <Modal visible={cancelModalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cancel SOS</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter PIN"
              secureTextEntry
              value={pin}
              onChangeText={setPin}
            />

            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Reason for cancellation"
              value={reason}
              onChangeText={setReason}
              multiline
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleCancelSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCancelModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer */}
      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  sosButton: {
    backgroundColor: "red",
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  sosText: { color: "white", fontSize: 30, fontWeight: "bold", textDecorationLine: "underline" },
  title: { fontSize: 28, fontWeight: "bold", marginTop: 20 },
  subtitle: { fontSize: 14, color: "gray", marginBottom: 30 },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
    marginBottom: 15,
  },
  cancelText: { color: "black", fontSize: 16, fontWeight: "bold" },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 14,
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
  },
  loginText: { color: "white", fontSize: 16, fontWeight: "bold" },
  footer: { marginTop: 20, fontSize: 14 },
  link: { color: "blue", fontWeight: "bold" },

  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContainer: { backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  input: { borderWidth: 1, borderColor: "gray", borderRadius: 8, padding: 10, width: "100%", marginBottom: 10 },
  submitButton: { backgroundColor: "green", padding: 12, borderRadius: 8, marginTop: 10, width: "100%", alignItems: "center" },
  submitText: { color: "white", fontWeight: "bold" },
  closeButton: { marginTop: 10 },
  closeText: { color: "red", fontWeight: "bold" },
});
