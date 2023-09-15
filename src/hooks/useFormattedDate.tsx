import dayjs from "dayjs";

function useFormattedDate(date: string): string {
  return dayjs(date).format("dd, DD-MM-YYYY");
}

export default useFormattedDate;
