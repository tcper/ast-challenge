import * as ts from "typescript";
import { readFileSync, writeFileSync } from 'fs';
import generateFunction from '../src/index'

const data = JSON.parse(readFileSync(__dirname + '/../example-methods.json', 'utf-8'));

it('works', () => {
    Object.keys(data).forEach(key => {
        const input = data[key];
        let ast = generateFunction(input);
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
        let code = ast.map((line) => printer.printNode(ts.EmitHint.Unspecified, line, ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS))).join("\n")
        expect(code).toMatchSnapshot()
    })
});