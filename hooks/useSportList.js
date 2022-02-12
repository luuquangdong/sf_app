import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { getListSport } from "../apis/sportApi";
import { sportListState } from "../recoil/atoms/sportListState";

const useSportList = () => {
  const [sportList, setSportList] = useRecoilState(sportListState);

  const fetchListSport = async () => {
    try {
      let data = await getListSport();
      data = data.map((s) => ({ ...s, label: s.name }));
      setSportList(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (sportList.length === 0) {
      console.log("fetchListSport");
      fetchListSport();
    }
  }, []);

  return sportList;
};

export default useSportList;
