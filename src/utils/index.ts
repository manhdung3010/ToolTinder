/* eslint-disable @typescript-eslint/no-explicit-any */
export function calculateAge(birthDateString: string): any {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Kiểm tra nếu tháng hiện tại chưa qua hoặc ngày hiện tại chưa qua
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age || "-";
}
