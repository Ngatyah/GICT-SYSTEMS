import React, { useState } from "react";
import RegistrationForm from "./AddressForm";
import AddressList from "./AddressList";
import styles from "../styles/FormContainer.module.css";

const FormContainer = () => {
  const [tab, setTab] = useState(1);
  return (
    <div className={styles.formContainer}>
      <div className={styles.formTabs}>
        <button
          className={tab === 1 ? `${styles.addressForm}` : "btn1"}
          onClick={() => setTab(1)}
        >
          Form
        </button>
        <button
          className={tab === 2 && `${styles.addressForm}`}
          onClick={() => setTab(2)}
        >
          Address List
        </button>
      </div>
      {tab === 1 ? <RegistrationForm /> : <AddressList />}
    </div>
  );
};

export default FormContainer;
