import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import ExhibitionList from "@components/layout/ExhibitionList";

const HomeDetailExhibitionPage = () => {
  const [data, setData] = useState({});

  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const handleTypeData = () => {
    if (type === "soon") {
      setData({
        section: "ending-soon",
        title: "곧 끝나기 전에 봐야할 전시",
      });
    } else if (type === "free") {
      setData({
        section: "free",
        title: "무료로 볼 수 있는 전시",
      });
    } else if (type === "new") {
      setData({
        section: "opening-this-month",
        title: "이번 달 새로 열리는 전시",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await handleTypeData();
    })();
  }, []);

  return <ExhibitionList title={data.title} section={data.section} type={type === "new" ? "row" : ""} />;
};

export default HomeDetailExhibitionPage;
