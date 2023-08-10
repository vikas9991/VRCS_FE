"use client";
import MenuTable from "../components/MenuTable";
import PopupMenu from "../components/PopupMenu";
import {useContext } from "react";
import { UserContext } from "../app/layout.js";


export default function MyComponent() {
  const { state, dispatch } = useContext(UserContext);
  return (<div><MenuTable/> {state ? <div className = "flex justify-center"><PopupMenu/></div> : null}</div>);
}

{/* <div className = "flex justify-center"><PopupMenu/></div> */}