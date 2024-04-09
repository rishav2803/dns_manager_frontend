import styles from "./Logo.module.css"
export default function Logo(){
  return(
    <div className={styles.logo_container}>
      <span className={styles.first}></span>
      <span></span>
      <span className={styles.third}></span>
    </div>
  );
}

