import blogStyles from '../styles/blog.module.css'

// React icon
import { FaReact, FaPhp, FaLaravel } from 'react-icons/fa'
import { SiTypescript, SiJavascript } from 'react-icons/si'
import { MdComputer } from 'react-icons/md'

export default function CategoryIcon({ category }) {
  return (
    <>
      {category === 'Web' && (
        <MdComputer className={blogStyles.categoryIconWeb} />
      )}
      {category === 'PHP/Laravel' && (
        <>
          <FaPhp className={blogStyles.categoryIconPhp} />
          <FaLaravel className={blogStyles.categoryIconLaravel} />
        </>
      )}
      {category === 'React/Next.js' && (
        <FaReact className={blogStyles.categoryIconReact} />
      )}
      {category === 'TypeScript' && <SiTypescript />}
      {category === 'JavaScript' && (
        <SiJavascript className={blogStyles.categoryIconJavaScript} />
      )}
    </>
  )
}
