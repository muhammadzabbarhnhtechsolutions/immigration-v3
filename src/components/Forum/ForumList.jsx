import React from "react";
import ForumCard from "./ForumCard";

const ForumList = ({ refreshPosts }) => {
  
  return (
    <div>
      <ForumCard refreshPosts={refreshPosts} />
    </div>
  );
};

export default ForumList;
