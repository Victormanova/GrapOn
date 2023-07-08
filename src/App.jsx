import React, { useEffect, useState } from "react";
import Posts from "./Pages/Posts/Posts";
import { Routes, Route } from "react-router-dom";
import Post from "./Pages/Post/Post";
import axios from "axios";

export const DataContext = React.createContext();
const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
  
    <DataContext.Provider value={{posts, setPosts}}>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
      </DataContext.Provider>
   
    </>
  );
};

export default App;
