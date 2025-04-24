# Tariff Hero: 3-Hour Implementation Plan (Revised)

## Core Concept
Satirical game where player is economic dictator managing tariffs while balancing corruption.

## Minimal Features

1. **Interface (HTML/CSS)**
   * Single screen with 4 parts:
     * Stats bar (Economy, Public Opinion, Personal Wealth, Foreign Relations)
     * Trade representative panel showing current request
     * Tariff decision controls
     * Timer and bribe display

2. **Game Logic (JavaScript)**
   * Start values: Economy (50), Public Opinion (50), Personal Wealth (20), Foreign Relations (50)
   * Each tariff request includes:
     * Product category (Cheese, Electronics, Textiles)
     * Proposed tariff level (0-100%)
     * Bribe amount
     * 5-second timer for decision
   * Formulas:
     * Accept high tariffs → Economy -5, Public Opinion +2, Foreign Relations -3
     * Accept low tariffs → Economy +3, Public Opinion -2, Foreign Relations +2
     * Accept bribe → Personal Wealth +5, Public Opinion -3 if discovered (30% chance per turn)
     * Reject bribe → Personal Wealth -2, Public Opinion +1

3. **Trade Representative Interactions**
   * 20 unique trade representatives with distinct personalities
   * Each offers different bribes and tariff requests
   * Dialogue shows economic impact:
     * "Sir, implementing this 70% cheese tariff will destroy our trade relations with France, but the dairy lobby's contribution to your Swiss bank account is quite generous."
     * "Madame, this electronics tariff will raise consumer prices by 30%, but our domestic manufacturers promise generous campaign support."

4. **Game End**
   * Game over when any metric hits limit (0 or 100)
   * Show final score (turns survived, total wealth accumulated)
   * Display economic collapse scenario based on failing metric
   * One-click restart

## Implementation Plan

**Hour 1: Setup**
* Create HTML structure
* Style with minimal CSS
* Add metric displays and trading panel

**Hour 2: Game Logic**
* Implement core metrics and calculations
* Create trade representative request system
* Add bribe mechanic and timer

**Hour 3: Polish**
* Add game over scenarios
* Balance equations and difficulty curve
* Test and deploy

## Technical Stack
* Vanilla HTML/CSS/JavaScript
* No frameworks
* Host directly on GitHub Pages

## No Art Required
* Text-based interface
* Use emoji for visual feedback
* Basic CSS colors and shapes
