import { useEffect, useState, useContext } from "react";
import "./Post.css";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
const Post = () => {
  const navigate = useNavigate();
  let params = useParams();
  console.log(params,"skdjfksjd")
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    body: "",
  });
 
  let context = useContext(DataContext);
  const [nextId, setNextId] = useState(context.posts.length);

  useEffect(() => {
    if (!params.id) return;

    const fetchPostData = () => {
      const post = context.posts.find((post) => post.id === parseInt(params.id));
      if (post) {
        setUpdatedPost(post);
      }
    };

    fetchPostData();
  }, [context.posts, params.id]);
  console.log(updatedPost, params, "alsdjflasdjflasjdf")
  const handleChange = (e) => {
    const postClone = { ...updatedPost };
    postClone[e.target.name] = e.target.value;
    setUpdatedPost(postClone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = {
      id: params.id === "new" ? nextId + 1 : parseInt(params.id),
      title: updatedPost.title,
      body: updatedPost.body
    };
    if (params.id !== "new") {
      const index = parseInt(params.id) - 1;
    let allposts = [...context.posts];
    allposts.splice(index, 1, post)
    context.setPosts(allposts)
      return navigate("/");
    } else {
      let allposts = [...context.posts]
      allposts.push(post)
      console.log(updatedPost,"akjfksajdf")
      context.setPosts(allposts);
      return navigate("/");
    }
  };

  return (
    <div className="post__wrapper">
      <div className="container">
        <form className="post">
          <input
            type="text"
            placeholder="Title..."
            name="title"
            value={updatedPost.title}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Content..."
            name="body"
            value={updatedPost.body}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-primary">
            {params.id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
