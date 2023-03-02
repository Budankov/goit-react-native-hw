import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { Feather } from "@expo/vector-icons";

const BtnLogOut = () => {
  const dispatch = useDispatch();

  const singOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <TouchableOpacity onPress={singOut}>
      <Feather name="log-out" size={24} style={styles.BtnLogOut} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  BtnLogOut: {
    color: "#BDBDBD",
    marginRight: 10,
  },
});

export default BtnLogOut;
