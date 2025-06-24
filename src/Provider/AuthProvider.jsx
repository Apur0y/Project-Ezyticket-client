import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Pages/Authentication/Firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  // console.log(user);
  const [loading, setLoading] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        await axiosPublic.post('/jwt',
          { email: currentUser.email },
          { withCredentials: true }
        )
          .then(res => {
            console.log('login token', res.data);
            setLoading(false)
          })
      } else {
        setUser(currentUser);
        await axiosPublic.post('/logout',
          {},
          {
            withCredentials: true,
          }
        )
          .then(res => {
            console.log('logout', res.data)
            setLoading(false)
          })
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [user?.displayName, user?.photoURL, axiosPublic]);

  //get user info from mongodb
  const { data: userData, refetch: refetchUserInfo } = useQuery({
    queryKey: ['savedUser', user?.email],
    queryFn: async () => {
      setUserInfoLoading(true);
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user?.email}`);
      setUserInfo(res.data[0]);
      setUserInfoLoading(false);
      return res.data[0];
    },
    enabled: !!user?.email,
  });

  const authInfo = {
    user,
    setUser,
    darkMode,
    setDarkMode,
    loading,
    setLoading,
    userInfoLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    userInfo: userData || userInfo,
    setUserInfo,
    refetchUserInfo,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
