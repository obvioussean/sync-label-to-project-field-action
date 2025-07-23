export type Color = 'white' | 'black';
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';

export interface Position {
    row: number;
    col: number;
}

export interface ChessPiece {
    type: PieceType;
    color: Color;
    hasMoved?: boolean;
}

export interface ChessBoard {
    squares: (ChessPiece | null)[][];
}

export interface ChessMove {
    from: Position;
    to: Position;
    piece: ChessPiece;
    capturedPiece?: ChessPiece;
}

export interface ChessGame {
    board: ChessBoard;
    currentPlayer: Color;
    gameStatus: 'active' | 'checkmate' | 'stalemate' | 'draw';
    moveHistory: ChessMove[];
}