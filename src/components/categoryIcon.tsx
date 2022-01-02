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
      {category === 'Laravel' && (
        <FaLaravel className={blogStyles.categoryIconLaravel} />
      )}
      {category === 'PHP' && <FaPhp className={blogStyles.categoryIconPhp} />}
      {category === 'React' && (
        <FaReact className={blogStyles.categoryIconReact} />
      )}
      {category === 'TypeScript' && <SiTypescript />}
      {category === 'JavaScript' && (
        <SiJavascript className={blogStyles.categoryIconJavaScript} />
      )}
    </>
  )
}
