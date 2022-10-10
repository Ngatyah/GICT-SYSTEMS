import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import styles from "../styles/AddressList.module.css";

const AddressList = () => {
  const [edit, setEdit] = useState(true);
  const [data, setData] = useState([]);
  const [age, setAge] = useState(0);
  const [message, setMessage] = useState("");
  const [enableEdit, setEnableEdit] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  };

  const fetchData = async () => {
    console.log("Get Data ", process.env);
    const response = await fetch("http://localhost:3000/api/list/", {
      method: "GET",
      config,
    });
    const resData = await response.json();
    setData((_) => resData);
  };

  const onChangeHandler = (value, name) => {
    if (name === "age") {
      setAge(value);
    } else {
      setMessage(value);
    }
  };

  const editHandler = (id, type) => {
    console.log(enableEdit);
    let tempAge = data[id].Age;
    let tempMessage = data[id].Message;
    console.log(tempMessage);
    let editedData = data.map((item) => {
      if (item.ID === id && type === "edit") {
        setAge(item.Age);
        setMessage(item.Message);
        setEnableEdit(true);
        return { ...item, isEditable: true };
      } else if (item.ID === id && type === "cancel") {
        setAge(tempAge);
        setMessage(tempMessage);
        setEnableEdit(false);
        console.log("cancel AGe", age);

        return { ...item, isEditable: false };
      } else if (item.ID === id && type === "update") {
        setEnableEdit(false);
        return {
          ID: id,
          Message: message,
          Age: age,
          isEditable: false,
        };
      } else {
        return item;
      }
    });
    setData(editedData);
    setEdit(!edit);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th>Id</th>
            <th>Name</th>
            <th className={styles.age}>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className={styles.bodyRow}>
          {data.map((row) => (
            <tr className={styles.singleRow} key={`${row.ID}${row.Message}`}>
              <td className={styles.singleCell}>{row.ID}</td>
              <td className={styles.singleCell}>
                <input
                  id={row?.isEditable && `${styles.activeInput}`}
                  onChange={(e) =>
                    onChangeHandler(e.target.value, e.target.name)
                  }
                  name="message"
                  type="text"
                  defaultValue={row.Message}
                  disabled={!row?.isEditable}
                />
              </td>
              <td className={styles.singleCell}>
                <input
                  id={row?.isEditable && `${styles.activeInput}`}
                  onChange={(e) =>
                    onChangeHandler(e.target.value, e.target.name)
                  }
                  name="age"
                  type="text"
                  defaultValue={row.Age}
                  disabled={!row?.isEditable}
                />
              </td>
              {!row?.isEditable ? (
                <td
                  onClick={() => editHandler(row.ID, "edit")}
                  className={styles.singleCell}
                >
                  <MdOutlineEdit /> Edit
                </td>
              ) : (
                <td className={styles.actionBtn}>
                  <button
                    onClick={() => editHandler(row.ID, "update")}
                    className={styles.okBtn}
                  >
                    ok
                  </button>
                  <button
                    onClick={() => editHandler(row.ID, "cancel")}
                    className={styles.cancelBtn}
                  >
                    cancel
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddressList;
