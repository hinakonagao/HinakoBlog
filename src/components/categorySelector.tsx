// カテゴリー選択ボタン

import blogStyles from '../styles/blog.module.css'

export default function CategorySelector({ category, selectPosts }) {
  switch (category) {
    case 'Web':
      return (
        <button
          onClick={() => selectPosts(category)}
          className={blogStyles.categorySelectorWeb}
        >
          {category}
        </button>
      )
    case 'PHP/Laravel':
    case 'React/Next.js':
    case 'TypeScript':
    case 'JavaScript':
      return (
        <button
          onClick={() => selectPosts(category)}
          className={blogStyles.categorySelectorPrograming}
        >
          {category}
        </button>
      )
    case 'Git':
    case 'Docker':
      return (
        <button
          onClick={() => selectPosts(category)}
          className={blogStyles.categorySelectorOthers}
        >
          {category}
        </button>
      )
  }
}
