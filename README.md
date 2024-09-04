### Panduan Instalasi Frontend

1. **Clone Repository**

   ```bash
   git clone https://github.com/aqwamhm/employee-crud-react.git
   cd employee-crud-react
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di root folder dan tambahkan konfigurasi berikut:

   ```plaintext
   VITE_BASE_URL=<BASE_URL>
   ```

   Gantilah `<BASE_URL>` dengan URL API backend yang sesuai. Jangan lupa untuk menambahkan endpoint /api pada base url, contoh: `http://localhost:8000/api`

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
