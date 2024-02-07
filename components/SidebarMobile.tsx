import { useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../public/images/logopc.png";
import close from "../public/images/Close.png";
import SelectLangues from "./SelectLangues";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { t } = useTranslation("common");
  useEffect(() => {}, [isOpen, toggleSidebar]);
  const router = useRouter();
  const handleLinkClick = () => {
    toggleSidebar();
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarContainer}>
        <div className={styles.sidebar_btn}>
          <Link href="/">
            <Image
              onClick={handleLinkClick}
              src={logo}
              alt="picture"
              layout="fixed"
            />
          </Link>
          <div>
            <Image
              className={styles.toggleButton}
              src={close}
              alt="picture"
              layout="fixed"
              onClick={toggleSidebar}
            />
          </div>
        </div>
        <ul className={styles.sidebarUl}>
          <li className={styles.sidebarli}>
            <Link
              onClick={handleLinkClick}
              className={router.pathname === "/" ? styles.activeTab : styles.sidebara}
              href="/"
            >
              {t("home")}
            </Link>
          </li>
          <li className={styles.sidebarli}>
            <Link
              onClick={handleLinkClick}
              className={ router.pathname === "/history" ? styles.activeTab : styles.sidebara}
              href="/history"
            >
             {t("history")}
            </Link>
          </li>
          <li className={styles.sidebarli}>
            <div className={styles.sidebara}>Language</div>
            <div className={styles.sidebaraLang}>
              <SelectLangues />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default Sidebar;
