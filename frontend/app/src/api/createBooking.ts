"use server";

import { formatTime } from "@/utils";
import { revalidatePath } from "next/cache";

export async function createBooking(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const service = formData.get("service");
  const doctor_name = formData.get("doctor_name");
  const date = formData.get("date");
  const start_time = formatTime(formData.get("start_time") as string);
  const end_time = formatTime(formData.get("end_time") as string);

  try {
    const response = await fetch(
      "http://host.docker.internal:5000/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service,
          doctor_name,
          date,
          start_time,
          end_time,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    revalidatePath("/bookings");
    return { success: true, message: "Booking created successfully" };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      message: "An error occurred while creating the booking",
    };
  }
}
