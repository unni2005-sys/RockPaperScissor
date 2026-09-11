<img width="1280" height="640" alt="Unfair Advantage Lab" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Unfair Advantage Lab: Rock Paper Scissors

## Basic Details
### Team Name: [Add team name]

### Team Members
- Team Lead: [Add name] - [Add college]
- Member 2: [Optional]
- Member 3: [Optional]

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
[Add demo video link here]

*The demo should show a normal AI win, a generated explanation, the scoreboard update, and the occasional mercy win.*

#### Additional Demos
- Live project repository: https://github.com/unni2005-sys/RockPaperScissor
- Local demo URL: `http://localhost:3000`

## Team Contributions
- [Add name]: Game concept, cheating logic, scoreboard, and interface.
- [Add name]: Gemini integration and local fallback reasoning engine.
- [Add name]: Testing, documentation, and demo media.

---
Made with ❤️ at TinkerHub Useless Projects

![TinkerHub](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Useless Projects](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)