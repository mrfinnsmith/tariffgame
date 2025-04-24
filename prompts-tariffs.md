# Tariff Hero Implementation Prompts

## Prompt 1: HTML Structure

Create the HTML structure for a satirical game called "Tariff Hero" where the player is an economic dictator managing tariffs while balancing corruption. The game should have a single screen with 4 main parts:

1. Stats bar showing Economy (50/100), Public Opinion (50/100), Personal Wealth (20/100), and Foreign Relations (50/100)
2. Trade representative panel showing the current request
3. Tariff decision controls (accept/reject tariff, accept/reject bribe)
4. Timer and bribe display

Use only vanilla HTML and include appropriate IDs/classes for styling and JavaScript interaction. The game should have a minimalist text-based interface using basic shapes and emoji for visual feedback. No external assets are required.

## Prompt 2: CSS Styling

Create the CSS styles for the Tariff Hero game. The interface should be clean and functional with:

1. Clear visual distinction between the game's 4 components
2. Visual representations of metrics (bars or numbers)
3. Styled buttons for player decisions
4. Timer visualization
5. Basic color scheme to represent positive/negative status

Use only vanilla CSS with no frameworks. Aim for a government/bureaucratic aesthetic that's satirical in nature. Include responsive elements to ensure the game works on different screen sizes.

## Prompt 3: Game Logic JavaScript

Implement the core JavaScript logic for Tariff Hero with these features:

1. Game state management for all metrics:
   - Economy (0-100, starts at 50)
   - Public Opinion (0-100, starts at 50)
   - Personal Wealth (0-100, starts at 20)
   - Foreign Relations (0-100, starts at 50)

2. Trade request generation system with:
   - Product categories: Cheese, Electronics, Textiles, Automobiles, Pharmaceuticals, Agriculture, Steel, Luxury goods, Timber, Energy
   - Proposed tariff levels (0-100%)
   - Bribe amounts
   - 5-second timer for decisions

3. Consequence calculations:
   - High tariffs: Economy -5, Public Opinion +2, Foreign Relations -3
   - Low tariffs: Economy +3, Public Opinion -2, Foreign Relations +2
   - Accept bribe: Personal Wealth +5, Public Opinion -3 if discovered (30% chance)
   - Reject bribe: Personal Wealth -2, Public Opinion +1

4. Game over conditions when any metric hits 0 or 100

Use vanilla JavaScript only, with no external libraries.

## Prompt 4: Trade Representatives System

Create a system of 20 unique trade representatives for Tariff Hero. Each representative should have:

1. A unique name and personality
2. Specific dialogue patterns that explain economic impacts
3. Tendencies toward certain product categories
4. Varying bribe amounts and tariff request levels

Important: ALL dialogue MUST start with "Sir," and should be obsequious in tone, constantly flattering and sucking up to the player as the economic dictator. Representatives should praise the player's intelligence, vision, and leadership regardless of the actual impact of decisions.

Implementation should include:
- Representative selection/cycling mechanism
- Dialogue generation system
- Visual representation in the game
- Different representative personalities affecting game metrics

Examples of dialogue:
- "Sir, implementing this 70% cheese tariff is truly a stroke of genius that only someone of your unparalleled economic wisdom could conceive, though it may technically destroy our trade relations with France. The dairy lobby is honored to contribute to your Swiss bank account in recognition of your brilliance."
- "Sir, this electronics tariff is the most innovative policy I've ever witnessed in my career. Your foresight is remarkable, though some might fail to appreciate how it will raise consumer prices by 30%. Our domestic manufacturers are in awe of your leadership and humbly offer campaign support."

## Prompt 5: Game Over Scenarios

Implement game over scenarios for Tariff Hero that trigger when any metric hits its limit (0 or 100). Include:

1. End game screen showing:
   - Final score (turns survived, total wealth accumulated)
   - Economic collapse scenario based on failing metric
   - One-click restart button

2. Different narrative endings based on which metric failed:
   - Economy (0): "Your nation has collapsed into economic ruin..."
   - Economy (100): "Your economic policies have created an unsustainable bubble..."
   - Public Opinion (0): "The people have revolted against your tyrannical rule..."
   - Public Opinion (100): "Your populist policies have led to unrealistic expectations..."
   - Personal Wealth (0): "Without funds to maintain your lifestyle or bribe officials..."
   - Personal Wealth (100): "Your obscene wealth has drawn international scrutiny..."
   - Foreign Relations (0): "International sanctions have isolated your country..."
   - Foreign Relations (100): "Your spineless foreign policy has made you a puppet state..."

## Prompt 6: Game Integration and Testing

Integrate all components of Tariff Hero and ensure they work together seamlessly:

1. Connect UI elements to game state
2. Implement the game loop with appropriate timing
3. Test all game mechanics for balance and functionality:
   - Verify metric changes match specifications
   - Ensure timers work correctly
   - Test game over conditions
   - Check restart functionality

4. Add final polish:
   - Ensure text readability and UI clarity
   - Balance gameplay for optimal difficulty curve
   - Ensure responsive design works on different devices
   - Test for any bugs or edge cases

The final product should be a complete, playable game using vanilla HTML/CSS/JavaScript that can be deployed directly to GitHub Pages.