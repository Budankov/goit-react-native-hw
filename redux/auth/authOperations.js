import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const authSignUpUser =
  ({ email, password, login }) =>
  async (dispath, getState) => {
    const state = getState();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: state.auth.photoURL,
      });
      const { uid, displayName, photoURL } = auth.currentUser;
      dispath(
        authSlice.actions.updateUserProfile({
          userId: uid,
          nickname: displayName,
          photoURL: photoURL,
          email,
        })
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
      dispath(
        authSlice.actions.showError({
          error: error.message,
        })
      );
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispath, getState) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        dispath(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickname: user.displayName,
            photoURL: user.photoURL,
            email,
          })
        );
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
        dispath(
          authSlice.actions.showError({
            error: error.message,
          })
        );
      });
  };

export const authSignOutUser = () => async (dispath, getState) => {
  try {
    const response = await signOut(auth);
    dispath(authSlice.actions.authSignOut());
  } catch (error) {
    console.log(error);
    console.log(error.message);
    dispath(
      authSlice.actions.showError({
        error: error.message,
      })
    );
  }
};

export const authStateChangeUser = () => async (dispath, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
        // photoURL: user.photoURL,
        email: user.email,
      };
      dispath(authSlice.actions.updateUserProfile(userUpdateProfile));
      dispath(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};

// export const authUpdateAvatar =
//   ({ photoURL, isRegestration }) =>
//   async (dispath, getState) => {
//     if (isRegestration) {
//       const userUpdateProfile = {
//         photoURL: photoURL,
//       };

//       dispath(authSlice.actions.updateUserAvatar(userUpdateProfile));
//       return;
//     }
//     onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         await updateProfile(auth.currentUser, { photoURL });
//         const userUpdateProfile = {
//           photoURL: photoURL,
//         };

//         await updateProfile(auth.currentUser, userUpdateProfile);

//         dispath(authSlice.actions.updateUserAvatar(userUpdateProfile));
//       }
//     });
//   };
