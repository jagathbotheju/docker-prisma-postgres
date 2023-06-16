"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AiTwotoneDelete } from "react-icons/ai";

const UserList = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [userList, setUserList] = useState<User[]>();
  const [loading, setLoading] = useState(true);

  const getUserList = () => {
    setLoading(true);
    axios.get("/api/user").then((data) => {
      setUserList(data.data.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(name, email, address);
    axios
      .post("/api/user", {
        name,
        email,
        address,
      })
      .then(() => {
        toast.success("User Created");
        setName("");
        setAddress("");
        setEmail("");
        getUserList();
      })
      .catch((error) => {
        toast.error("Internal Error");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`/api/user/${id}`)
      .then(() => {
        toast.success("User Deleted");
        getUserList();
      })
      .catch(() => {
        toast.error("Error deleting user");
      });
  };

  console.log(`loading ${loading}`);

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col max-w-lg">
        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Email"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Address"
          />

          <button type="submit" className="py-2 px-4 bg-yellow-700 rounded">
            Submit
          </button>
        </form>
      </div>

      {/* user list */}
      {loading ? (
        <div className="max-w-3xl mx-auto flex">
          <h1 className="text-center text-2xl font-bold bg-red-200 p-10 mt-10 rounded-lg">
            Loading...
          </h1>
        </div>
      ) : !userList && loading ? (
        <>
          <div className="max-w-3xl mx-auto flex">
            <h1 className="text-center text-2xl font-bold bg-red-200 p-10 mt-10 rounded-lg">
              Users Not Found
            </h1>
          </div>
        </>
      ) : (
        <>
          <div className="mt-10">
            {userList &&
              userList.map((user) => (
                <div
                  key={user.id}
                  className="p-5 shadow-md my-5 flex flex-col gap-2 bg-neutral-800 rounded"
                >
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p>{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <AiTwotoneDelete
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
