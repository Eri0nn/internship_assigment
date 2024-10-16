"use client";

import { Booking } from "@/types/booking";
import { Space, Table } from "antd";
import Link from "next/link";
import React from "react";

const BookingTable = ({ bookings }: { bookings: Booking[] }) => {
  const columns = [
    {
      title: "Booking Id",
      dataIndex: "id",
      key: "id",
      render: (id) => <span>{`${id}`}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time",
      key: "time",
      render: (_, record) => <span>{`${record.start_time}`}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Link href={`/booking/${record.id}`}>View</Link>
        </Space>
      ),
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      dataSource={bookings}
      rowKey="id"
      pagination={{
        pageSize: 5,
        showQuickJumper: true,
      }}
    />
  );
};

export default BookingTable;
