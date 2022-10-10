import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/AddressForm.module.css";

/**
 *
 * @returns JSX component that display the Address Form
 */
const AddressForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullnames: "",
      email: "",
      phone: "",
      address: "",
    },
  });
  console.log(process.env.API_URL);

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  };

  /**
   * Submit user data to the server and display feedback from the server
   * @param {object} data Data inputs from the user
   */
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/submit",
        data,
        config
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success(response.data.Message);
      } else if (response.status === 401) {
        toast.warning("You are not authorized to Post", {
          position: "bottom-right",
        });
      } else {
        toast.error(response.data.Message, {
          position: "bottom-right",
        });
      }
      reset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="name">Full Name</label>
      <input
        {...register("fullnames", { required: "Name is Required" })}
        type="text"
        name="fullnames"
      />
      <p>{errors.fullnames?.message}</p>
      <label htmlFor="name">Email</label>
      <input
        {...register("email", {
          required: "Email is Required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
            message: "Email is invalid",
          },
        })}
        type="email"
      />
      <p>{errors.email?.message}</p>
      <label htmlFor="phone">Phone</label>
      <input
        {...register("phone", {
          required: "Phone is Required",
          minLength: {
            value: 10,
            message: "Phone number is at least 10 characters",
          },
        })}
        type="phone"
        name="phone"
      />
      <p>{errors.phone?.message}</p>
      <label htmlFor="address">Address</label>
      <input
        {...register("address", { required: "Address is Required" })}
        type="text"
        name="address"
      />
      <p>{errors.address?.message}</p>
      <button type="submit" className={styles.btn}>
        submit
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddressForm;
