import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  //getting user data

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/doctor/getDoctorById",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //=============Booking func

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(res.data);
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error("Something error");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h3>Booking Page</h3>
      {doctors && (
        <div>
          <h4>
            Dr. {doctors.firstName} {doctors.lastName}
          </h4>
          <h4>Fees: ₹{doctors.feesPerConsultation}</h4>
          <h4>
            Timings: {doctors.timings && doctors.timings[0]} -{" "}
            {doctors.timings && doctors.timings[1]}{" "}
          </h4>
          <div className="d-flex flex-column w-50">
            <DatePicker
              className="m-2"
              format="DD-MM-YYYY"
              onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
            />
            <TimePicker
              format="HH:mm"
              onChange={(value) => setTime(moment(value).format("HH:mm"))}
            />
            <button className="btn btn-primary mt-2">Check Availability</button>
            <button className="btn btn-primary mt-2" onClick={handleBooking}>
              Book Now
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default BookingPage;
