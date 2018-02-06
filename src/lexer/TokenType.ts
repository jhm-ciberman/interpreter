export enum TokenType {
	TOKEN = "TOKEN",
	INTEGER = "INTEGER",

	LPAREN = "LPAREN",
	RPAREN = "RPAREN",
	LBRACE = "LBRACE",
	RBRACE = "RBRACE",

	MULTIPLY = "MULTIPLY",
	DIVISION = "DIVISION",
	PLUS = "PLUS",
	MINUS = "MINUS",

	SEMI = "SEMI",
	ID = "ID",
	EQUAL = "EQUAL",
	
	IF = "IF",
	VAR = "VAR",

	EOF = "EOF",
	EOL = "EOL",
}

export default TokenType;