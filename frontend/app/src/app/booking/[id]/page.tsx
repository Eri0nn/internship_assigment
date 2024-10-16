import { getBookings } from "@/api/getBookings";
import BookingDetails from "@/components/BookingDetails";
import { Booking } from "@/types/booking";
import { Result } from "antd";
import Link from "next/link";

async function getBookingDetails(id: string): Promise<Booking | undefined> {
  const bookings = await getBookings();
  const booking = bookings.find((b) => b.id === parseInt(id));

  return booking;
}

export default async function BookingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const booking = await getBookingDetails(params.id);

  if (!booking) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the booking you're looking for does not exist."
        extra={<Link href="/">Back Home</Link>}
      />
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <BookingDetails booking={booking} />
    </div>
  );
}
