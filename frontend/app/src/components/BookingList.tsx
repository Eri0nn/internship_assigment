"use client";

import { Booking } from "@/types/booking";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, DatePicker, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import React, { useState } from "react";

const BookingList = ({ bookings }: { bookings: Booking[] }) => {
  const columns: ColumnsType<Booking> = [
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
        <Typography.Text strong>
          Total Bookings: {bookings.length}
        </Typography.Text>
      </Card>
    </div>
  );
};

export default BookingList;
