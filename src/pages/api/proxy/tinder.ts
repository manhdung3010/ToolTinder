/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Lấy token từ headers của yêu cầu
  const token = req.headers["x-auth-token"] as string;

  if (!token) {
    return res.status(400).json({ message: "Missing x-auth-token in headers" });
  }

  try {
    const apiUrl = "https://api.gotinder.com/v2/recs/core?locale=en&count=60";
    const response = await axios.get(apiUrl, {
      headers: {
        accept: "application/json",
        "x-auth-token": token,
      },
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
