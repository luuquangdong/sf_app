import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { getMyTournaments } from "../../apis/tournamentApi";
import EmptyComponent from "../../component/EmptyComponent";
import MyHeader from "../../component/MyHeader";
import Separator from "../../component/Separator";
import TournamentItem from "../../component/Tournament/TournamentItem";

const TournamentManagerScreen = ({ navigation }) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getMyTournaments();
      setTournaments(data);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTournamentPressed = () => {
    navigation.navigate("CreateTournament");
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TournamentItem tournament={item} />}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        ListHeaderComponent={
          <View>
            <Separator />
            <MyHeader
              title="Tạo giải đấu"
              onPress={handleCreateTournamentPressed}
            />
            <Separator />
          </View>
        }
        ListEmptyComponent={<EmptyComponent text="Không có giải đấu nào" />}
      />
    </View>
  );
};

export default TournamentManagerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
