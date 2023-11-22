export const changeFormateDate = (oldDate: string) => {
  return oldDate.split("-").reverse().join("/");
};

enum WeekDayptBR {
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
}

export const getWeekDayPtBRFromDate = (date: Date) => {
  return Object.values(WeekDayptBR)[date.getDay() + 1];
};
