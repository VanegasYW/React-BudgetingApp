# Budgeting App

### 🖥 Setup 
- Remember to change the environment variables before running.
```
PORT="your port"
MONGO_CNN="your mongo db connection"
VITE_API_BASE_URL="your api base url" 
```
- Install all necessary dependencies
```
npm i
```
- Start the server
```
npm start
```

### 🌐 Endpoints (No Authentication Required)

The API provides the following endpoints:

| Method | Endpoint   | Description                     |
|:-------|:------------|:---------------------------------|
| `GET`  | `/expenses` | Get all expenses                 |
| `GET`  | `/expenses/:id` | Get an expense by ID          |
| `POST` | `/expenses` | Create a new expense             |
| `PUT`  | `/expenses/:id` | Update an expense by ID       |
| `DELETE` | `/expenses/:id` | Delete an expense by ID     |

### 🛠 [Stack Used](techstack.md)
