"use client";
import { Booking } from "@/types/booking";
import { formatDate } from "@/utils";
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Descriptions } from "antd";
import Link from "next/link";
import React from "react";

const BookingDetails = ({ booking }: { booking: Booking }) => {
  return (
    <Card
      style={{ width: 600 }}
      className="shadow-md"
      title={<h1 className="text-2xl font-bold">Booking Details</h1>}
      extra={
        <Link href="/">
          <Button icon={<ArrowLeftOutlined />}>Back to Home</Button>
        </Link>
      }
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item
          label={
            <span>
              <UserOutlined /> Doctor
            </span>
          }
        >
          <span className="font-semibold">{booking.doctor_name}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <ToolOutlined /> Service
            </span>
          }
        >
          <span className="font-semibold">{booking.service}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <CalendarOutlined /> Date
            </span>
          }
        >
          <span className="font-semibold">{formatDate(booking.date)}</span>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <span>
              <ClockCircleOutlined /> Time
            </span>
          }
        >
          <span className="font-semibold">
            {booking.start_time.toString()} - {booking.end_time.toString()}
          </span>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default BookingDetails;
