const BlogCreate = ({newTitle, newAuthor, newUrl, handleChangeTitleF, handleChangeAuthorF, handleChangeUrlF, handleCreateBlogF}) => {
    return (
      <form onSubmit={handleCreateBlogF}>
        <div>
          title: <input type="text" value={newTitle} onChange={handleChangeTitleF}/>
        </div>
        
        <div>
          author: <input type="text" value={newAuthor} onChange={handleChangeAuthorF}/>
        </div>
  
        <div>
          url: <input type="text" value={newUrl} onChange={handleChangeUrlF}/>
        </div>
        
        <button>create</button>
      </form>
  )}

  export default BlogCreate