"use client";
import React, { useState, useContext } from "react";
import Image from "next/image.js";
import axios from "axios";
import { UserContext } from "../app/layout.js";

const PopupMenu = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemCategory, setItemCategory] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  async function getItemCategory() {
    const response = await axios({
      method: "get", //you can set what request you want to be
      url: "http://localhost:8080/livemenu/api/item",
      headers: {
        authorization: `Bearer ${state}`,
      },
    });
    // return response.data;
    setItemCategory(response.data.map((ic) =>{return ic;}));
  }

  // console.log(getItemCategory());
  getItemCategory();

  // console.log(itemCategory);
  const handleAddItem = async (event) => {
    event.preventDefault();
    let selectField = event.target.item;
    let selectedItemId = (selectField.options[selectField.selectedIndex].value);
    console.log(selectedItemId);
    try {
      const response = await axios({
        method: "post", //you can set what request you want to be
        url: `http://localhost:8080/livemenu/api/menuBoard/${selectedItemId}`,
        headers: {
          authorization: `Bearer ${state}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.warning("invalid user credentials", { position: "top-center" });
    }
  };

  

  return (
    <div className="relative">
      {/* Button to trigger the popup menu */}
      <button onClick={togglePopup}>
        <Image
          src="/plus-button.png"
          width={30}
          height={30}
          alt="logo"
          className="focus:border-none active:border-none"
        />
      </button>

      {/* Background overlay */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={togglePopup}
        ></div>
      )}

      {/* Popup menu */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg ${
          isPopupOpen ? "" : "hidden"
        }`}
      >
        <div className="flex justify-center antialiased text-gray-900 px-6">
          <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
            <div className="py-12">
              <h2 className="text-2xl font-bold">Add one item</h2>
              <div className="mt-8 max-w-md">
                <form
                  action="#!"
                  className="grid grid-cols-4 gap-6"
                  onSubmit={handleAddItem}
                >
                  <label className="block col-span-4">
                    <span className="text-gray-700">Item</span>
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="item"
                    >
                      {itemCategory.map((ic, index) => (<option value = {ic.id} key={ic.id}>{ic.name}</option>))}
                    </select>
                  </label>
                  <button
                    type="submit"
                    className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
                  >
                    Add item
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;
