import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

export default function Index() {
  console.log('index')
  return (
    <>
      <Header titlePre="Hinako Blog" />
      <h1 className={sharedStyles.titleProfile}>My Profile</h1>
      <div className={sharedStyles.profile}>
        <div className={sharedStyles.profileImg}>
          <img src="/hinako.jpg" alt="" />
        </div>
        {/* ここにSNSアイコンいれる */}
        {/* <FaGithub />
        <FaTwitter /> */}
        <div className={sharedStyles.profileText}>
          <h3 className={sharedStyles.profileName}>Hinako</h3>
          <p>・　プログラミング好き関西在住の24歳</p>
          <p>・　Webエンジニア1年生</p>
          <p>・　学習強化中：Laravel, React, Next.js, TypeScript</p>
          <p>・　好き：ゴルフ、スノボ、少年マンガ、食べること</p>
          <p>・　学んだことの備忘録など自由に書いていこうと思います。</p>
        </div>
      </div>
      <div className={sharedStyles.career}>
        <h1 className={sharedStyles.titleCareer}>Career</h1>
        <p>・　2019年4月 金融系企業に入社</p>
        <p>
          加盟店（法人顧客・個人事業主）からの問い合わせ対応、
          問い合わせ対応のWeb化推進に従事
        </p>
        <br />
        <p>
          ・　2021年11月 サーバーサイドエンジニアとしてWeb系自社開発企業に入社
        </p>
        <p>業務ではLaravel, React, Next.js, TypeScriptを主に使用中。</p>
        {/* <p>
          直近の目標は、担当中のプロダクトのことなら何でも聞いてください！といえる状態になることです。
        </p> */}
      </div>
    </>
  )
}
