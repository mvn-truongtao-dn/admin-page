import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import Header from "@/components/layout/header";
import { useRef } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const blockRef = useRef<any>("");
  console.log(blockRef.current.value);

  console.log(session);
  return (
    <>
      <Header />
      {/* <div ref={blockRef}>hello</div> */}
      <input type="text" ref={blockRef} />
      <button>submit</button>
    </>
  );
}
