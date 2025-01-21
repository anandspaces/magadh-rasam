# Stage 1: Install dependencies and prepare the environment
FROM python:3.11-alpine AS build-stage

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apk update && apk add --no-cache \
    gcc \
    musl-dev \
    mariadb-dev \
    libffi-dev \
    libmagic \
    && pip install --upgrade pip setuptools wheel

WORKDIR /app

# Copy the requirements file and install Python dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Stage 2: Copy the backend application and run the app
FROM python:3.11-alpine

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies (needed to run the app)
RUN apk update && apk add --no-cache \
    libmagic \
    mariadb-dev

WORKDIR /app

# Copy installed dependencies from the build stage
COPY --from=build-stage /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages

# Copy the backend code into the container
COPY . ./

EXPOSE 8000
CMD ["sh", "-c", "python manage.py makemigrations && \
                  python manage.py migrate && \
                  python manage.py runserver 0.0.0.0:8000"]