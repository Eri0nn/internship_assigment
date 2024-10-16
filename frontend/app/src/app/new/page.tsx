"use client";

import { createBooking } from "@/api/createBooking";
import { Booking } from "@/types/booking";
import { ArrowLeftOutlined, CalendarOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Select,
  TimePicker,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Option } = Select;

export default function BookingPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: Booking) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("service", values.service);
      formData.append("doctor_name", values.doctor_name);
      formData.append("date", values.date.toISOString().split("T")[0]);
      formData.append(
        "start_time",
        values.start_time.toISOString().split("T")[1].split(".")[0]
      );
      formData.append(
        "end_time",
        values.end_time.toISOString().split("T")[1].split(".")[0]
      );

      const result = await createBooking(formData);
      if (result.success) {
        message.success(result.message);
        form.resetFields();
        router.push("/");
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("An error occurred while creating the booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card
        title={<h1 className="text-2xl font-bold">New Booking</h1>}
        bordered={false}
        className="w-full max-w-md shadow-lg"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <FormItems />
          <FormButtons loading={loading} />
        </Form>
      </Card>
    </div>
  );
}

const FormItems = () => (
  <>
    <Form.Item
      name="service"
      label="Service"
      rules={[{ required: true, message: "Please select a service" }]}
    >
      <Select placeholder="Select a service">
        <Option value="service A">Service A</Option>
        <Option value="service B">Service B</Option>
        <Option value="service C">Service C</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="doctor_name"
      label="Doctor Name"
      rules={[{ required: true, message: "Please enter the doctor name" }]}
    >
      <Input placeholder="Enter a doctor's name" />
    </Form.Item>

    <Form.Item
      name="date"
      label="Date"
      rules={[{ required: true, message: "Please select a date" }]}
    >
      <DatePicker className="w-full" />
    </Form.Item>

    <Form.Item
      name="start_time"
      label="Start Time"
      rules={[{ required: true, message: "Please select a start time" }]}
    >
      <TimePicker format="HH:mm" className="w-full" />
    </Form.Item>

    <Form.Item
      name="end_time"
      label="End Time"
      rules={[{ required: true, message: "Please select an end time" }]}
    >
      <TimePicker format="HH:mm" className="w-full" />
    </Form.Item>
  </>
);

const FormButtons = ({ loading }: { loading: boolean }) => (
  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      className="mb-2 w-full"
      icon={<CalendarOutlined />}
    >
      Create Booking
    </Button>
    <Link href="/" passHref>
      <Button type="default" className="w-full" icon={<ArrowLeftOutlined />}>
        Cancel Booking
      </Button>
    </Link>
  </Form.Item>
);
