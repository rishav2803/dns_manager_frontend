import styles from "./Landing.module.css";
import {Link} from "react-router-dom";
import img1 from "../assets/Screenshot (858).png"

export default function Landing() {
  return(
    <div className={styles.container}>
      <header className={styles.nav}>
        <nav className={styles.nav_container}>
          {/* <div className={styles.logo}> */}
          {/*   <Logo/> */}
          {/* </div> */}
          <ul className={styles.nav_list}>
            <li className={styles.nav_list_item}><Link>Features</Link></li>
            <li className={styles.nav_list_item}><Link to={"/login"}>Login</Link></li>
            <li className={styles.nav_list_item}><Link to={"/register"}>SignUp</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className={styles.hero}>
          <div className={styles.hero_content}>
            <div className={styles.cont}>
              <h1>Domain<span>Ops</span></h1>
              <h3>Effortlessly <span>manage your domains,</span></h3>
              <h3>Stay <span>organized and informed,</span></h3>
              <h3>Empower your <span>online presence.</span></h3><br/><br/>
              <Link to="/register" className={styles.btn}>Get Started</Link>
            </div>
          </div>
          <div className={styles.img_container}>
            <img src={img1} className={styles.img}/>
          </div>
        </section>
        <div className={styles.divider}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className={styles.fill}></path>
          </svg>
        </div>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
