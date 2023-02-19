import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/config";

export const auhtSignUpUser =
  ({ email, password, login }) =>
  async (dispath, getState) => {
    const state = getState();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

export const auhtSignInUser = () => async (dispatch, getState) => {};
export const auhtSignOutUser = () => async (dispatch, getState) => {};
