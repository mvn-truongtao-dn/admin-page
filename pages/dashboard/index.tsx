import Header from "@/components/layout/header";
import axios from "axios";
import { getCsrfToken, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import useSWR from "swr";

type Props = {};

export default function Dashboard({}: Props) {
  const { data: session, status } = useSession();
  const user: any = session?.user;

  console.log(user);

  const address = "https://example-service-nodejs.onrender.com/users/me";
  const fetcher = async (url: string) =>
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RiNjJkOWJmMjI2NmJiZDk2ZTA3N2UiLCJpYXQiOjE2NzU0MDg2Nzd9.PuEGYmACfpO2VwJw3T1eow06Sm-cmSfTj6_yIa006Fk`,
        },
      })
      .then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);
  if (error) <p>Loading failed...</p>;
  if (!data) <h1>Loading...</h1>;
  return (
    <>
      <Header />
      {data && (
        <div>
          <h1>Hello</h1>
          {data.name}
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  // console.log(await getServerSession(req, res, authOptions));
  const csrfToken = await getCsrfToken();
  console.log("token", csrfToken);

  return {
    props: {
      // session: await getServerSession(req, res, authOptions),
    },
  };
}
