# Technical Specification: Tariff Hero

## Overview
Single-player satirical game where player acts as economic dictator managing tariffs while balancing corruption metrics.

## Core Game Elements

### Game Metrics
- Economy (0-100, starts at 50)
- Public Opinion (0-100, starts at 50)
- Personal Wealth (0-100, starts at 20)
- Foreign Relations (0-100, starts at 50)

### Product Categories
1. Cheese
2. Electronics
3. Textiles
4. Automobiles
5. Pharmaceuticals
6. Agriculture
7. Steel
8. Luxury goods
9. Timber
10. Energy

### Mechanics
- Trade representatives appear with tariff requests and optional bribes
- 5-second timer for decision (pauses between representatives)
- Player accepts or rejects tariffs and bribes
- Game ends when any metric hits 0 or 100

### Consequences
- High tariffs: Economy -5, Public Opinion +2, Foreign Relations -3
- Low tariffs: Economy +3, Public Opinion -2, Foreign Relations +2
- Accept bribe: Personal Wealth +5, Public Opinion -3 if discovered (30% chance)
- Reject bribe: Personal Wealth -2, Public Opinion +1
- Discovered bribes: Random additional effect on Economy (±0-5)

## Technical Implementation

### Structure
- Single HTML file with embedded CSS/JavaScript
- No persistence between sessions
- No frameworks, vanilla JS only
- GitHub Pages deployment

### UI Components
- Stats bar displaying four metrics
- Trade representative panel with request and dialogue
- Decision controls (accept/reject tariff, accept/reject bribe)
- Timer display

### Game Logic
- 20 fixed trade representatives with distinct personalities
- Representatives cycle through with varying requests
- Consequence formulas applied after each decision
- Random checks for bribe discovery

### Polish Elements
- Game over screens based on failing metric
- Score calculation (turns survived, wealth accumulated)
- One-click restart functionality
- Text-based with emoji for visual feedback

No audio, art assets, or difficulty levels required.
