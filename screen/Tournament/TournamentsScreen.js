import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getListTournament } from "../../apis/tournamentApi";
import EmptyComponent from "../../component/EmptyComponent";
import MyHeader from "../../component/MyHeader";
import Search from "../../component/Search";
import Separator from "../../component/Separator";
import SearchForm from "../../component/Tournament/SearchForm";
import TournamentItem from "../../component/Tournament/TournamentItem";

const SIZE = 10;

const TournamentsScreen = ({ navigation }) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [lastTournamentId, setLastTournamentId] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [endOfData, setEndOfData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const hanleOpenSearch = () => setOpenSearch(true);
  const closeSearch = () => setOpenSearch(false);

  const handleMyTournamentPressed = () => {
    navigation.navigate("MyTournamentTopTab");
  };

  const handleEndReach = ({ distanceFromEnd }) => {
    console.log(distanceFromEnd);
    fetchData();
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getListTournament(SIZE, null);
      setTournaments([...data]);
      if (data.length > 0) setLastTournamentId(data[data.length - 1].id);
      setEndOfData(data.length < SIZE);
    } catch (err) {
      console.log({ err });
    } finally {
      setRefreshing(false);
    }
  };

  const fetchData = async () => {
    if (endOfData || loading) return;
    setLoading(true);
    try {
      const data = await getListTournament(SIZE, lastTournamentId);
      // console.log(data);
      setTournaments([...tournaments, ...data]);
      if (data.length > 0) setLastTournamentId(data[data.length - 1].id);
      setEndOfData(data.length < SIZE);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  useEffect(fetchData, []);

  return (
    <View style={styles.container}>
      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TournamentItem tournament={item} />}
        ListHeaderComponent={
          <View style={{ marginBottom: 8 }}>
            <Separator />
            <MyHeader
              title="Giải đấu của tôi"
              onPress={handleMyTournamentPressed}
            />
            <Separator />
            {openSearch ? (
              <SearchForm closeSearch={closeSearch} />
            ) : (
              <Search onPress={hanleOpenSearch} />
            )}
          </View>
        }
        onEndReached={handleEndReach}
        onEndReachedThreshold={0.01}
        ListFooterComponent={<Footer loading={loading} endOfData={endOfData} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={
          <EmptyComponent text="Hiện không có giải đấu nào sắp diễn ra" />
        }
      />
    </View>
  );
};

export default TournamentsScreen;

const Footer = ({ loading, endOfData }) => {
  return (
    <>
      {loading && !endOfData ? <ActivityIndicator /> : null}
      {endOfData && (
        <View style={styles.footer}>
          <Text>Không còn giải đấu nào nữa.</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    marginTop: 8,
    backgroundColor: "#FFF",
    alignItems: "center",
    padding: 10,
  },
});
