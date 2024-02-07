import React from "react";
import Select from "react-select";
import Image from "next/image";
import img1 from "../public/images/united-kingdom.svg";
import img2 from "../public/images/vn.svg";
import styles from "../styles/CustomSelect.module.css";

const options = [
  { value: "en", label: "English", image: img1 },
  { value: "vi", label: "Vietnamese", image: img2 },
  // Add more options as needed
];
const customStyles = {
    control: (provided:any) => ({
        ...provided,
        backgroundColor: '#0a1013',
        borderRadius: '4px',
        border: 'none',
        outline:'none',
        color: '#fff',
        cursor: 'pointer'
      }),
      option: (provided:any, state:{isSelected: boolean}) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#0a1013' : '#0a1013',
        color: state.isSelected ? '#fff' : '#fff',
        cursor: 'pointer'
      }),

}

const CustomSelect = ({ onChange }) => {
    const defaultOption = options.find((option) => option.value === 'en');
  return (
    <Select
    styles={customStyles}
      options={options}
      onChange={onChange}
      defaultValue={defaultOption}
      getOptionLabel={(option) => (
        <div className={styles.selectLangue}>
          <Image
            src={option.image}
            alt="picture"
            width={24}
            height={24}
          />
          {option.label}
        </div>
      )}
      getOptionValue={(option) => option.value}
    />
  );
};

export default CustomSelect;
