// src/services/api.ts
import axios from 'axios';
import { MenuItem, Order, Reservation, Feedback } from '../interfaces';

const BASE_URL = 'http://localhost:8000/'; // Django backend URL

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const response = await axios.get(`${BASE_URL}/menu-items/`);
  return response.data;
};

export const placeOrder = async (order: Order) => {
  const response = await axios.post(`${BASE_URL}/orders/`, order);
  return response.data;
};

export const makeReservation = async (reservation: Reservation) => {
  const response = await axios.post(`${BASE_URL}/reservations/`, reservation);
  return response.data;
};

export const submitFeedback = async (feedback: Feedback) => {
  const response = await axios.post(`${BASE_URL}/feedback/`, feedback);
  return response.data;
};
