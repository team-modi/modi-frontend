import { useNavigate } from "react-router-dom";

const SubHeader = ({ title, type }) => {
  const navigate = useNavigate();

  const handleMove = () => {
    if (type === "soon") {
      // 곧 끝나기 전에 봐야 할 전시
      navigate("/login");
    } else if (type === "new") {
      // 이번 달 새로 열리는 전시
      navigate("");
    } else if (type === "free") {
      // 무료로 볼 수 있는 전시
      navigate("");
    }
  };

  return (
    <header className="sub-header-body">
      <p className="sub-header-title">{title}</p>
      <button type="button" className="sub-header-moveBtn" onClick={handleMove}>
        전체보기
      </button>
    </header>
  );
};

export default SubHeader;
