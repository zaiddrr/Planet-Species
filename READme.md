# Planet Species (Endangered Species Tracker)

A full-stack MERN application designed to raise awareness for endangered species. This project features real-time news aggregation, a custom events management system, and interactive educational tools.

> **Note:** This repository highlights my **individual contributions** to the "Planet Species" group project. It isolates the specific modules (Events, Newsletter, Contact) developed independently to demonstrate personal technical contributions.

![Project Screenshot](frontpage.png)

## 💻 Local Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/planet-species.git](https://github.com/yourusername/planet-species.git)
    ```

2.  **Install Dependencies**
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
    ```

3.  **Environment Variables**
    Create a `.env` file in the `backend` folder:
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    NEWS_API_KEY=your_news_api_key
    ```

4.  **Run the Application**
    * **Backend:** `cd backend && npm start`
    * **Frontend:** `cd frontend && npm start`