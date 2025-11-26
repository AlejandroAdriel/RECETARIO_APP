import { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, Stack } from "expo-router";
import { AuthContext } from "../../src/store/authContext";
import { getUserFavorites } from "../../src/services/api";
import RecipeCard from "../../src/components/RecipeCard";
import { COLORS } from "../../src/constants/theme";

export default function Favorites() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadFavorites = async () => {
    if (!user) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getUserFavorites(user.id);
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando favoritos:", e);
      setErrorMsg("No se pudieron cargar tus favoritos.");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadFavorites();
      } else {
        setList([]);
        setLoading(false);
      }
    }, [user])
  );

  // Si no hay usuario logueado
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.center}>
          <Text style={styles.title}>Favoritos</Text>
          <Text style={styles.text}>Inicia sesión para ver tus favoritos.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Usamos nuestro propio header visual, ocultamos el nativo */}
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <RecipeCard receta={item} isFav={true} onFav={loadFavorites} />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>SUPER • RECETARIO</Text>
            <Text style={styles.sectionTitle}>Mis favoritos</Text>

            {loading && (
              <ActivityIndicator
                size="large"
                color={COLORS.primary}
                style={styles.loader}
              />
            )}

            {errorMsg ? (
              <Text style={styles.error}>{errorMsg}</Text>
            ) : null}

            {!loading && !errorMsg && list.length === 0 && (
              <Text style={styles.emptyText}>Aún no tienes favoritos.</Text>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Fondo azul como en Home
  container: {
    flex: 1,
    backgroundColor: COLORS.seaBlue,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100, // para que no lo tape el tab bar
  },

  headerContainer: {
    marginTop: 16,
    marginBottom: 12,
  },

  // SUPER • RECETARIO igual que en el home
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1.8,
    color: COLORS.text,
    backgroundColor: COLORS.honey,
    paddingVertical: 12,
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 10,
  },

  // "Mis favoritos" AHORA EN BLANCO para que contraste bien
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",        // 👈 forzado a blanco
    textAlign: "left",
    marginTop: 4,
    marginBottom: 8,
  },

  cardWrapper: {
    marginBottom: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.coffee,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: COLORS.muted,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginTop: 8,
    textAlign: "center",
  },

  error: {
    color: COLORS.danger,
    textAlign: "center",
    marginTop: 8,
  },

  loader: {
    marginTop: 12,
  },
});
