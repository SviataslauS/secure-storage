# Secure Storage Application

This is a simple Koa application for securely storing and retrieving data using a PostgreSQL database. It includes Docker Compose files to set up the application and database easily.

## Prerequisites

Before running the application, ensure you have the following prerequisites installed on your system:

- Node.js (version 18 and above)
- [Docker](https://docs.docker.com/get-docker/): Install Docker to run containers.

## Getting Started

### Starting the Database using Docker Compose

To run the database for this application locally, you can use Docker Compose with the provided `docker-compose-db.yml` file.

#### Starting the Database

Follow these steps to start the database using Docker Compose:

1. **Navigate to the Project Directory:**

   Open your terminal and navigate to the root directory of your project where the `docker-compose-db.yml` file is located.

2. **Start the Database Containers:**

   Run the following command to start the database containers defined in the `docker-compose-db.yml` file:

   ```bash
   docker-compose -f docker-compose-db.yml up -d

### Starting the application

Follow these steps to get the application up and running locally.

1. Install project dependencies:

   ```bash
   npm install
   ```

1. Configure Environment Variables:
Create a `.env` file based on `.env.test` file in the root directory of the project and set the environment variables according to your configuration.

1. Start the Application:
Run the Node.js application:

   ```bash
   npm run dev
   ```

### Endpoints

> **_NOTE:_** App endpoints have key as a parameter. The key length is dependent on the algorithm. In this case we use aes-128-cbc, so passed key length should be 16 bytes (128 bits).

## Store Data

- Endpoint: POST /store
- Request Body:

```js:
{
  "id": "your_unique_id",
  "encryptionKey": "your_encryption_key",
  "value": "your_data_value"
}

```

## Retrieve Data

- Endpoint: POST /retrieve
- Request Body:

```js:
{
  "id": "your_unique_id",
  "decryptionKey": "your_encryption_key"
}

```

### Testing

_TBD_