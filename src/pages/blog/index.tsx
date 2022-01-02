import { useState } from 'react'
import Link from 'next/link'

// notion
import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import getNotionUsers from '../../lib/notion/getNotionUsers'

import getBlogIndex from '../../lib/notion/getBlogIndex'
// styles
import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'
//components
import Header from '../../components/header'
import CategoryIcon from '../../components/categoryIcon'
import CategorySelector from '../../components/categorySelector'

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

const Index = ({ posts = [], preview }) => {
  // 記事を新着順に並び替え
  posts.sort((a, b) => b.Date - a.Date)
  const [showPosts, setShowPosts] = useState(posts)

  // カテゴリーリスト
  const categories = [
    'Web',
    'PHP/Laravel',
    'React/Next.js',
    'TypeScript',
    'JavaScript',
    'Git',
    'Docker',
  ]

  // カテゴリー絞り込み
  const selectPosts = (category) => {
    const selectedPosts = posts.filter((post) => post.Category === category)
    setShowPosts(selectedPosts)
  }

  return (
    <>
      <div>
        <Header titlePre="Hinako Blog" />
        <h1 className={blogStyles.titleBlog}>Blog</h1>

        {/* Category選択ボタン */}
        <div className={blogStyles.categorySelector}>
          <h3>Category：</h3>
          <button
            onClick={() => setShowPosts(posts)}
            className={blogStyles.categorySelectorAll}
          >
            All
          </button>
          {categories.map((category) => (
            <CategorySelector
              category={category}
              selectPosts={selectPosts}
              key={category}
            />
          ))}
        </div>
      </div>

      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        {showPosts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts</p>
        )}
        {showPosts.map((post) => {
          return (
            <div className={blogStyles.postPreview} key={post.Slug}>
              <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                <a>
                  <h3>
                    <span className={blogStyles.titleContainer}>
                      {post.Page}
                    </span>
                  </h3>
                  <div className={blogStyles.blogInfo}>
                    {post.Category && (
                      <div className={blogStyles.category}>
                        <CategoryIcon category={post.Category} />
                        {post.Category}
                      </div>
                    )}
                    {post.Date && (
                      <div className={blogStyles.posted}>
                        {getDateStr(post.Date)}
                      </div>
                    )}
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Index
