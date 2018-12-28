import Type from "./Type";
import Symbol from "./Symbol";

export default interface ISemanticAnalyzer {
	readonly TYPE_INT: Type;
	readonly TYPE_FLOAT: Type;
	readonly TYPE_BOOL: Type;

    typeFor(typeName: string): Type;
    symbolFor(symbolName: string): Symbol;
}