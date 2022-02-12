import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSetRecoilState } from "recoil";
import { COLORS } from "../../constant/colors";
import { tournamentState } from "../../recoil/atoms/tournamentState";

const TournamentItem = ({ tournament }) => {
  const navigation = useNavigation();
  const setTournament = useSetRecoilState(tournamentState);

  const handleItemPress = () => {
    setTournament(tournament);
    navigation.push("DetailTournamentTopTab");
  };

  return (
    <TouchableOpacity onPress={handleItemPress} activeOpacity={0.6}>
      <View style={styles.container}>
        <View style={styles.bannerWrap}>
          <Image
            style={styles.banner}
            source={{ uri: tournament.banner?.url }}
            resizeMode="cover"
          />
        </View>
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.name}>
            {tournament.name}
          </Text>
          <Text
            style={styles.time}
          >{`${tournament.startTime} - ${tournament.endTime}`}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.sportTitle}>Bộ môn: </Text>
            <Text style={styles.sportName}>{tournament.sportName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TournamentItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
  },
  bannerWrap: {
    width: 56,
    height: 56,
    backgroundColor: "#DDD",
    marginHorizontal: 8,
  },
  banner: {
    width: 56,
    height: 56,
  },
  info: {
    paddingVertical: 8,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    color: "#33E",
  },
  time: {
    fontSize: 12,
    color: "#777",
  },
  sportTitle: {
    fontSize: 16,
    color: "#333",
  },
  sportName: {
    fontSize: 16,
    color: COLORS.violet,
  },
});
