import * as apiServer from '@/services/api/server'

async function ListPosts() {
  //   const posts = await fetchServer('/posts', {
  //     method: 'GET'
  //   }).then(response => response.json())

  const posts = await apiServer.List()

  if (!posts) return null

  return (
    <div>
      {posts?.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}

export { ListPosts }
