# Aprinx Madagascar Frontend

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

Aprinx Madagascar is a platform that connects **video course sellers** and **buyers**.  
It simplifies payments and makes online learning accessible to everyone in Madagascar.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone git@github.com:eric-fahendrena/aprinx.git

# Move into the project folder
cd aprinx

# Install dependencies
npm install

# Create a .env file based on .env.example and set the required variables
# Then start the development server
npm run dev
```

👉 Don’t forget to check out the [Aprinx API](https://github.com/eric-fahendrena/aprinx-api.git) 
repository to get the API base URL (VITE_API_URL).

## 📂 Project Structure

```bash
aprinx/
├── public/                # Static assets (aprinx.png, icon.png, vite.svg)
├── src/                   # Main source code
│   ├── assets/            # Images and static resources for React
│   ├── components/        # Reusable UI components (e.g., BuyersPaymentsPage.jsx, VideoDetailPage.jsx, etc.)
│   │   ├── commons/       # Common components (Navbar, Button, etc.)
│   │   ├── course/        # Course-related components
│   │   │   └── creator/   # Folder for course creators (empty or to be completed)
│   │   ├── payments/      # Payment-related components
│   │   ├── profile/       # User profile components
│   │   ├── searcher/      # Search components
│   │   ├── subscription/  # Subscription components
│   │   └── video/         # Video components
│   ├── contexts/          # React contexts (AuthContext, CourseContext, etc.)
│   ├── hooks/             # Custom React hooks (useLogin.js, useNotifications.js)
│   ├── services/          # Services (API, Auth, WebSocket)
│   ├── App.jsx            # Root component
│   ├── main.jsx           # Application entry point
│   └── ...                # Other files (App.css, index.css, etc.)
├── .env.example           # Environment variables template
├── index.html             # Main HTML file
├── package.json           # Project dependencies and metadata
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel configuration
└── README.md              # Project documentation

```

## 🤝 Contributing

Contributions are welcome!

If you’d like to improve this project:

1. Fork the repository
2. Create your feature branch (git checkout -b feature/my-feature)
3. Commit your changes (git commit -m "Add my feature")
4. Push to the branch (git push origin feature/my-feature)
5. Open a Pull Request

## 👨‍💻 Author
Jean Eric Razanapahendrena

📧 [ericfahendrena29@gmail.com](mailto:ericfahendrena29@gmail.com)

🌐 [https://eric-razanapahendrena.vercel.app](https://eric-razanapahendrena.vercel.app)

## 📜 License

This project is licensed under the [MIT License](./LICENSE).
