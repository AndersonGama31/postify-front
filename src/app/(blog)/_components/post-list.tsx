import * as apiServer from '@/services/api/server'

import { PostItem } from './post-item'

async function PostList() {
  const posts = await apiServer.List()

  if (!posts) return null

  return <div className="w-[800px]">{posts?.map(post => <PostItem key={post.id} {...post} />)}</div>
}

export { PostList }
