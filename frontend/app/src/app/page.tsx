import { getBookings } from "@/api/getBookings";
import BookingTable from "@/components/BookingTable";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Link from "next/link";

const Home = async () => {
  const bookings = await getBookings();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl ">
        <Card
          title={<h1 className="p-1 text-3xl font-bold">Bookings</h1>}
          extra={
            <Link href="/new">
              <Button type="primary" icon={<PlusOutlined />} size="middle">
                Create Booking
              </Button>
            </Link>
          }
          bordered
          className=" shadow"
        >
          <BookingTable bookings={bookings} />
          <h1 className="text-md font-bold">
            Total Bookings: {bookings.length}
          </h1>
        </Card>
      </div>
    </div>
  );
};

export default Home;
