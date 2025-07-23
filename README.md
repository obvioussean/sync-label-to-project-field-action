# sync-label-to-project-field-action

A GitHub Action that syncs issue labels to project fields, now with bonus chess game functionality!

## GitHub Action Usage

This action can be used to automatically update project fields based on issue labels.

## Chess Game

This repository now includes a complete chess game implementation with the following features:

### 🏁 Chess Game Features

- ♔ **Complete chess board representation** (8x8 grid)
- ♕ **All chess pieces**: King, Queen, Rook, Bishop, Knight, Pawn  
- ♖ **Move validation** for each piece type
- ♗ **Unicode chess symbols** for beautiful board display
- ♘ **Algebraic notation support** (e.g., e2-e4)
- ♙ **Move history tracking**
- 🎯 **Game state management**
- 🔄 **Player turn switching**
- ✅ **Path clearing validation** for sliding pieces

### 🎮 Usage Example

```typescript
import { Chess } from './src/chess-index.js';

const chess = new Chess();

// Display initial board
console.log(chess.getBoardString());

// Make moves using algebraic notation
chess.makeMoveFromNotation('e2', 'e4'); // White pawn to e4
chess.makeMoveFromNotation('e7', 'e5'); // Black pawn to e5
chess.makeMoveFromNotation('g1', 'f3'); // White knight to f3

// Get current game state
console.log(`Current player: ${chess.getCurrentPlayer()}`);
console.log(`Game status: ${chess.getGameStatus()}`);
console.log(`Valid moves: ${chess.getValidMoves().length}`);
```

### 🔧 Chess API

The chess game provides a comprehensive API:

- `makeMove(from, to)` - Make a move between two positions
- `makeMoveFromNotation(from, to)` - Make a move using algebraic notation
- `getBoardString()` - Get visual representation of the board
- `getCurrentPlayer()` - Get the current player ('white' or 'black')
- `getGameStatus()` - Get game status ('active', 'checkmate', 'stalemate', 'draw')
- `getMoveHistory()` - Get array of all moves made
- `getValidMoves()` - Get array of all valid moves for current player
- `reset()` - Reset game to initial state

### 🎲 Demo

Run the included demo:

```bash
node test-chess.mjs
```

This will show the chess board with beautiful Unicode pieces and demonstrate basic gameplay.