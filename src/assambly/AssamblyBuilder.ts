import Op from "../intrep/op/Op";

export default class AssamblyBuilder
{
    public generateAssambly(opList: string[]): string {

        const finalStr = [
            'format PE',
            'entry _main',
            '',
            `section '.text' code readable executable`,
            '_main:',
            opList.join('\n'),
            this._finalLog().join('\n'),
            '',
            `section '.data' data readable writeable`,
            this._data().join('\n'),
            '',
            `section '.idata' data import readable`,
            this._importData().join('\n'),
        ];
        
        return finalStr.join('\n');
    }

    private _finalLog() {
        return [
            'push	eax',
            'push	_format_output',
            'call	[printf]',
            'add 	esp, 8',
            '',
            'xor     eax, eax',
            'push	eax',
            'push	_format_input',
            'call	[scanf]',
            'add 	esp, 8',
            '',
            'push	0',
            'call	[exit]',
            'ret',
        ];
    }

    private _data() {
        return [
            '_format_input   db "%d",0',
            '_format_output  db "Result= %d",10,0',
        ];
    }

    private _importData()
    {
        return [
            'include "macro\\import32.inc"',
            'library msvcrt, "MSVCRT.DLL"',
            'import msvcrt,\\',
            '    printf ,"printf",\\',
            '    scanf  ,"scanf",\\',
            '    exit   ,"exit"',
        ];
    }
}