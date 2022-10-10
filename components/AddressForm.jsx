import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/AddressForm.module.css";

/**
 *
 * @returns JSX component that display the Address Form
 */
const AddressForm = () => {
  const [loading, setLoading] = useState(false);
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

  const config = {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
  };

  /**
   * Submit user data to the server and display feedback from the server
   * @param {object} data Data inputs from the user
   */
  const submitHandler = async (data) => {
    console.log("Clicked");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/submit",
        data,
        config
      );
      console.log(response.status);
      console.log("coleld");
      if (response.status === 200) {
        toast.success(response.data.Message);
        setLoading(false);
      } else if (response.status === 401) {
        setLoading(false);
        toast.warning("You are not authorized to Post", {
          position: "bottom-right",
        });
      } else {
        console.log(Error);
        setLoading(false);
        toast.error(response.data.Message);
      }
      reset();
    } catch (error) {
      setLoading(false);
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
        {loading ? (
          <Oval
            height={25}
            width={25}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#ffffff"
            strokeWidth={2}
            strokeWidthSecondary={4}
          />
        ) : (
          "submit"
        )}
      </button>
      <ToastContainer />
    </form>
  );
};

export default AddressForm;
