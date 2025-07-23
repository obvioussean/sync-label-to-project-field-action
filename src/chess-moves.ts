import { ChessBoard, ChessPiece, Color, Position } from './chess-types.js';
import { ChessBoardUtils } from './chess-board.js';

export class ChessMovesValidator {
    static isValidMove(board: ChessBoard, from: Position, to: Position, currentPlayer: Color): boolean {
        if (!ChessBoardUtils.isValidPosition(from) || !ChessBoardUtils.isValidPosition(to)) {
            return false;
        }
        
        const piece = ChessBoardUtils.getPieceAt(board, from);
        if (!piece || piece.color !== currentPlayer) {
            return false;
        }
        
        // Can't capture own piece
        const targetPiece = ChessBoardUtils.getPieceAt(board, to);
        if (targetPiece && targetPiece.color === currentPlayer) {
            return false;
        }
        
        // Check piece-specific movement rules
        return this.isValidPieceMove(board, piece, from, to);
    }
    
    private static isValidPieceMove(board: ChessBoard, piece: ChessPiece, from: Position, to: Position): boolean {
        const deltaRow = to.row - from.row;
        const deltaCol = to.col - from.col;
        
        switch (piece.type) {
            case 'pawn':
                return this.isValidPawnMove(board, piece, from, to, deltaRow, deltaCol);
            case 'rook':
                return this.isValidRookMove(board, from, to, deltaRow, deltaCol);
            case 'knight':
                return this.isValidKnightMove(deltaRow, deltaCol);
            case 'bishop':
                return this.isValidBishopMove(board, from, to, deltaRow, deltaCol);
            case 'queen':
                return this.isValidQueenMove(board, from, to, deltaRow, deltaCol);
            case 'king':
                return this.isValidKingMove(deltaRow, deltaCol);
            default:
                return false;
        }
    }
    
    private static isValidPawnMove(board: ChessBoard, piece: ChessPiece, from: Position, to: Position, deltaRow: number, deltaCol: number): boolean {
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Forward move
        if (deltaCol === 0) {
            if (deltaRow === direction && ChessBoardUtils.isSquareEmpty(board, to)) {
                return true;
            }
            // Two squares on first move
            if (from.row === startRow && deltaRow === 2 * direction && ChessBoardUtils.isSquareEmpty(board, to)) {
                return true;
            }
        }
        
        // Diagonal capture
        if (Math.abs(deltaCol) === 1 && deltaRow === direction) {
            return ChessBoardUtils.isEnemyPiece(board, to, piece.color);
        }
        
        return false;
    }
    
    private static isValidRookMove(board: ChessBoard, from: Position, to: Position, deltaRow: number, deltaCol: number): boolean {
        if (deltaRow !== 0 && deltaCol !== 0) return false;
        return this.isPathClear(board, from, to);
    }
    
    private static isValidKnightMove(deltaRow: number, deltaCol: number): boolean {
        const absDeltaRow = Math.abs(deltaRow);
        const absDeltaCol = Math.abs(deltaCol);
        return (absDeltaRow === 2 && absDeltaCol === 1) || (absDeltaRow === 1 && absDeltaCol === 2);
    }
    
    private static isValidBishopMove(board: ChessBoard, from: Position, to: Position, deltaRow: number, deltaCol: number): boolean {
        if (Math.abs(deltaRow) !== Math.abs(deltaCol)) return false;
        return this.isPathClear(board, from, to);
    }
    
    private static isValidQueenMove(board: ChessBoard, from: Position, to: Position, deltaRow: number, deltaCol: number): boolean {
        return this.isValidRookMove(board, from, to, deltaRow, deltaCol) || 
               this.isValidBishopMove(board, from, to, deltaRow, deltaCol);
    }
    
    private static isValidKingMove(deltaRow: number, deltaCol: number): boolean {
        return Math.abs(deltaRow) <= 1 && Math.abs(deltaCol) <= 1;
    }
    
    private static isPathClear(board: ChessBoard, from: Position, to: Position): boolean {
        const deltaRow = to.row - from.row;
        const deltaCol = to.col - from.col;
        const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
        
        const stepRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
        const stepCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);
        
        for (let i = 1; i < steps; i++) {
            const checkPos: Position = {
                row: from.row + stepRow * i,
                col: from.col + stepCol * i
            };
            if (!ChessBoardUtils.isSquareEmpty(board, checkPos)) {
                return false;
            }
        }
        
        return true;
    }
}