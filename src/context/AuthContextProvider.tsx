import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthContext from "./AuthContext";
import { createNewAccount, getAccountById } from "../services/AccountAPI";
import Account from "../Models/Account";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    // useEffect to only register once at start -- firebase auth, method onauthsavecchanges, from google sign in
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getAccountById(user.uid).then((res) => {
        if (res && res._id) {
          // then set their account on the website!
          setAccount(res);
        } else {
          // otherwise, create them an a new account
          const newAccount: Account = {
            uid: user.uid,
            displayName: user.displayName ?? "",
            photoURL: user.photoURL ?? "",
            email: user.email ?? "",
          };
          createNewAccount(newAccount).then((r) => setAccount(r));
        }
      });
    } else {
      setAccount(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
