// 리마인드> 수정한 내용 저장 페이지
import { useLocation, useNavigate } from "react-router-dom";

// components
import Header from "@components/common/Header";

// styles
import "@styles/remind/RemindCompletePage.css";

export default function RemindCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recordId } = location.state ?? {};

  const handleGoToArchive = () => {
    navigate(recordId ? `/record/${recordId}` : "/yeowun");
  };

  return (
    <div className="app-shell">
      <Header type="sub" title="감정 변화 요약" onBack={() => navigate("/yeowun")} />
      <div className="app-content">
        <div className="app-content-pad remind-complete">
          <div className="remind-complete-thumb" />
          <h1 className="remind-complete-title text-title-3">오늘의 여운이 저장되었어요</h1>
          <p className="remind-complete-subtitle text-body-2-regular">
            아카이브의 &apos;리마인드&apos;에서
            <br />
            확인해 보세요
          </p>
        </div>
      </div>

      <div className="remind-complete-footer">
        <button type="button" className="remind-complete-btn text-body-1-medium" onClick={handleGoToArchive}>
          아카이브 보러가기
        </button>
      </div>
    </div>
  );
}
