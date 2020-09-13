import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql";

function Home() {
  return <div>Home Page</div>;
}

const FETCH_POSTS_QUERY = gql`
  getPosts {
    id body createdAt usrename likeCount
  }
`;

export default Home;
