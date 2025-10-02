import React, { createContext, useContext, useEffect, useState } from "react";

interface UserType {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
   user: { username: string } | null;   
  session: any | null;
  profile: { username: string } | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  setUser: (user: { username: string } | null) => void; 
   loginSuccess: (userData: any) => void; 
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ username: string } | null>(null); // <-- keep this
  const [profile, setProfile] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setProfile({ username: parsedUser.username });
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // if using cookies
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.detail || "Login failed" };
      }

      setUser(data.user);
      setProfile({ username: data.user.username });
      localStorage.setItem("user", JSON.stringify(data.user));
      return {};
    } catch (err: any) {
      return { error: err.message };
    }
  };


    // AuthContext.tsx
  const loginSuccess = (userData: any) => {
    setUser(userData); // set user
    setProfile({ username: userData.username }); // set profile from the data
    localStorage.setItem("user", JSON.stringify(userData)); // persist in localStorage
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
        credentials: "include", // if using cookies
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.detail || "Signup failed" };
      }

      setUser(data.user);
      setProfile({ username: data.user.username });
      localStorage.setItem("user", JSON.stringify(data.user));
      return {};
    } catch (err: any) {
      return { error: err.message };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    setProfile(null);

    // Optional: notify backend to log out
    await fetch("http://localhost:8000/api/auth/logout/", {
      method: "POST",
      credentials: "include",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, signIn, signUp, signOut, loading,setUser,loginSuccess }}
    >
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
