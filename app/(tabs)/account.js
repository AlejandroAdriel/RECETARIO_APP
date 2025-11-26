import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../../src/store/authContext";
import { COLORS, SIZES, SHADOWS } from "../../src/constants/theme";

const BEIGE = "#f4e3cd";
const HEADER_PILL = "#e7c988";

export default function Account() {
  const router = useRouter();
  const { user, login, register, logout, isLoading } = useContext(AuthContext);
  const [mode, setMode] = useState("login");

  // Login state
  const [lEmail, setLEmail] = useState("");
  const [lPassword, setLPassword] = useState("");
  const [lShowPass, setLShowPass] = useState(false);
  const [lLoading, setLLoading] = useState(false);

  // Register state
  const [rEmail, setREmail] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [rShowPass, setRShowPass] = useState(false);
  const [rUsername, setRUsername] = useState("");
  const [rLoading, setRLoading] = useState(false);

  const handleLogin = async () => {
    if (!lEmail || !lPassword)
      return Alert.alert("Error", "Completa todos los campos");
    setLLoading(true);
    try {
      await login({ email: lEmail, password: lPassword });
    } catch (e) {} 
    finally {
      setLLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!rEmail || !rPassword || !rUsername)
      return Alert.alert("Error", "Completa todos los campos");
    setRLoading(true);
    try {
      await register({ email: rEmail, password: rPassword, username: rUsername });
    } catch (e) {} 
    finally {
      setRLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>

        {/* ---------- HEADER (IGUAL A FAVORITOS Y HOME) ---------- */}
        <View style={styles.headerContainer}>
          <View style={styles.headerPill}>
            <Text style={styles.headerTitle}>SUPER</Text>
            <Ionicons name="leaf" size={18} color="#000" />
            <Text style={styles.headerTitle}>RECETARIO</Text>
          </View>
        </View>

        {/* ---------- CONTENIDO ---------- */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >

          {/* ---------- MODO LOGUEADO ---------- */}
          {user ? (
            <View style={styles.panel}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user.username?.[0]?.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.role}>{user.role}</Text>
              </View>

              <View style={styles.infoSection}>
                <View style={styles.row}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{user.email}</Text>
                </View>
              </View>

              {user.role === "admin" && (
                <Pressable
                  style={[styles.btn, styles.btnAdmin]}
                  onPress={() => router.push("/admin")}
                >
                  <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
                  <Text style={[styles.btnText, { color: COLORS.primary }]}>
                    Administrar Recetas
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={[styles.btn, styles.btnLogout]}
                onPress={logout}
              >
                <Ionicons name="log-out-outline" size={20} color="#fff" />
                <Text style={styles.btnText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          ) : (
            /* ---------- MODO LOGIN / REGISTRO ---------- */
            <>

              <View style={styles.illustrationWrapper}>
                <View style={styles.illustrationCircle}>
                  <Ionicons name="image-outline" size={46} color={COLORS.primary} />
                </View>
              </View>

              <View style={styles.authPanel}>
                {mode === "login" ? (
                  <View style={styles.form}>
                    <Text style={styles.formTitle}>Iniciar Sesión</Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.fieldLabel}>Username</Text>
                      <TextInput
                        style={styles.darkInput}
                        placeholder="Ingresa tu usuario..."
                        placeholderTextColor="#d9d0c6"
                        value={lEmail}
                        onChangeText={setLEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.fieldLabel}>Contraseña</Text>
                      <View style={styles.passwordContainerDark}>
                        <TextInput
                          style={styles.passwordInputDark}
                          placeholder="********"
                          placeholderTextColor="#d9d0c6"
                          secureTextEntry={!lShowPass}
                          value={lPassword}
                          onChangeText={setLPassword}
                        />
                        <Pressable onPress={() => setLShowPass(!lShowPass)}>
                          <Ionicons
                            name={lShowPass ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="#d9d0c6"
                          />
                        </Pressable>
                      </View>
                    </View>

                    <Pressable
                      style={[styles.btn, styles.btnPrimary]}
                      onPress={handleLogin}
                    >
                      {lLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.btnText}>Iniciar Sesión</Text>
                      )}
                    </Pressable>

                    <Text style={styles.helperText}>
                      Si no tienes una cuenta{" "}
                      <Text style={styles.helperLink} onPress={() => setMode("register")}>
                        regístrate aquí
                      </Text>
                    </Text>
                  </View>
                ) : (
                  /* Registro */
                  <View style={styles.form}>
                    <Text style={styles.formTitle}>Crear cuenta nueva</Text>

                    <View style={styles.inputGroup}>
                      <Text style={styles.fieldLabel}>Nombre de usuario</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        value={rUsername}
                        onChangeText={setRUsername}
                        autoCapitalize="none"
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.fieldLabel}>Correo electrónico</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="ejemplo@correo.com"
                        keyboardType="email-address"
                        value={rEmail}
                        onChangeText={setREmail}
                      />
                    </View>

                    <View style={styles.inputGroup}>
                      <Text style={styles.fieldLabel}>Contraseña</Text>
                      <View style={styles.passwordContainer}>
                        <TextInput
                          style={styles.passwordInput}
                          placeholder="********"
                          secureTextEntry={!rShowPass}
                          value={rPassword}
                          onChangeText={setRPassword}
                        />
                        <Pressable onPress={() => setRShowPass(!rShowPass)}>
                          <Ionicons
                            name={rShowPass ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color={COLORS.textLight}
                          />
                        </Pressable>
                      </View>
                    </View>

                    <Pressable
                      style={[styles.btn, styles.btnPrimary]}
                      onPress={handleRegister}
                    >
                      {rLoading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        <Text style={styles.btnText}>Crear cuenta</Text>
                      )}
                    </Pressable>

                    <Text style={styles.helperText}>
                      ¿Ya tienes una cuenta?{" "}
                      <Text style={styles.helperLink} onPress={() => setMode("login")}>
                        Inicia sesión
                      </Text>
                    </Text>
                  </View>
                )}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  scroll: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  /* ---------- HEADER CORRECTO (FONDO AZUL + PASTILLA BEIGE) ---------- */
  headerContainer: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    alignItems: "center",
  },

  headerPill: {
    backgroundColor: HEADER_PILL,
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#000",
  },

  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },

  /* ---------- LOGIN / REGISTER ---------- */
  illustrationWrapper: {
    alignItems: "center",
    marginBottom: 18,
  },

  illustrationCircle: {
    width: 135,
    height: 135,
    backgroundColor: BEIGE,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
  },

  authPanel: {
    width: "100%",
    backgroundColor: BEIGE,
    padding: 24,
    borderRadius: 40,
    ...SHADOWS.default,
  },

  form: {
    gap: 16,
  },

  formTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#3b312c",
  },

  fieldLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#3b312c",
  },

  inputGroup: {
    gap: 6,
  },

  darkInput: {
    backgroundColor: "#3b312c",
    color: "#fff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
  },

  passwordContainerDark: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b312c",
    borderRadius: 30,
    paddingHorizontal: 12,
  },

  passwordInputDark: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 6,
  },

  input: {
    backgroundColor: BEIGE,
    borderWidth: 1,
    borderColor: "#d0c4b6",
    borderRadius: 14,
    padding: 14,
    fontSize: 16,
    color: COLORS.text,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BEIGE,
    borderWidth: 1,
    borderColor: "#d0c4b6",
    borderRadius: 14,
    paddingHorizontal: 12,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 6,
    fontSize: 16,
  },

  btn: {
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  btnPrimary: {
    backgroundColor: "#849a63",
    marginTop: 12,
  },

  btnLogout: {
    backgroundColor: "#d04637",
    marginTop: 12,
  },

  btnAdmin: {
    backgroundColor: "#f5f9ff",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  helperText: {
    textAlign: "center",
    marginTop: 8,
    color: "#3b312c",
    fontStyle: "italic",
  },

  helperLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  /* ---------- PANEL DE CUENTA ---------- */
  panel: {
    backgroundColor: BEIGE,
    padding: 24,
    borderRadius: 40,
    ...SHADOWS.default,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  avatar: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 6,
  },

  role: {
    textAlign: "center",
    color: COLORS.textLight,
    marginTop: 2,
    marginBottom: 12,
  },

  infoSection: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#d0c4b6",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  label: {
    fontWeight: "600",
    color: COLORS.textLight,
  },

  value: {
    fontWeight: "600",
    color: COLORS.text,
  },
});
