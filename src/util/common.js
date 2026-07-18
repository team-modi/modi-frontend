// 디데이
export function getDday(endDate) {
  if (!endDate) return null;

  const [year, month, day] = endDate.split("-").map(Number);
  const end = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return null;
  if (diffDays === 0) return "D-DAY";
  return `D-${diffDays}`;
}

// 2024.02.01 => 2.1
export function formatMonthDay(dateString) {
  if (!dateString) return "";
  const [, month, day] = dateString.split("-").map(Number);
  return `${month}.${day}`;
}

// "YYYY-MM-DD" -> "MM.DD"
export function formatMonthDayDot(dateKey) {
  if (!dateKey) return "";
  const [, month, day] = dateKey.split("-");
  if (!month || !day) return dateKey;
  return `${month}.${day}`;
}

// "YYYY-MM-DD" -> "YYYY. MM. DD"
export function formatDateDot(dateKey) {
  if (!dateKey) return "";
  const [year, month, day] = dateKey.split("-");
  if (!year || !month || !day) return dateKey;
  return `${year}. ${month}. ${day}`;
}

const REMIND_COMPLETED_DATE_KEY = "modi:remindCompletedDate";

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

export function markRemindCompletedToday() {
  localStorage.setItem(REMIND_COMPLETED_DATE_KEY, todayKey());
}

export function isRemindCompletedToday() {
  return localStorage.getItem(REMIND_COMPLETED_DATE_KEY) === todayKey();
}
