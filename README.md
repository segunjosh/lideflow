# Lideflow - Unified Payment Infrastructure

A modern, high-performance landing page for **Lideflow**, a financial infrastructure platform bridging cross-chain stablecoins with traditional payment systems.

![Lideflow Preview](/src/assets/logo.png)

## 🚀 Features

- **Interactive 3D Globe**: Visualizes global currency flows with real-time animations using `Three.js` and `@react-three/fiber`.
- **Modern UI/UX**: Glassmorphism aesthetic, sleek animations, and responsive design powered by `TailwindCSS` and `Framer Motion`.
- **Dynamic Components**:
  - **Bento Grid**: Feature highlights with hover interactions.
  - **Velocity Ticker**: Infinite scrolling brand partnerships.
  - **API Showcase**: Interactive code blocks demonstrating ease of integration.
  - **FAQ Accordion**: Clean, accessible Q&A section.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: TailwindCSS
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Icons**: Lucide React

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/segunjosh/lideflow.git
    cd lideflow
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🌍 Globe Component Details

The interactive globe component (`src/components/Globe/Globe.jsx`) features:
- **Real-time Rendering**: Built with `@react-three/fiber`.
- **Data Visualization**: Shows top financial nexuses (3 per continent) and animated transaction arcs.
- **Interactivity**: full mouse/touch control (rotate/zoom).
- **Custom Shaders/Materials**: Uses a specular earth map for accurate landmass representation.

## 📄 License

Private - Lideflow.
