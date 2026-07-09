import { useEffect, useState } from "react";

// components
import Header from "@components/common/Header";
import ExhibitCard from "@components/exhibition/ExhibitCard";
import ExhibitListHeader from "@components/common/ExhibitListHeader";

// styles
import "@styles/common/ExhibitionList.css";

// api
import { getExhibitionList } from "@api/exhibition";

const ExhibitionList = ({ title, section, type }) => {
  const [exhibitionData, setExhibitionData] = useState([]);
  const [sort, setSort] = useState("latest");

  const exhibitionList = async () => {
    try {
      const response = await getExhibitionList({
        section: { section },
        sort,
      });
      setExhibitionData(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await exhibitionList();
    })();
  }, [sort]);

  return (
    <div className="app-shell">
      <Header type="sub" title={title} />
      <div className="app-content">
        <ExhibitListHeader
          total={exhibitionData.length}
          sort={sort}
          onSortChange={setSort}
          onFilterClick={() => {
            // 필터 모달/바텀시트 열기
          }}
        />
        <div className="exhibitionList-body">
          {type === "row" ? (
            <div className="home-section-row">
              {exhibitionData.map((exhibit) => (
                <ExhibitCard
                  key={exhibit.exhibitionId}
                  type="vertical"
                  thumbnail={exhibit.posterUrl}
                  title={exhibit.title}
                  place={exhibit.place}
                  startDate={exhibit.startDate}
                />
              ))}
            </div>
          ) : (
            <div className="home-section-vertical">
              {exhibitionData.map((exhibit) => (
                <ExhibitCard
                  key={exhibit.exhibitionId}
                  thumbnail={exhibit.posterUrl}
                  title={exhibit.title}
                  place={exhibit.place}
                  startDate={exhibit.startDate}
                  endDate={exhibit.endDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionList;
