import React from "react";

//import Scss
import "./assets/scss/themes.scss";

//imoprt Route
import Route from "./Routes";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// Fake Backend
import fakeBackend from "./helpers/AuthType/fakeBackend";
import AuthProvider from "./auth/Firebase/authProvider";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;

/* <Routes>
        {publicRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <NonAuthLayout>
                <route.component />
              </NonAuthLayout>
            }
          />
        ))}
        {authProtectedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <AuthProtected>
                <route.component />
              </AuthProtected>
            }
          />
        ))}
      </Routes> */