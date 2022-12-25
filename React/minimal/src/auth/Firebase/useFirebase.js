import { useEffect, useState } from "react";
import initFirebase from "./firebaseInit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getIdToken,
  sendPasswordResetEmail,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

initFirebase();

const useFirebase = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});

  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [category, setCategory] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const [modal_successMessage, setmodal_successMessage] = useState(false);
  function tog_successMessage() {
    setmodal_successMessage(!modal_successMessage);
  }

  const loginInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        const userInfos = {
          username: username,
          category: category,
          user: auth.currentUser,
        };
        // set the info in session storage
        setUserInfo(userInfos);

        sessionStorage.setItem("userInfo", JSON.stringify(userInfos));
        tog_successMessage();
        setTimeout(() => {
          history.replace("/pages-profile");
          setmodal_successMessage(false);
        }, 2000);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const registerUser = (email, password, username, category) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);

        const usreInfo = {
          username: username,
          category: category,
          user: user,
        };
        setCategory(category);
        setUsername(username);
        // set the info in session storage
        setUserInfo(usreInfo);
        tog_successMessage();
        setTimeout(() => {
          history.replace("/auth-signin-cover");
          setmodal_successMessage(false);
        }, 3000);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // setuser to local storage
        sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
        tog_successMessage();
        setTimeout(() => {
          history.replace("/pages-profile");
          setmodal_successMessage(false);
        }, 2000);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        tog_successMessage();
        setTimeout(() => {
          //  history.replace("/dashboard");
          setmodal_successMessage(false);
        }, 2000);

        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };
  const createPassword = (password) => {
    updatePassword(auth.currentUser, password)
      .then(() => {
        tog_successMessage();
        setTimeout(() => {
          history.replace("/auth-signin-cover");
          setmodal_successMessage(false);
        }, 2000);
        // Password updated!
        // ...
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };

  const loginInWithFacebook = () => {
    const FacebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, FacebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setTimeout(() => {
          history.replace("/pages-profile");
          setmodal_successMessage(false);
        }, 2000);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  const loginWithGithub = () => {
    const GithubProvider = new GithubAuthProvider();
    signInWithPopup(auth, GithubProvider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setTimeout(() => {
          history.replace("/pages-profile");
          setmodal_successMessage(false);
        }, 2000);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const loginWithTwitter = () => {
    const TwitterProvider = new TwitterAuthProvider();
    signInWithPopup(auth, TwitterProvider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        // const credential = TwitterAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const secret = credential.secret;

        // The signed-in user info.
        const user = result.user;
        setUser(user);
        setTimeout(() => {
          history.replace("/pages-profile");
          setmodal_successMessage(false);
        }, 2000);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const updateUserProfile = (displayName, photoURL, phoneNumber) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL ? photoURL : "",
    })
      .then(() => {
        // set the user to session storage user
        const userInfos = {
          username: username,
          category: category,
          user: auth.currentUser,
          phoneNumber: phoneNumber,
        };
        // set the info in session storage
        setUserInfo(userInfos);

        sessionStorage.setItem("userInfo", JSON.stringify(userInfos));
        tog_successMessage();
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
    });
  }, [auth, user]);

  return {
    user,
    error,
    registerUser,
    loginUser,
    modal_successMessage,
    tog_successMessage,
    resetPassword,
    createPassword,
    loginInWithGoogle,
    loginInWithFacebook,
    loginWithGithub,
    loginWithTwitter,
    updateUserProfile,
  };
};

export default useFirebase;
