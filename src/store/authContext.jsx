// src/store/authContext.jsx
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { loginUser, registerUser } from "../services/api";

export const AuthContext = createContext({});

const STORAGE_KEY = "recetario_session_v1";

// Carga inicial desde localStorage (si existe)
function loadInitialSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    // pequeña validación mínima
    if (!parsed.user || !parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // ⬇️ ahora la sesión inicial viene de localStorage
  const [session, setSession] = useState(() => loadInitialSession());

  // ⬇️ sincroniza cambios de sesión con localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (session) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const login = useCallback(async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });

      // Si tu backend usa otra propiedad para el rol (por ejemplo isAdmin o role),
      // ajusta esta línea, pero no cambiamos el endpoint.
      const role = res.user?.is_admin ? "admin" : "user";

      const user = {
        id: res.user?.id,
        email: res.user?.email,
        username: res.user?.username,
        role,
        avatarUrl: res.user?.avatarUrl || null,
      };

      setSession({ user, token: res.token });
      return res;
    } catch (err) {
      alert("Error al iniciar sesión: " + err.message);
      throw err;
    }
  }, []);

  const register = useCallback(
    async ({ email, password, username, birthday, gender }) => {
      try {
        const res = await registerUser({
          email,
          password,
          username,
          birthday,
          gender,
        });

        const role = res.user?.is_admin ? "admin" : "user";

        const user = {
          id: res.user?.id,
          email: res.user?.email,
          username: res.user?.username,
          role,
          avatarUrl: res.user?.avatarUrl || null,
        };

        setSession({ user, token: res.token });
        return res;
      } catch (err) {
        alert("Error al registrarse: " + err.message);
        throw err;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setSession(null);
  }, []);

  // Permite que Editor.jsx pueda hacer setRole(...) sin tocar backend
  const setRole = useCallback((nextRole) => {
    setSession((prev) => {
      if (!prev || !prev.user) return prev;
      return {
        ...prev,
        user: {
          ...prev.user,
          role: nextRole,
        },
      };
    });
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user || null,
      role: session?.user?.role || "guest",
      token: session?.token || null,
      login,
      register,
      logout,
      setRole, // ⬅️ ahora disponible para Editor.jsx
    }),
    [session, login, register, logout, setRole]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
