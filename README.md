# Rock Scissors Paper Game - Bombay

Welcome to the Bombay game repository! Bombay is a ReactJS-based Rock Scissors Paper game where you can enjoy the classic gameplay with a twist. The game rules can be easily customized through the `specifications.ts` file, allowing you to add new features such as the commented-out "superHand."

## Game Features

- **Initial Balance:** Players start with an initial balance of 5000.
- **Bet Step:** The betting step is set at 500.
- **Position Multipliers:** Different multipliers for each position (1 position - 14, 2 positions - 3).
- **Results:** Three possible results - win, lose, tie.
- **Game States:** Three game states - placeBet, game, result.
- **Positions:** Classic positions - rock, paper, scissors.
- **Position Result Colors:** Colors for result display - win (green), lose (red), tie (brown).
- **Position Items:** Each position has a designated color (rock - blue, paper - green, scissors - red).
- **Maximum Positions:** The game supports up to two positions by default.
- **Win Map:** Defines winning combinations for each position.
- **Computer Position Choices:** The computer can choose from available positions.
- **Tie:** A tie with two or more selected positions is considered a loss. If only one position is selected, the bet is returned to the balance.

## Game Deployment

The game is already deployed and accessible at [Bombay Game](https://oabanin.github.io/bombay).

## Getting Started

To run the game locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/oabanin/bombay.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:5173/bombay](http://localhost:5173/bombay) to play the game.

## Customizing Game Rules

Adjust the game rules by modifying the `src/constants/specifications.ts` file. You can uncomment the "superHand" or make other changes to enhance your gaming experience.

## Available Scripts

- **dev:** Run the development server with linting for styles.
- **build:** Build the game for production.
- **preview:** Preview the production build locally.
- **predeploy:** Execute necessary tasks before deployment.
- **deploy:** Deploy the game using GitHub Pages.
- **lint:** Lint the TypeScript and TypeScript React files.
- **format:** Format code using Prettier.
- **lint:styles:** Lint styles using Stylelint.
- **prepare:** Install Husky Git hooks.
- **pre-commit:** Run linting, style linting, and code formatting before committing changes.

## Dependencies

- **React:** 18.2.0
- **Redux Toolkit:** 2.2.1
- **GSAP:** 3.12.5
- **Howler:** 2.2.4
- **Decimal.js:** 10.4.3

For a complete list of dependencies, check the `package.json` file.

## Contributing

Feel free to contribute to the development of Bombay by creating issues, submitting pull requests, or providing feedback.

Enjoy playing Bombay! 🎮