import {spawn} from 'child_process';
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export default class FASMCompiler {

    private _fasmPath: string;

    constructor(fasmPath: string = "fasm") {
        this._fasmPath = fasmPath;
    }

    public compile(str: string, output: string): void {
        const input = this._writeFile(str);

        console.log([this._fasmPath, input, path.resolve(output)].join(' '));

        const bat = spawn(this._fasmPath, [input, path.resolve(output)]);

        bat.stdout.on('data', (data) => {
          console.log(data.toString());
        });
        
        bat.stderr.on('data', (data) => {
          console.log(data.toString());
        });
        
        bat.on('exit', (code) => {
          console.log(`Child exited with code ${code}`);
        });
    }


    private _writeFile(data: string): string {
        const id = Math.floor(Math.random() * 1000000);
        const filename = path.normalize(os.tmpdir() + `/ciber_tmp${id}.asm`);
        fs.writeFileSync(filename, data);
        return filename;
    }
}