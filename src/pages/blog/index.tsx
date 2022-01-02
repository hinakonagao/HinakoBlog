import { useState } from 'react'
import Link from 'next/link'

// React icon
import { FaGithub, FaTwitter } from 'react-icons/fa'
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
import footer from '../../styles/footer.module.css'
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
  console.log(posts)

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
  const selectCategory = (category) => {
    if (category === 'all') {
      setShowPosts(posts)
    } else {
      const selectedPosts = posts.filter((post) => post.Category === category)
      setShowPosts(selectedPosts)
    }

    // ページ最上部へ
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // 年月リスト
  const months = []
  posts.map((post) => {
    if (months.indexOf(post.Month) == -1) {
      months.push(post.Month)
    }
  })

  console.log(months)

  // 月ごと絞りこみ
  const selectMonth = (month) => {
    const selectedPosts = posts.filter((post) => post.Month === month)
    setShowPosts(selectedPosts)

    // ページ最上部へ
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <div>
        <Header titlePre="Hinako Blog" />
        <h1 className={blogStyles.titleBlog}>Blog</h1>

        {/* カテゴリー選択ボタン */}
        <div className={blogStyles.categorySelector}>
          <h3>Category：</h3>
          <button
            onClick={() => selectCategory('all')}
            className={blogStyles.categorySelectorAll}
          >
            All
          </button>
          {categories.map((category) => (
            <CategorySelector
              category={category}
              selectCategory={selectCategory}
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
      <div className={footer.container}>
        <div className={footer.footer}>
          {/* カテゴリー絞り込み */}
          <div className={footer.category}>
            <h3>Category</h3>
            <div
              onClick={() => selectCategory('all')}
              className={footer.categorySelector}
            >
              All
            </div>
            {categories.map((category) => (
              <div
                onClick={() => selectCategory(category)}
                className={footer.categorySelector}
              >
                {category}
              </div>
            ))}
          </div>
          {/* 月ごと絞り込み */}
          <div className={footer.monthly}>
            <h3>Monthly</h3>
            {months.map((month) => (
              <div
                onClick={() => selectMonth(month)}
                className={footer.categorySelector}
              >
                {month}
              </div>
            ))}
          </div>
          <div className={footer.sns}>
            <a href="https://twitter.com/napi_nami">
              <FaTwitter className={sharedStyles.twitter} />
            </a>
            <a href="https://github.com/hinakonagao">
              <FaGithub className={sharedStyles.github} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
