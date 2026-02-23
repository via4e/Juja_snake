# Legend of Juja Snake

A classic Snake game built with JavaScript, jQuery, and Webpack. Guide the snake to eat food, grow longer, and survive as long as possible!

## About the Game

I started writing it in 2011. It hasn't changed much since then, I've just updated the tools and added some minor improvements.
Juja Snake is a retro-style game where you control a snake that moves around the game grid. The goal is to eat food, grow your snake, and avoid colliding with yourself.

## Game Controls

| Key | Action |
|-----|--------|
| `↑` (Up Arrow) | Move up |
| `↓` (Down Arrow) | Move down |
| `←` (Left Arrow) | Move left |
| `→` (Right Arrow) | Move right |
| `Space` | Pause / Resume |
| `Enter` | Restart game |
| `Esc` | Quit game |

**Note:** You cannot reverse direction directly (e.g., can't go left while moving right) to prevent self-collision.

## How to Start

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Development mode** (with hot reload):
   ```bash
   npm run dev
   ```
   Then open `http://localhost:8899` in your browser.

3. **Production build:**
   ```bash
   npm run build
   ```
   Built files will be in the `dist/` folder.

### Playing the Game

1. Open the game in your browser
2. **Click on the game area** or **press any arrow key** to activate sound
3. Use arrow keys to control the snake
4. Eat food to grow and score points
5. Complete levels by collecting all required food items

## Tech Stack

- **JavaScript** (ES6+)
- **jQuery** - DOM manipulation
- **Webpack 5** - Module bundler
- **SCSS** - Styling
- **Jest** - Testing framework
- **ESLint** - Code linting
