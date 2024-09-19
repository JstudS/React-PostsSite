import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState(undefined)
    const [comment, setComment] = useState(undefined)
   
    useEffect(() => {
        const fetchPostIdPage = async() => {
          const resPost = await PostService.getById(params.id)
          const resComment = await PostService.getComments(params.id)
          setPost(resPost)
          setComment(resComment)
        }
         fetchPostIdPage()
    }, )

    
    return (
      <div>
        <h1>
            Post №{params?.id}
        </h1>
        { post 
          ? <div>{post.id} {post.body}</div> 
          : <Loader />
        }
        <h1 style={{marginTop: 15}}>
          Comments
        </h1>
        {comment 
          ? <div>{comment.map((comm, index) => {
              return (
                <div key={index} style={{marginTop: 15}}>
                  <h5>{comm.email}</h5>
                  <div>{comm.body}</div>
                </div>
              )
            })}
          </div>
          : <Loader />
        }
      </div>
    )      
  }
  
  export default PostIdPage;