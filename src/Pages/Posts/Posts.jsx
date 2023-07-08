import {useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Posts.css";
import { DataContext } from "../../App";

const Posts = () => {
  const navigate = useNavigate();

  let context = useContext(DataContext);


  const handleDelete = async (id) => {
  let allposts = [...context.posts]
  const updatedPosts = allposts.filter((post) => post.id !== id);
  context.setPosts(updatedPosts);
  };

  return (
    <div className="posts">
      <div className="container">
        <button
          onClick={() => navigate("/post/new")}
          className="btn btn-primary mb-4"
        >
          New Post
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {context.posts.map((post) => (
              <tr key={post.id}>
                <td> {post.title} </td>
                <td> {post.body} </td>
                <td>
                  <button
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="btn btn-primary"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="btn btn-danger"
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
  );
};

export default Posts;
