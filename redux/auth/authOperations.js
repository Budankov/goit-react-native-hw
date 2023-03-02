import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut, updateUserAvatar } =
  authSlice.actions;

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
        updateUserProfile({
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
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
      const user = userCredential.user;
      console.log("user", user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispath, getState) => {
  try {
    await signOut(auth);
    dispath(authSignOut());
    console.log("User signed out successfully");
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export const authStateChangeUser = () => async (dispath, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        nickname: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
      };
      dispath(updateUserProfile(userUpdateProfile));
      dispath(authStateChange({ stateChange: true }));
    }
  });
};

export const authUpdateAvatar =
  ({ photoURL, isRegestration }) =>
  async (dispath, getState) => {
    if (isRegestration) {
      const userUpdateProfile = {
        photoURL: photoURL,
      };

      dispath(updateUserAvatar(userUpdateProfile));
      return;
    }
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await updateProfile(auth.currentUser, { photoURL });
        const userUpdateProfile = {
          photoURL: photoURL,
        };

        await updateProfile(auth.currentUser, userUpdateProfile);

        dispath(updateUserAvatar(userUpdateProfile));
      }
    });
  };
