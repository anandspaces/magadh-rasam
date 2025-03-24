# Magadh Rasam

A full-stack restaurant management application built using **React** (with **Vite**, **TypeScript**, and **Tailwind CSS**) for the frontend and **Django** with **MySQL** for the backend. The application provides features for managing the restaurant menu, taking customer orders, and managing reservations.

## Features

- **Menu Management:** Add, update, and delete menu items.
- **Order Management:** Process customer orders, including order status tracking.
- **Reservation System:** Customers can make, update, and cancel reservations.
- **Customer Feedback:** Collect and manage feedback from customers.
- **Authentication:** Secure login and authentication for restaurant staff.
  
## Technologies

### Frontend
- **React** (with **TypeScript**)
- **Vite** for fast development builds
- **Tailwind CSS** for styling

### Backend
- **Django** (Python web framework)
- **MySQL** for database management

### Optional
- **Docker** for containerization
<!-- - **Redis/RabbitMQ/Kafka** for message queueing (if applicable) -->

## Project Structure

```
/magadh-rasam
├── backend
│   ├── ...                 # Django project directory
│   ├── Dockerfile          # Dockerfile for backend container
│   ├── requirements.txt    # Python dependencies
│   └── .env                # Environment variables for the backend
├── frontend
│   ├── ...                 # React project directory
│   ├── Dockerfile          # Dockerfile for frontend container
│   └── .env                # Environment variables for the frontend
├── docker-compose.yml      # Docker Compose file to orchestrate frontend and backend
├── .gitignore              # Git ignore file
└── .dockerignore           # Docker ignore file
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anandspaces/magadh-rasam.git
   cd magadh-rasam
   ```

### Backend Installation

2. Install the required Python dependencies
   ```bash
   cd backend
   
   # Linux
   python3 -m venv venv
   source venv/bin/activate
   
   # Windows
   python -m venv venv
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional
   venv/Scripts/Activate.ps1

   pip install -r requirements.txt
   ```

3. Set up the database:
   ```bash
   python manage.py migrate
   ```

4. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Installation

2. Install the required Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

### Running with Docker

2. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application on:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`

## Environment Variables

### Backend
- `DB_NAME`: Database name (e.g., `restaurant_db`)
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_HOST`: Database host (e.g., `db` for docker container, `localhost` for running locally)
- `DB_PORT`: Database port

### Frontend
- `VITE_ENCRYPTION_KEY`: Generate this key using:
 ```bash
 node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 ```
- `VITE_OPENWEATHER_API_KEY`: Open Weather API Key

### Root
- `MYSQL_PORT`: Database Port
- `MYSQL_HOST`: Database Host
- `MYSQL_ROOT_HOST`= Database Root Host
- `MYSQL_DATABASE`= Database Name
- `MYSQL_PASSWORD`= Database Password
- `MYSQL_ROOT_PASSWORD`= Database Password

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and create a pull request. Be sure to follow the coding conventions and include tests for new features.
