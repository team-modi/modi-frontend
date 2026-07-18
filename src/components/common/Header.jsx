import { useNavigate } from "react-router-dom";

// styles
import "@styles/common/Header.css";

const Header = ({ type, title, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();
    navigate(-1);
  };

  if (type === "sub") {
    return (
      <header className="app-header app-header--sub">
        <button type="button" className="header-icon-btn" onClick={handleBack} aria-label="뒤로가기">
          <ChevronLeftIcon />
        </button>
        <h1 className="header-title">{title}</h1>
      </header>
    );
  }

  if (type === "archive") {
    return (
      <header className="app-header app-header--archive">
        <h1 className="header-title-left text-heading-1">{title}</h1>
        <div className="header-right-slot">
          <div className="header-right-placeholder" />
        </div>
      </header>
    );
  }

  return (
    <header className="app-header app-header--main">
      <div className="header-logo">Logo</div>
    </header>
  );
};

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Header;
