"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getAuthTokenFromCookie } from "../app/utility/JWTcookie.js";
import { UserContext } from "../app/layout.js";
import Image from "next/image.js";

export default function MyComponent() {
  const [data, setData] = useState([]);
  const authToken = getAuthTokenFromCookie();
  // const [loggin, setLoggin] = useState(authToken !== null);
  const { state, dispatch } = useContext(UserContext);
  // console.log(loggin + "this is it");

  useEffect(() => {
    // Fetch data from API
    fetchData();

    // Schedule updates every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8080/livemenu/api/menuBoard"
    );
    // console.log(response.data.map((menuItem) => {return menuItem.item;}));
    setData(
      response.data.map((menuItem) => {
        return menuItem.item;
      })
    );
  };
  async function handelDelete(event) {
    // console.log(event.target.value);
    try {
      setData((data) => {
        return data.filter((item) => {
          return item.id != event.target.value;
        });
      });
      console.log(data);
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: `http://localhost:8080/livemenu/api/menuBoard/${event.target.value}/3`,
        headers: {
          authorization: `Bearer ${state}`,
        },
      });
    } catch (error) {
      console.log(error + " this is the error!!");
    }
  }
  if (data.length > 0) {
    return (
      <div className="flex flex-col m-12">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Curries
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Price
                    </th>
                    <th
                      scope="col"
                      className={`px-6 py-4 ${state ? null : "hidden"}`}
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((menuItem, index) => (
                    <tr
                      key={menuItem.id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {menuItem.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {menuItem.price}
                      </td>
                      <td
                        className={`whitespace-nowrap px-6 py-4 ${
                          state ? null : "hidden"
                        }`}
                      >
                        <button
                          onClick={handelDelete}
                          value={menuItem.id}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <h1 className="flex justify-center items-center h-screen">
        The Shop is closed now, Please visit us later!
      </h1>
    );
  }
}
