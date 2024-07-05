import * as ts from "typescript";
import generateFunction from '../src/index'


it('works', () => {
    const input = {
        "Pools": {
            "requestType": "QueryPoolsRequest",
            "responseType": "QueryPoolsResponse",
            "interfaceName": "UsePoolsQuery",
            "queryServiceName": "queryService",
            "queryServiceFunction": "pools",
            "keyName": "poolsQuery"
        }
    }
    let ast = generateFunction(input["Pools"]);
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
    let code = ast.map((line) => printer.printNode(ts.EmitHint.Unspecified, line, ts.createSourceFile("source.ts", "", ts.ScriptTarget.ESNext, false, ts.ScriptKind.TS))).join("\n")
    expect(code).toMatchSnapshot()
});