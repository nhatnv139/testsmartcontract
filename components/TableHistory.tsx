import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import styles from "../styles/CustomSelect.module.css";
const dayjs = require("dayjs");
import Image from "next/image";
import img3 from "../public/images/time-left.svg";
import img4 from "../public/images/Check.png";
import Pagination from "../components/Pagination";
import { ethers } from "ethers";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DataTableMUI = () => {
  const { t } = useTranslation("common");
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [wallet, setWallet] = useState(
    "0xb5422fbf3fe4a144838f13dd0100c32a6497c222"
  );
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://premium-staging.athene.network/api/history?wallet=${wallet}&pageSize=${pageSize}&page=${page}`
        );

        setData(response.data.data.histories);
        console.log(response, 2222);
        console.log(data, 333);

        setTotalRows(response.data.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page, pageSize, wallet]);

  const columns = [
    { id: "index", label: "Stt" },
    { id: "userWallet", label: "Wallet Address" },
    { id: "packageId", label: "Package Id" },
    { id: "email", label: "Account Athene" },
    { id: "txHash", label: "Transaction Hash" },
    { id: "isCalledHook", label: "Upgrade Status" },
    { id: "createdAt", label: "Time" },
  ];
  const formattedDate = dayjs().format("HH:mm:ss DD/MM/YY");

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
  };

  return (
    <div className={styles.table_history_container}>
      <div className={styles.table_history_contanr}>
        <table className={styles.table_history} aria-label="sticky table">
          <thead>
            <tr className={styles.table_history_tr}>
              <th className={styles.table_history_col1}>{t("stt")}</th>
              <th className={styles.table_history_col2}>{t("wallet_address")}</th>
              <th className={styles.table_history_col3}>{t("package_id")}</th>
              <th className={styles.table_history_col4}>{t("account_athene")}</th>
              <th className={styles.table_history_col5}>{t("hash")}</th>
              <th className={styles.table_history_col6}>{t("status")}</th>
              <th className={styles.table_history_col7}>{t("time")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr className={styles.table_history_tbody} key={row.index}>
                <th className={styles.table_history_tbody_col1}>{1}</th>
                <th className={styles.table_history_tbody_col2}>
                  <div className={styles.table_history_tbody_col2_child}>
                    {row.userWallet}
                  </div>
                </th>
                <th className={styles.table_history_tbody_col3}>
                  <div>{row.packageId == 2 ? "Premium" : "Regular"}</div>
                </th>
                <th className={styles.table_history_tbody_col4}>{row.email}</th>
                <th className={styles.table_history_tbody_col5}>
                  <div className={styles.table_history_tbody_col5_child}>
                    <a
                      target="_blank"
                      href={`https://bscscan.com/tx/${row.txHash}`}
                    >
                      {row.txHash}
                    </a>
                  </div>
                </th>
                <th className={styles.table_history_tbody_col6}>
                  <div className={styles.table_history_tbody_col6_child}>
                    {row.isCalledHook ? (
                      <Image
                        width={24}
                        height={24}
                        className={styles.table_history_tbody_col6_check}
                        src={img4}
                        alt="picture"
                        layout="fixed"
                      />
                    ) : (
                      <Image
                        width={24}
                        height={24}
                        className={styles.table_history_tbody_col6_false}
                        src={img3}
                        alt="picture"
                        layout="fixed"
                      />
                    )}
                  </div>
                </th>
                <th className={styles.table_history_tbody_col7}>
                  <div className={styles.table_history_tbody_col7_child}>
                    {dayjs(row.createdAt).format("HH:mm:ss DD/MM/YY")}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.table_pagination}>
          <Pagination />
        </div>
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
export default DataTableMUI;
