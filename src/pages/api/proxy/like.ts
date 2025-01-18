/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, s_number, liked_content_id, liked_content_type } = req.body;

  const token = req.headers["x-auth-token"] as string;

  if (!token) {
    return res.status(400).json({ message: "Missing x-auth-token in headers" });
  }

  if (!id || !s_number || !liked_content_id || !liked_content_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const apiUrl = `https://api.gotinder.com/like/${id}?locale=en`;
    const response = await axios.post(
      apiUrl,
      {
        s_number,
        liked_content_id,
        liked_content_type,
      },
      {
        headers: {
          accept: "application/json",
          "x-auth-token": token,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
}
