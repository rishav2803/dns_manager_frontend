import styles from "./Card.module.css"


export default function Card({desc}){
  return(
    <p className={styles.c}>{desc}</p>
  )
}
