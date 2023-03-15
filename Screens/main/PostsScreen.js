import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreenPost from "../nested/DefaultScreenPost";
import CommentsScreen from "../nested/CommentsScreen";
import MapScreen from "../nested/MapScreen";
import BtnLogOut from "../../components/BtnLogOut/BtnLogOut";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreenPost"
        component={DefaultScreenPost}
        options={{
          headerShown: false,
          headerRight: () => <BtnLogOut />,
        }}
      />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
