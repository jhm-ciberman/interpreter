export default class Char {
	public static isDigit(char: string): boolean {
		return (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(char) !== -1);
	}

	public static isWhitespace(char: string): boolean {
		return ([' ', '\t'].indexOf(char) !== -1);
	}

}