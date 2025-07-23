import * as core from '@actions/core';
import { Chess } from './chess-index.js';

/**
 * Example integration showing how the chess game could be used
 * alongside the GitHub Action functionality
 */
export class ChessIntegration {
    private chess: Chess;
    
    constructor() {
        this.chess = new Chess();
    }
    
    /**
     * Creates a chess game based on issue labels
     * For example, if an issue has labels like "e2", "e4", etc., 
     * it could represent chess moves
     */
    processIssueLabelsAsChessMoves(labels: string[]): string {
        this.chess.reset();
        
        // Filter labels that look like chess moves (e.g., "e2-e4", "g1-f3")
        const chessMoveLabels = labels.filter(label => 
            /^[a-h][1-8]-[a-h][1-8]$/.test(label)
        );
        
        if (chessMoveLabels.length === 0) {
            return "No chess move labels found in issue.";
        }
        
        let result = "🏁 Processing chess moves from issue labels:\n\n";
        result += this.chess.getBoardString() + "\n";
        
        for (const moveLabel of chessMoveLabels.slice(0, 10)) { // Limit to 10 moves
            const [from, to] = moveLabel.split('-');
            const success = this.chess.makeMoveFromNotation(from, to);
            
            if (success) {
                result += `✅ Move ${moveLabel} executed\n`;
            } else {
                result += `❌ Invalid move ${moveLabel}\n`;
                break;
            }
        }
        
        result += "\nFinal board position:\n";
        result += this.chess.getBoardString();
        result += `\nCurrent player: ${this.chess.getCurrentPlayer()}\n`;
        result += `Game status: ${this.chess.getGameStatus()}\n`;
        
        return result;
    }
    
    /**
     * Generate chess puzzle based on project field value
     * Could be used to create different chess scenarios
     */
    generateChessPuzzleForFieldValue(fieldValue: string): string {
        this.chess.reset();
        
        // Example: different field values create different chess positions
        switch (fieldValue.toLowerCase()) {
            case 'beginner':
                // Simple opening moves
                this.chess.makeMoveFromNotation('e2', 'e4');
                this.chess.makeMoveFromNotation('e7', 'e5');
                break;
                
            case 'intermediate':
                // More complex opening
                this.chess.makeMoveFromNotation('d2', 'd4');
                this.chess.makeMoveFromNotation('d7', 'd5');
                this.chess.makeMoveFromNotation('c2', 'c4');
                break;
                
            case 'advanced':
                // Advanced opening sequence
                this.chess.makeMoveFromNotation('e2', 'e4');
                this.chess.makeMoveFromNotation('c7', 'c5');
                this.chess.makeMoveFromNotation('g1', 'f3');
                this.chess.makeMoveFromNotation('d7', 'd6');
                break;
                
            default:
                // Random chess position for any other value
                break;
        }
        
        let result = `🎯 Chess puzzle for field value: "${fieldValue}"\n\n`;
        result += this.chess.getBoardString();
        result += `\nNext to move: ${this.chess.getCurrentPlayer()}\n`;
        result += `Valid moves available: ${this.chess.getValidMoves().length}\n`;
        
        return result;
    }
    
    /**
     * Log chess game state to GitHub Actions
     */
    logChessGameToActions(): void {
        core.info("♟️ Chess Game State:");
        core.info(this.chess.getBoardString());
        core.info(`Current Player: ${this.chess.getCurrentPlayer()}`);
        core.info(`Game Status: ${this.chess.getGameStatus()}`);
        core.info(`Moves Made: ${this.chess.getMoveHistory().length}`);
    }
}