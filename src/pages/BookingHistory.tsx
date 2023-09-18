import Navbar from "../components/Navbar";
import HistoryCard from "../components/BookingHistory/HistoryCard";
import Footer from "../components/Footer";

function BookingHistory() {
  return (
    <div>
      <Navbar />
      <div className="bg-bg flex flex-col items-center pt-20 pb-28">
        <h1 className="mb-12 w-[1120px] font-noto-serif-display text-headline2 font-medium text-green-800">
          Booking History
        </h1>
        <HistoryCard />
      </div>
      <Footer />
    </div>
  );
}

export default BookingHistory;
