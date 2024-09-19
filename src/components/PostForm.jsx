import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
  const [post, setPost] = useState({title: '', body: ''})
  
  const addNewPost = (e) => {
      const newPost = {
        ...post, id: Date.now()
      }
      create(newPost)
      setPost({title: '', body: ''})
  }
    return (
        <form>
        <MyInput value={post.title} type="text" placeholder="Name of post"  onChange={(e) => setPost({...post, title: e.target.value}) }/>
        <MyInput value={post.body} type="text" placeholder="Description of post" onChange={(e) => setPost({...post, body: e.target.value})}/>
        <MyButton type='button' onClick={addNewPost}>Create new post</MyButton>
      </form>
    )
}

export default PostForm