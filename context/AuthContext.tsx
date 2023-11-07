/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setuser] = useState<any>(null);
  const [loading, setloading] = useState(true);
  console.log("user", user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setuser({
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setuser(null);
      }
      setloading(false);
    });

    return () => unsubscribe();
  }, []);
  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    setuser(null);
    await signOut(auth);
  };
  // const setUpRecaptcha = (number: string) => {
  //   const recaptchaVerifiers = new RecaptchaVerifier(
  //     "recaptcha-container",
  //     {},
  //     auth
  //   );
  //   recaptchaVerifiers.render();
  //   return recaptchaVerifiers;
  // };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
