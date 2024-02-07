import * as React from "react";
import Avatar from "@mui/joy/Avatar";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Select, { SelectOption } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Image from "next/image";
import img1 from "../public/images/united-kingdom.svg";
import img2 from "../public/images/vn.svg";
import img3 from "../public/images/ru.png";
import img4 from "../public/images/de.png";
import img5 from "../public/images/fr.png";
import img6 from "../public/images/chin.png";
import img7 from "../public/images/jp.png";
import img10 from "../public/images/kr.png";
import img8 from "../public/images/in.png";
import img9 from "../public/images/sa.png";
import styles from "../styles/CustomSelect.module.css";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { i18n } from 'i18next';

const options = [
  { value: "en", label: "English", src: img1 },
  { value: "vi", label: "Vietnamese", src: img2 },
  { value: "ru", label: "Russian", src: img3 },
  { value: "de", label: "German", src: img4 },
  { value: "fr", label: "French", src: img5 },
  { value: "cn", label: "Chinese", src: img6 },
  { value: "jp", label: "Japanese", src: img7 },
  { value: "kr", label: "Korean", src: img10 },
  { value: "in", label: "Hindi", src: img8 },
  { value: "sa", label: "Arabic", src: img9 },
];

function renderValue(option: SelectOption<string> | null) {
  if (!option) {
    return null;
  }

  return (
    <React.Fragment>
      <ListItemDecorator>
        <Image
          size="sm"
          src={options.find((o) => o.value === option.value)?.src}
          alt="picture"
          width={24}
          height={24}
        />
      </ListItemDecorator>
      {option.label}
    </React.Fragment>
  );
}

export default function SelectCustomOption() {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const handleChangeLanguage = (e, value) => {
    const selectedLanguage = value;
    console.log(123,value);
    
    router.push(router.pathname, router.asPath, { locale: selectedLanguage });
    i18n.changeLanguage(selectedLanguage);
  };
  return (
    <Select
      defaultValue={i18n.language}
      onChange={(e, value) => handleChangeLanguage(e, value)}
      variant="solid"
      className={styles.selectLangue}
      indicator={<KeyboardArrowDown />}
      slotProps={{
        listbox: {
          sx: {
            "--ListItemDecorator-size": "44px",
          },
        },
      }}
      sx={{
        "--ListItemDecorator-size": "44px",
        minWidth: 145,
      }}
      renderValue={renderValue}
    >
      {options.map((option, index) => (
        <React.Fragment key={option.value}>
          {index !== 0 ? (
            <ListDivider role="none" inset="startContent" />
          ) : null}
          <Option value={option.value} label={option.label}>
            <ListItemDecorator>
              <Image src={option.src} alt="picture" width={24} height={24} />
            </ListItemDecorator>
            {option.label}
          </Option>
        </React.Fragment>
      ))}
    </Select>
  );
}
