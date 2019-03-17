export default class InvalidCharacterError extends Error {

    public character: string;

    public line: number;

    public col: number;

    constructor(line: number, col: number, character: string) {
        super(`Invalid character "${ character }" at line ${ line } col ${ col }`);
        this.character = character;
        this.line = line; 
        this.col = col;
    }
}