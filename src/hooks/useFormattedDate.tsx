import dayjs from "dayjs";

function useFormattedDate(date: string): string {
  return dayjs(date).format("ddd, D MMM YYYY");
}

export default useFormattedDate;
