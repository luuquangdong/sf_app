import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useRecoilValue } from "recoil";
import { findFriend } from "../../apis/userApi";
import SearchForm from "../../component/FindFriend/SearchForm";
import UserInfoItem from "../../component/FindFriend/UserInfoItem";
import MyHeader from "../../component/MyHeader";
import Search from "../../component/Search";
import { userState } from "../../recoil/atoms/userState";
import { caculateAge } from "../../utils/userUtil";

const Separator = () => <View style={{ height: 8 }}></View>;

const FindFriendScreen = ({ navigation }) => {
  const me = useRecoilValue(userState);
  const [searchMode, setSearchMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const closeSearchMode = () => setSearchMode(false);
  const handleSubmit = async (data) => {
    const myAge = caculateAge(me.birthday) ?? 21;
    if (!data.fromAge) data.fromAge = 1;
    if (!data.toAge) data.toAge = 99;
    if (!data.location?.province)
      data.location = { province: me.location?.province };
    if (!data.age) data.age = myAge;
    console.log(data);
    try {
      setUsers([]);
      setLoading(true);
      const res = await findFriend(data);
      // console.log(res);
      setUsers(res);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const loadData = async () => {
    const data = {};
    const myAge = caculateAge(me.birthday) ?? 21;
    data.fromAge = myAge - 20 < 0 ? 5 : myAge - 20;
    data.toAge = myAge + 20;
    data.location = { province: me.location?.province };
    data.sportIds = me.sports?.map((s) => s.id);
    data.gender = me.gender;
    if (!data.age) data.age = myAge;
    console.log(data);

    try {
      setLoading(true);
      const result = await findFriend(data);
      setUsers(result);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        // onViewableItemsChanged={(data) => {
        //   console.log(data);
        // }}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListHeaderComponent={
          <View>
            <Separator />
            <MyHeader
              title="Bạn của tôi"
              onPress={() => navigation.navigate("MyProfileTopTab")}
            />
            <Separator />
            {searchMode ? (
              <SearchForm
                closeSearchMode={closeSearchMode}
                submit={handleSubmit}
              />
            ) : (
              <View
                style={{
                  marginBottom: 8,
                  borderColor: "#DDD",
                  borderBottomWidth: 0.5,
                }}
              >
                <Search onPress={() => setSearchMode(true)} />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => <UserInfoItem user={item} />}
        keyExtractor={(item) => item.phoneNumber}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default FindFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
