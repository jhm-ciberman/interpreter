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

	LT = "LT",
	LTEQ = "LTEQ",
	GT = "GT",
	GTEQ = "GTEQ",
	EQ = "EQ",
	NOTEQ = "NOTEQ",
	
	COLON = "COLON",
	SEMI = "SEMI",
	ID = "ID",
	ASSIGN = "ASSIGN",
	
	IF = "IF",
	ELSE = "ELSE",
	WHILE = "WHILE",
	VAR = "VAR",

	EOF = "EOF",
}

export default TokenType;