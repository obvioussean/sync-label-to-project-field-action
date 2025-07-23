import { ChessGame, ChessMove, Color, Position } from './chess-types.js';
import { ChessBoardUtils } from './chess-board.js';
import { ChessMovesValidator } from './chess-moves.js';

export class Chess {
    private game: ChessGame;
    
    constructor() {
        this.game = {
            board: ChessBoardUtils.createInitialBoard(),
            currentPlayer: 'white',
            gameStatus: 'active',
            moveHistory: []
        };
    }
    
    /**
     * Make a move on the chess board
     * @param from Starting position
     * @param to Ending position
     * @returns true if move was successful, false otherwise
     */
    makeMove(from: Position, to: Position): boolean {
        if (this.game.gameStatus !== 'active') {
            return false;
        }
        
        if (!ChessMovesValidator.isValidMove(this.game.board, from, to, this.game.currentPlayer)) {
            return false;
        }
        
        const piece = ChessBoardUtils.getPieceAt(this.game.board, from);
        const capturedPiece = ChessBoardUtils.getPieceAt(this.game.board, to);
        
        if (!piece) return false;
        
        // Execute the move
        ChessBoardUtils.setPieceAt(this.game.board, to, piece);
        ChessBoardUtils.setPieceAt(this.game.board, from, null);
        
        // Mark piece as moved
        piece.hasMoved = true;
        
        // Record the move
        const move: ChessMove = {
            from,
            to,
            piece: { ...piece },
            capturedPiece: capturedPiece ? { ...capturedPiece } : undefined
        };
        this.game.moveHistory.push(move);
        
        // Switch players
        this.game.currentPlayer = this.game.currentPlayer === 'white' ? 'black' : 'white';
        
        return true;
    }
    
    /**
     * Make a move using algebraic notation (e.g., "e2" to "e4")
     */
    makeMoveFromNotation(fromNotation: string, toNotation: string): boolean {
        const from = this.parseAlgebraicNotation(fromNotation);
        const to = this.parseAlgebraicNotation(toNotation);
        
        if (!from || !to) return false;
        
        return this.makeMove(from, to);
    }
    
    /**
     * Get the current board state as a string
     */
    getBoardString(): string {
        return ChessBoardUtils.boardToString(this.game.board);
    }
    
    /**
     * Get the current player
     */
    getCurrentPlayer(): Color {
        return this.game.currentPlayer;
    }
    
    /**
     * Get the game status
     */
    getGameStatus(): string {
        return this.game.gameStatus;
    }
    
    /**
     * Get move history
     */
    getMoveHistory(): ChessMove[] {
        return [...this.game.moveHistory];
    }
    
    /**
     * Reset the game to initial state
     */
    reset(): void {
        this.game = {
            board: ChessBoardUtils.createInitialBoard(),
            currentPlayer: 'white',
            gameStatus: 'active',
            moveHistory: []
        };
    }
    
    /**
     * Parse algebraic notation (e.g., "e4") to Position
     */
    private parseAlgebraicNotation(notation: string): Position | null {
        if (notation.length !== 2) return null;
        
        const col = notation.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(notation[1]);
        
        if (col < 0 || col > 7 || row < 0 || row > 7) return null;
        
        return { row, col };
    }
    
    /**
     * Convert Position to algebraic notation
     */
    positionToNotation(pos: Position): string {
        const col = String.fromCharCode('a'.charCodeAt(0) + pos.col);
        const row = (8 - pos.row).toString();
        return col + row;
    }
    
    /**
     * Get all valid moves for the current player
     */
    getValidMoves(): string[] {
        const moves: string[] = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const from: Position = { row, col };
                const piece = ChessBoardUtils.getPieceAt(this.game.board, from);
                
                if (piece && piece.color === this.game.currentPlayer) {
                    // Check all possible destination squares
                    for (let toRow = 0; toRow < 8; toRow++) {
                        for (let toCol = 0; toCol < 8; toCol++) {
                            const to: Position = { row: toRow, col: toCol };
                            
                            if (ChessMovesValidator.isValidMove(this.game.board, from, to, this.game.currentPlayer)) {
                                moves.push(`${this.positionToNotation(from)}-${this.positionToNotation(to)}`);
                            }
                        }
                    }
                }
            }
        }
        
        return moves;
    }
}