### Backend Setup
Before running the frontend application, ensure that the backend is properly set up. Follow the instructions in the [backend repository](https://github.com/aqwamhm/employee-crud-backend) to clone, configure, and run the backend server.

### Frontend Installation Guide

1. **Clone the Repository**

   ```bash
   git clone https://github.com/aqwamhm/employee-crud-react.git
   cd employee-crud-react
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root folder and add the following configuration:

   ```plaintext
   VITE_BASE_URL=<BASE_URL>
   ```

   Replace `<BASE_URL>` with the appropriate backend API URL. Don't forget to include the /api endpoint in the base URL, for example: `http://localhost:8000/api`

4. **Run the Application**
   ```bash
   npm run dev
   ```
