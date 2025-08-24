# �� BelanjaKu - Modern E-commerce App

A modern, responsive e-commerce application built with React, TypeScript, and Tanstack Query.

## ✨ Features

- 🏠 **Homepage** with hero section, popular categories, and brand stores
- 📱 **Responsive Design** that works on all devices
- �� **Product Search** and filtering by categories and brands
- �� **Pagination** for smooth browsing experience
- ��️ **Product Details** with comprehensive information
- ⚡ **Fast Loading** with Tanstack Query caching
- �� **Modern UI** with clean and intuitive design

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **State Management**: Tanstack Query (React Query)
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **API**: FakeStore API

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prysciladinda/belanjaku-app.git
   cd BelanjaKu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure


jawaban dari pertanyaan essay:

1. a. Props dengan TypeScript

Props adalah cara untuk mengirim data dari parent component ke child component dalam React.
Dengan TypeScript, props bisa didefinisikan tipenya sehingga lebih aman dan terstruktur.
Biasanya menggunakan interface atau type untuk mendefinisikan struktur props.

Contoh sederhana:

type ButtonProps = {
  label: string;
  onClick?: () => void; // optional
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;

Kelebihan:
Editor memberikan autocomplete.
Bisa mencegah bug karena props salah tipe.
Lebih mudah maintenance pada project besar.

b. TanStack
TanStack adalah kumpulan library open-source untuk React (dan framework lain) yang fokus pada data management.
Produk populernya:
TanStack Query (React Query) → mengelola fetching, caching, synchronizing, dan updating data asynchronous dari API.
TanStack Table → membuat data grid atau tabel dengan performa tinggi dan sangat bisa dikustomisasi.
TanStack Router → routing modern untuk React dengan fokus pada type safety dan data-loading.
TanStack Virtual → rendering list/tabel panjang dengan teknik virtualization agar tetap ringan.

Value utamanya:
Mengurangi boilerplate (tidak perlu banyak useState/useEffect manual untuk API).
Optimized caching → data otomatis di-refresh bila stale.
Mendukung TypeScript penuh sehingga error lebih cepat terdeteksi.
Mudah diintegrasikan ke aplikasi skala kecil maupun besar.

