/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { calculateAge } from "@/utils";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("/api/proxy/tinder", {
        headers: {
          "x-auth-token": token,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLike = async (
    id: string,
    s_number: string,
    liked_content_id: string
  ) => {
    try {
      await axios.post("/api/proxy/like", {
        id,
        s_number,
        liked_content_id,
        liked_content_type: "photo",
        headers: {
          "x-auth-token": token,
        },
      });
      alert(`Liked user with id: ${id}`);
    } catch (error) {
      console.error("Error liking user:", error);
      alert("Failed to like user");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const openModal = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 fixed bottom-5 right-5"
      >
        Refetch
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {data?.data?.results?.map((item: any) => (
          <div
            key={item?.user?._id}
            className="bg-white shadow-md rounded-lg p-4"
            style={{
              border: item?.user?.online_now && "2px solid green",
            }}
          >
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2">
                <h2 className="text-3xl font-bold">{item?.user?.name}</h2>
                <span className="text-lg flex items-center font-bold bg-[#59CFED] px-2 rounded-full">
                  {calculateAge(item?.user?.birth_date)}
                </span>
              </div>
              <h2 className="text-lg font-bold">
                {
                  item?.ui_configuration?.id_to_component_map?.distance?.text_v1
                    ?.content
                }
              </h2>
            </div>
            {/* <h2 className="text-lg font-bold">id: {item?.user?._id}</h2> */}
            {/* <h2 className="text-lg font-bold">s_number: {item?.s_number}</h2> */}

            <div className="p-2 rounded-lg my-2 bg-[#cccc]">
              <h2 className="text-lg font-bold ">{item?.user?.bio}</h2>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {item?.user?.photos?.map((photo: any, index: number) =>
                photo?.processedFiles[0]?.url ? (
                  <div key={index}>
                    <Image
                      alt={`${item?.user?.name}'s photo`}
                      src={photo?.processedFiles[0]?.url}
                      width={photo?.processedFiles[0]?.width || 100}
                      height={photo?.processedFiles[0]?.height || 100}
                      className="w-full h-full cursor-pointer"
                      onClick={() => openModal(photo?.processedFiles[0]?.url)}
                    />

                    {/* <p>{photo?.id}</p> */}
                  </div>
                ) : null
              )}
            </div>
            <button
              onClick={() =>
                handleLike(
                  item?.user?._id,
                  item?.s_number,
                  item?.user?.photos[0]?.id
                )
              }
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Like
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPhoto && (
        <div
          className="fixed inset-0 h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className=" h-full flex items-center rounded-lg">
            <div className="h-4/5 relative">
              <button
                onClick={closeModal}
                className="absolute top-0 right-2 text-white bg-red-500 rounded-full p-2"
              >
                ✕
              </button>
              <Image
                alt="Selected photo"
                src={selectedPhoto}
                width={500}
                height={500}
                className="rounded-lg w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
