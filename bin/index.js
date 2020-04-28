#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fse = require("fs-extra");
var path = require("path");
function argsParse(argv) {
    var UsageInfo = "tsJ Usage:\n    tsJ  -h   // show Usage details\n    tsJ  <ProjectName>\n";
    if (argv.length <= 2 || argv[2] === '-h') {
        console.log(UsageInfo);
        process.exit(1);
    }
    var nodePath = argv[0], entryPath = argv[1], projectName = argv[2], type = argv[3];
    return {
        nodePath: nodePath,
        entryPath: entryPath,
        projectName: projectName,
        type: Number(type)
    };
}
function userInteractive() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolve) {
                        process.stdin.on('readable', function () {
                            var inp;
                            while ((inp = process.stdin.read()) !== null) {
                                resolve('' + inp.slice(0, -1));
                                process.stdin.end();
                            }
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function checkExist(pjName) {
    return __awaiter(this, void 0, void 0, function () {
        var dir, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = path.join(process.cwd(), pjName);
                    if (!fse.existsSync(dir)) return [3 /*break*/, 2];
                    console.log("dir exist,does overwrite it? [Y/N]");
                    return [4 /*yield*/, userInteractive()];
                case 1:
                    ret = _a.sent();
                    if (ret.toLowerCase() !== 'y') {
                        process.exit(1);
                    }
                    _a.label = 2;
                case 2:
                    fse.emptyDirSync(dir);
                    console.log(dir + " init successed!");
                    return [2 /*return*/, dir];
            }
        });
    });
}
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, projectName, type, dest, src, jsonPath, pckJson;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = argsParse(process.argv), projectName = _a.projectName, type = _a.type;
                    return [4 /*yield*/, checkExist(projectName)];
                case 1:
                    dest = _b.sent();
                    src = path.join(__dirname, '../', '_template');
                    fse.copySync(src, dest, { overwrite: true });
                    jsonPath = path.join(dest, 'package.json');
                    pckJson = fse.readJSONSync(jsonPath);
                    pckJson.name = projectName;
                    fse.writeJSONSync(jsonPath, pckJson, { spaces: 4 });
                    console.log("init " + projectName + " successed!");
                    return [2 /*return*/];
            }
        });
    });
}
start();
