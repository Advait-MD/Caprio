# Caprio 🎬🍿

**Caprio** is an interactive movie recommendation engine that gamifies the process of finding your next watch. Instead of boring forms, users play a "Movie Battle" — choosing between pairs of movies to build a unique taste profile.

## ✨ Features
- **⚔️ Movie Battle**: A 5-round face-off between popular movies to determine your preferences.
- **🧠 Taste Engine**: Analyzes your winners to understand your favorite genres and styles.
- **🎯 Smart Recommendations**: Suggests movies you haven't seen based on your battle results.
- **💎 Rich Aesthetics**: A premium, dark-mode UI with glassmorphism and smooth animations.
- **🔄 Smart Controls**: "Already Watched" button instantly fetches a new suggestion.

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (CSS Variables, Flexbox/Grid).
- **Backend**: Node.js, Express.
- **API**: OMDb (Open Movie Database).

## 🚀 Getting Started

### Prerequisites
- Node.js installed.
- An OMDb API Key (Get one [here](http://www.omdbapi.com/apikey.aspx)).

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Advait-MD/caprio.git
    cd caprio
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` folder:
        ```env
        TMDB_API_KEY=your_omdb_key_here
        PORT=4000
        ```
    *   Start the server:
        ```bash
        node server.js
        ```

3.  **Setup Frontend**
    *   Open a new terminal.
    ```bash
    cd frontend
    npm install
    npm start
    ```

4.  **Enjoy!**
    Open your browser to the local URL (usually `http://localhost:5173`).

## 🔮 Future Improvements
- [ ] **Harvester Script**: Automate the Seed List expansion.
- [ ] **User Accounts**: Save taste profiles.
- [ ] **Streaming Links**: direct links to Netflix/Prime.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
