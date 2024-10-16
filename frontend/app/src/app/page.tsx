import { getBookings } from "@/api/getBookings";
import BookingList from "@/components/BookingList";

const Home = async () => {
  const bookings = await getBookings();
  return (
    <div className="flex h-screen items-center justify-center">
      <BookingList bookings={bookings} />
    </div>
  );
};

export default Home;
