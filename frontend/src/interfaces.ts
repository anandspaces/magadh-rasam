// src/interfaces.ts

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  export interface Order {
    id?: number;
    customer_name: string;
    items: number[]; // Array of MenuItem IDs
    total_price: number;
  }
  
  export interface Reservation {
    id?: number;
    customer_name: string;
    table: number;
    date: string;
  }
  
  export interface Feedback {
    id?: number;
    customer_name: string;
    comments: string;
    rating: number;
  }
  
  export interface Table {
    id: number;
    number: number;
    capacity: number;
  }
  