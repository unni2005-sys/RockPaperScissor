<img width="1280" height="640" alt="Unfair Advantage Lab" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Unfair Advantage Lab: Rock Paper Scissors

## Basic Details
### Team Name: E-Go

### Team Members
- Team Lead: Unnikrishnan M - ASIET
- Member 2: Faseena Sherin C - ASIET

### Project Description
An intentionally rigged Rock Paper Scissors game where the AI watches the player's move and chooses the counter that beats it. It then invents a confident, ridiculous explanation for why the win was completely logical.

### The Problem (that doesn't exist)
People keep expecting games to be fair, transparent, and statistically reasonable.

### The Solution (that nobody asked for)
The AI cheats through suspiciously perfect counter-picks, occasionally lets the player win to preserve plausible deniability, and tracks the evidence on a scoreboard.

## Technical Details
### Technologies/Components Used
For Software:
- HTML, CSS, and JavaScript
- Node.js built-in HTTP server
- Gemini API for generated reasoning
- Local fallback reasoning engine when the API is unavailable
- Git and GitHub

### Implementation
For Software:

```bash
npm install
npm.cmd start
```

Open `http://localhost:3000` in a browser.

Create a local `.env` file for Gemini reasoning:

```env
GEMINI_API_KEY=your_gemini_key_here
GEMINI_MODEL=gemini-3.6-flash
PORT=3000
```

The `.env` file is ignored by Git and must never be committed.

### Deployment

GitHub Pages hosts the game interface, but it cannot run the Node.js API server. To enable Gemini reasoning online:

1. Create a free Render web service from this repository using the included `render.yaml`.
2. Add `GEMINI_API_KEY` in the Render service environment variables.
3. Copy the deployed Render URL and set this line near the top of the game script in `index.html`:

```js
window.REASONING_API_URL = 'https://your-render-service.onrender.com/api/reason';
```

4. Commit and push `index.html` again. GitHub Pages will then call the Render API, while the key remains on the server.

Without a deployed API URL, the GitHub Pages version still works using its local fallback reasoning.

### Project Documentation
For Software:

#### Screenshots
![Game screen](screenshots/game-screen.png)
*The main game screen with the suspicious scoreboard and move buttons.*

![AI reasoning](screenshots/ai-reasoning.png)
*A generated explanation for the AI's suspicious win.*

![Mobile layout](screenshots/mobile-layout.png)
*The responsive layout on a mobile viewport.*

#### Workflow
```mermaid
flowchart LR
	A[Player chooses move] --> B{Mercy roll: 1 in 8?}
	B -- Yes --> C[AI loses on purpose]
	B -- No --> D[AI chooses the move that beats the player]
	C --> E[Scoreboard updates]
	D --> E
	E --> F[Gemini generates fake reasoning]
	F --> G[Show explanation]
	F -. API unavailable .-> H[Use local reasoning templates]
	H --> G
```
*The AI cheats first, then constructs a suspicious explanation for the result.*

### Project Demo
#### Video
[Watch the screen recording](screenshots/Recording.mp4)

*The demo should show a normal AI win, a generated explanation, the scoreboard update, and the occasional mercy win.*

#### Additional Demos
- Live project repository: https://github.com/unni2005-sys/RockPaperScissor
- Local demo URL: `http://localhost:3000`

## Team Contributions
- Unnikrishnan M: Game concept, cheating logic, scoreboard, and interface.
- Faseena Sherin C: Gemini integration, local fallback reasoning engine, testing, and documentation.

---
Made with ❤️ at TinkerHub Useless Projects

![TinkerHub](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Useless Projects](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)