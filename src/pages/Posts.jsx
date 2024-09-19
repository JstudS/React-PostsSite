import React, { useEffect, useRef, useState } from "react";
import PostList from "../components/PostList.jsx";
import PostForm from "../components/PostForm.jsx";
import PostFilter from "../components/PostFilter.jsx";
import MyModal from "../components/UI/MyModal/MyModal.jsx";
import MyButton from "../components/UI/button/MyButton.jsx";
import { usePost } from "../hooks/usePosts.js";
import PostService from "../API/PostService.js";
import Loader from "../components/UI/loader/Loader.jsx";
import { useFetching } from "../hooks/useFetching.js";
import { getPagesCount } from "../utils/pages.js";
import Pagination from "../components/UI/pagination/Pagination.jsx";
import { useObserver } from "../hooks/useObesrver.js";
import MySelect from "../components/UI/select/MySelect.jsx";

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query)
  const lastElement = useRef()
  const getAllPosts = async(limit, page) => {
    const responce = await PostService.getAll(limit, page)
    setPosts([...posts, ...responce.data])
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  }

  const [fetchPosts, isPostsLoading, postError] = useFetching(getAllPosts)

  useObserver(lastElement, page < totalPages, isPostsLoading, () => setPage(page + 1))

  useEffect(() => {
    fetchPosts(limit, page)
  }, [page, limit])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) =>{
    setPage(page)
  }

  return (
    <div className="App">
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
      <MyButton onClick={() => setModal(true)} style={{marginTop: 30}}>Create new Post</MyButton>

      <hr style={{margin: "15px 0"}}/>

      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />

      <MySelect  
        value={limit} 
        onChange={value => setLimit(value)} 
        defaultValue={'Limit of elements in the page'} 
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: 100, name: 'All'}
        ]}
      />

      {postError && 
        <h1>An error {postError} has ocured</h1>
      }

      <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts about JS'}/>
      <div ref={lastElement} style={{height: 20, backgroundColor: "blue"}}/>
      {isPostsLoading && 
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
      }
      
      <Pagination 
        totalPages={totalPages} 
        page={page} 
        changePage={changePage}
      />
      
    </div>
  );
}

export default Posts;