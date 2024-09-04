### Panduan Instalasi Frontend

1. **Clone Repository**

   ```bash
   git clone <URL_REPOSITORY_FRONTEND>
   cd <NAMA_FOLDER_FRONTEND>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di root folder dan tambahkan konfigurasi berikut:

   ```plaintext
   REACT_APP_BASE_URL=<BASE_URL>
   ```

   Gantilah `<BASE_URL>` dengan URL API backend yang sesuai.

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
