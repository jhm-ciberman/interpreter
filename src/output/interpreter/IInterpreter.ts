export default interface IInterpreter {
    setLastEvalValue(value: any): void;
	setVar(name: string, value: any): any;
	getVarValue(name: string): any;
}