import { ChessBoard, ChessPiece, Color, PieceType, Position } from './chess-types.js';

export class ChessBoardUtils {
    static createInitialBoard(): ChessBoard {
        const board: (ChessPiece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // Set up pawns
        for (let col = 0; col < 8; col++) {
            board[1][col] = { type: 'pawn', color: 'black' };
            board[6][col] = { type: 'pawn', color: 'white' };
        }
        
        // Set up other pieces
        const pieceOrder: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        
        for (let col = 0; col < 8; col++) {
            board[0][col] = { type: pieceOrder[col], color: 'black' };
            board[7][col] = { type: pieceOrder[col], color: 'white' };
        }
        
        return { squares: board };
    }
    
    static isValidPosition(pos: Position): boolean {
        return pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8;
    }
    
    static getPieceAt(board: ChessBoard, pos: Position): ChessPiece | null {
        if (!this.isValidPosition(pos)) return null;
        return board.squares[pos.row][pos.col];
    }
    
    static setPieceAt(board: ChessBoard, pos: Position, piece: ChessPiece | null): void {
        if (this.isValidPosition(pos)) {
            board.squares[pos.row][pos.col] = piece;
        }
    }
    
    static isSquareEmpty(board: ChessBoard, pos: Position): boolean {
        return this.getPieceAt(board, pos) === null;
    }
    
    static isEnemyPiece(board: ChessBoard, pos: Position, color: Color): boolean {
        const piece = this.getPieceAt(board, pos);
        return piece !== null && piece.color !== color;
    }
    
    static boardToString(board: ChessBoard): string {
        const pieceSymbols: Record<string, string> = {
            'white-king': '♔', 'white-queen': '♕', 'white-rook': '♖',
            'white-bishop': '♗', 'white-knight': '♘', 'white-pawn': '♙',
            'black-king': '♚', 'black-queen': '♛', 'black-rook': '♜',
            'black-bishop': '♝', 'black-knight': '♞', 'black-pawn': '♟'
        };
        
        let result = '  a b c d e f g h\n';
        for (let row = 0; row < 8; row++) {
            result += `${8 - row} `;
            for (let col = 0; col < 8; col++) {
                const piece = board.squares[row][col];
                if (piece) {
                    const key = `${piece.color}-${piece.type}`;
                    result += pieceSymbols[key] || '?';
                } else {
                    result += '.';
                }
                result += ' ';
            }
            result += `${8 - row}\n`;
        }
        result += '  a b c d e f g h\n';
        return result;
    }
}