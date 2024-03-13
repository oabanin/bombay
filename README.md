# React Rock Scissors Paper Game

Welcome to Bombay, a simple Rock Scissors Paper game built with React! Customize your game by modifying the rules in `src/constants/specifications.ts`.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/oabanin/bombay.git
   cd bombay
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:5173/bombay](http://localhost:5173/bombay) in your browser to play the game.

## Game Rules

The game rules can be customized in the `src/constants/specifications.ts` file. For example, you can add a "superhand" by uncommenting the relevant code in the file.

```typescript
// src/constants/specifications.ts

// ...
export enum ENUM_POSITIONS {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
  // superhand = 'superhand',
}
// ...
```

Feel free to experiment with different rules and elements to make the game more exciting!

## Configuration

Customize the game behavior by adjusting the constants in `src/constants/specifications.ts`.

- `INITIAL_BALANCE`: Initial balance for the player.
- `BET_STEP`: Bet increment/decrement step.
- `POSITIONS_MULTIPLIERS`: Multipliers for different positions.
- `ENUM_RESULTS`: Enumeration of game results.
- `ENUM_GAME_STATE`: Enumeration of game states.
- `ENUM_POSITIONS`: Enumeration of game positions.
- `POSITION_RESULT_COLORS`: Colors associated with different game results.
- `POSITION_ITEMS`: Array of available game positions.
- `MAX_POSITIONS`: Maximum number of positions.
- `WIN_MAP`: Map defining winning positions for each position.
- `COMPUTER_POSITION_CHOICES`: Array of computer position choices.

## Deployment

To deploy the game, build the project and deploy it to GitHub Pages:

```bash
npm run build
npm run deploy
```

The game will be accessible at [https://oabanin.github.io/bombay](https://oabanin.github.io/bombay).

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project.
- `npm run lint`: Run ESLint to check for code style issues.
- `npm run preview`: Preview the production build.
- `npm run predeploy`: Build the project before deployment.
- `npm run deploy`: Deploy the project to GitHub Pages.
- `npm run lint:styles`: Run Stylelint to check for stylesheets issues.

## Dependencies

- `@reduxjs/toolkit`: State management library for React.
- `clsx`: Utility for conditionally joining class names together.
- `gsap`: Animation library for JavaScript.
- `howler`: Audio library for the modern web.
- `numeral`: Number formatting library.
- `react`: JavaScript library for building user interfaces.
- `react-dom`: React package for working with the DOM.
- `react-redux`: Official React bindings for Redux.

## Development Dependencies

- `@types/howler`, `@types/numeral`, `@types/react`, `@types/react-dom`: TypeScript type definitions.
- `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint`, `eslint-config-prettier`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `eslint-plugin-simple-import-sort`: ESLint configurations and plugins.
- `gh-pages`: GitHub Pages deployment.
- `prettier`: Opinionated code formatter.
- `sass`: CSS preprocessor.
- `stylelint`, `stylelint-config-idiomatic-order`, `stylelint-config-standard-scss`: Linting and style configurations.
- `typescript`: TypeScript language.
- `vite`: Frontend build tool.
