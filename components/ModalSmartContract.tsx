import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useEffect, useState,useCallBack } from "react";
import { ethers } from "ethers";
import buyAbi from "../config/smartcontract/buyAbi.json";
import tokenAbi from "../config/smartcontract/tokenAbi.json";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styles from "../styles/ModalSmartContract.module.css";
import { useTranslation } from "next-i18next";

export default function BasicModal({
  isOpen,
  onCloseModal,
  propsEmail,
  emitCloseModal,
  // emitCloseModalComfirm
}) {
  const buyContractAddress = "0x8CA19c8B4cB13eC323A1E64A9c1455762255e705";
  const tokenContractAddress = "0x68Ea978Fe22BaBa155De4E3E61Be9e07583a682E";
  const buyContractAbi = buyAbi;
  const tokenContractAbi = tokenAbi;
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [buyPrice, setBuyPrice] = useState([]);
  const [allowancePrice, setAlowancePrice] = useState([]);
  const [buyContract, setBuyContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [isComfirm, setIsComfirm] = useState(false);
  const [packageId, setPackageId] = useState(1);
  const { t } = useTranslation("common");

  useEffect(() => {
    const initEthers = async () => {
      try {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);
        await window.ethereum.enable();
        const signer = await ethProvider.getSigner();
        const signerAddress = await signer.getAddress();
        setSigner(signerAddress);

        const ethSignerBuyContract = new ethers.Contract(
          buyContractAddress,
          buyContractAbi,
          ethProvider
        ).connect(ethProvider.getSigner());
        setBuyContract(ethSignerBuyContract);
        const getpackagePrices = await ethSignerBuyContract.packagePrices(
          packageId
        );

        const decimals = await ethSignerBuyContract.getDecimals();
        setBuyPrice(
          parseInt(getpackagePrices?._hex, 16) *
            Math.pow(10, parseInt(decimals?._hex, 16))
        );
        console.log("buyContract", buyContract,buyPrice);
        const ethSignerTokenContract = new ethers.Contract(
          tokenContractAddress,
          tokenContractAbi,
          ethProvider
        ).connect(ethProvider.getSigner());
        setTokenContract(ethSignerTokenContract);
        console.log(ethSignerTokenContract);

        const contractOwner = await ethSignerBuyContract.owner();
        setOwner(contractOwner);
      } catch (error) {
        console.error("Lỗi kết nối Ethers:", error.message);
      }
    };

    initEthers();
  }, []);
  function extractCode(inputString) {
    const regex = /code=([A-Z_]+)/;
    const allowanceRegex = /reading 'allowance'/i;
    const match = inputString.match(regex);
    const allowanceMatch = inputString.match(allowanceRegex);
    if (match && match[1]) {
      return match[1];
    } else if (allowanceMatch) {
      return "allowance";
    } else {
      return null;
    }
  }

  const handelBuyPackage = useCallBack(async (e) => {
    try {
      let allowance = await tokenContract.allowance(
        signer,
        tokenContractAddress
      );
      const localAllowancePrice = allowance?._hex
      setAlowancePrice(localAllowancePrice);
      console.log(1, buyPrice);
      console.log(2, localAllowancePrice);
      console.log(2, new BigNumber(localAllowancePrice));
      if (buyPrice <= localAllowancePrice) {
        await buyContract.buyPremium(packageId, propsEmail);
        allowance = await tokenContract.allowance(signer, tokenContractAddress);
        setAlowancePrice([]);
        emitCloseModal();
        setIsComfirm(false);
        toast.success(t("upgrade_success"));
      } else {
          await tokenContract.approve(buyContractAddress, buyPrice.toString());
          console.log(9999, localAllowancePrice);
         
          await new Promise((resolve) => setTimeout(resolve, 1000));
          allowance = await tokenContract.allowance(
            signer,
            tokenContractAddress
          );
          setAlowancePrice(localAllowancePrice);
          setIsComfirm(true);
        }
      
    } catch (error) {
      console.log(error.message);
      console.log(1, typeof error.message);
      console.error("Lỗi kiểm tra allowance:", error.message);
      const codeValue = extractCode(error.message);
      if (
        codeValue === "ACTION_REJECTED" ||
        codeValue === "UNPREDICTABLE_GAS_LIMIT"
      ) {
        setAlowancePrice([]);
        toast.error(t("declines_transaction"));
        emitCloseModal();
        return;
      }
      if (codeValue === "allowance") {
        toast.error(t("error_network"));
        setAlowancePrice([]);
        emitCloseModal();
        return;
      } else {
        setTimeout(async () => {
          await handelBuyPackage();
        }, 5000);
      }

      return false;
    }
  },[]);
  const handelCancelPackage = () => {
    emitCloseModal();
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isOpen}
        onClose={onCloseModal}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 900,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
            backgroundColor: "#131D20",
            border: "none",
            color: "white",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            id="modal-desc"
            textColor="text.tertiary"
            sx={{
              maxWidth: 500,
              maxHeight: 400,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
              backgroundColor: "#131D20",
              border: "none",
              color: "white",
              padding: "60px",
              fontSize: "32px",
              colorAdjust: "white",
              textAlign: "center",
            }}
          >
            {t("popup_information")}
          </Typography>
          {/* {isComfirm && <p className="text-[red]">Are you sure to comfirm</p>} */}
          <div className={styles.action_popup}>
            <button
              className={styles.action_btn_cancel}
              onClick={handelCancelPackage}
            >
              {t("cancel")}
            </button>
            <button
              className={styles.action_btn_confirm}
              onClick={handelBuyPackage}
            >
              {t("btn_confirm")}
            </button>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
