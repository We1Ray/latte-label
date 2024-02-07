import styles from "./styles.module.css";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
      <div className={styles.loadingItem} />
    </div>
  );
}
