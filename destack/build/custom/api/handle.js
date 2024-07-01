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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.handleEditor = exports.updateData = exports.loadAllData = exports.loadData = exports.uploadFiles = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var formidable_1 = require("formidable");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("../utils");
var development = process.env.NODE_ENV !== 'production';
var rootPath = process.cwd();
var dataFolder = 'data';
var uploadFolder = 'uploaded';
var uploadFiles = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var form, uploadPath, uploadFolderExists, files, urls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                form = new formidable_1.IncomingForm({ uploadDir: uploadFolder, keepExtensions: true });
                uploadPath = path_1.default.join('public', uploadFolder);
                return [4 /*yield*/, (0, utils_1.exists)(uploadPath)];
            case 1:
                uploadFolderExists = _a.sent();
                if (!!uploadFolderExists) return [3 /*break*/, 3];
                return [4 /*yield*/, fs_1.default.promises.mkdir(uploadPath)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                // NOTE: react-scripts triggers reload after uploading files in public folder
                form.on('fileBegin', function (_, file) { return (file.path = path_1.default.join('public', uploadFolder, file.name)); });
                return [4 /*yield*/, (0, utils_1.formParse)(form, req)];
            case 4:
                files = _a.sent();
                urls = Object.values(files).map(function (f) { var _a; return path_1.default.join(path_1.default.sep, uploadFolder, (_a = f.name) !== null && _a !== void 0 ? _a : ''); });
                return [2 /*return*/, urls];
        }
    });
}); };
exports.uploadFiles = uploadFiles;
var getFileNameFromRoute = function (route) { return (route === '/' ? 'default' : route); }; // browser paths are always "/"
var getRouteFromFilename = function (filename) {
    return filename.slice(0, -5) === path_1.default.sep + 'default' ? path_1.default.sep : filename;
}; // file paths are OS-specific
var loadData = function (route, ext) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, dataPath, dataExists, content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = getFileNameFromRoute(route);
                dataPath = path_1.default.join(rootPath, dataFolder, "".concat(fileName, ".").concat(ext));
                return [4 /*yield*/, (0, utils_1.exists)(dataPath)];
            case 1:
                dataExists = _a.sent();
                if (!dataExists) {
                    return [2 /*return*/, ext === 'json' ? '{}' : '<div>Not found</div>'];
                }
                else {
                    content = fs_1.default.readFileSync(dataPath, 'utf8');
                    return [2 /*return*/, content];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.loadData = loadData;
// fix windows/unix paths and base path
var fixPaths = function (c, basePath) {
    var nameWithoutBasePath = getRouteFromFilename(c.name.replace(basePath, ''));
    var nameWithFixSeps = nameWithoutBasePath.split(path_1.default.sep).join('/'); // replace all
    return { content: c.content, name: nameWithFixSeps };
};
var loadAllData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var basePath, files, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                basePath = path_1.default.join(rootPath, dataFolder);
                files = (0, utils_1.readdirRecursive)(basePath);
                return [4 /*yield*/, Promise.all(files.map(function (f) {
                        return fs_1.default.promises
                            .readFile(f, 'utf8')
                            .then(function (c) { return ({ name: f, content: c }); })
                            .then(function (c) { return fixPaths(c, basePath); });
                    }))];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
exports.loadAllData = loadAllData;
var updateData = function (route, ext, data) { return __awaiter(void 0, void 0, void 0, function () {
    var fileName, updatePath, updateFolderExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileName = getFileNameFromRoute(route);
                updatePath = path_1.default.join(rootPath, dataFolder);
                return [4 /*yield*/, (0, utils_1.exists)(updatePath)];
            case 1:
                updateFolderExists = _a.sent();
                if (!!updateFolderExists) return [3 /*break*/, 3];
                return [4 /*yield*/, fs_1.default.promises.mkdir(updatePath)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, fs_1.default.promises.writeFile(path_1.default.join(updatePath, "".concat(fileName, ".").concat(ext)), data)];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateData = updateData;
var handleData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, contentType, isMultiPart, body, urls;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                // check method
                if (req.method !== 'GET' && req.method !== 'POST') {
                    return [2 /*return*/, res.status(405).json({ error: 'Not allowed' })];
                }
                if (!(req.method === 'GET')) return [3 /*break*/, 2];
                return [4 /*yield*/, loadData(req.query.path, (_a = req.query.ext) !== null && _a !== void 0 ? _a : 'html')];
            case 1:
                data = _c.sent();
                return [2 /*return*/, res.status(200).send(data)];
            case 2:
                if (!(req.method === 'POST')) return [3 /*break*/, 7];
                contentType = req.headers['content-type'];
                isMultiPart = contentType.startsWith('multipart/form-data');
                if (!!isMultiPart) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, utils_1.getPage)(req)];
            case 3:
                body = _c.sent();
                return [4 /*yield*/, updateData(req.query.path, (_b = req.query.ext) !== null && _b !== void 0 ? _b : 'html', body)];
            case 4:
                _c.sent();
                return [2 /*return*/, res.status(200).send('')];
            case 5: return [4 /*yield*/, uploadFiles(req)];
            case 6:
                urls = _c.sent();
                return [2 /*return*/, res.status(200).json(urls)];
            case 7: return [2 /*return*/];
        }
    });
}); };
var getPackagePath = function () {
    var pathCurrent = path_1.default.dirname(require.resolve('destack/package.json'));
    if (pathCurrent === null || pathCurrent === void 0 ? void 0 : pathCurrent.startsWith('(api)')) {
        return path_1.default.join(process.cwd(), '..', pathCurrent);
    }
    else {
        return pathCurrent;
    }
};
var handleAsset = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assetPath, data, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // check method
                if (req.method !== 'GET') {
                    return [2 /*return*/, res.status(405).json({ error: 'Not allowed' })];
                }
                assetPath = path_1.default.join(getPackagePath(), req.query.path);
                return [4 /*yield*/, fs_1.default.promises.readFile(assetPath)];
            case 1:
                data = _a.sent();
                options = { 'Content-Type': 'image/png', 'Content-Length': data.length };
                res.writeHead(200, options);
                res.end(data, 'binary');
                return [2 /*return*/];
        }
    });
}); };
var handleTheme = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var themeName, folderPath, componentNames, componentsP, components;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // check method
                if (req.method !== 'GET') {
                    return [2 /*return*/, res.status(405).json({ error: 'Not allowed' })];
                }
                themeName = req.query.name;
                folderPath = path_1.default.join(getPackagePath(), 'themes', themeName);
                return [4 /*yield*/, fs_1.default.promises
                        .readdir(folderPath)
                        .then(function (f) { return f.filter(function (c) { return c !== 'index.ts' && !c.startsWith('.'); }); })];
            case 1:
                componentNames = _a.sent();
                componentsP = componentNames.map(function (c) { return __awaiter(void 0, void 0, void 0, function () {
                    var assetPath, source;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                assetPath = path_1.default.join(folderPath, c, 'index.html');
                                return [4 /*yield*/, fs_1.default.promises.readFile(assetPath, 'utf-8')];
                            case 1:
                                source = _a.sent();
                                return [2 /*return*/, { source: source, folder: c }];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(componentsP)];
            case 2:
                components = _a.sent();
                res.json(components);
                return [2 /*return*/];
        }
    });
}); };
var handleEditor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // check env
        if (!development) {
            return [2 /*return*/, res.status(403).json({ error: 'Forbidden' })];
        }
        // handle request
        if (req.query.type === 'data') {
            return [2 /*return*/, handleData(req, res)];
        }
        else if (req.query.type === 'asset') {
            return [2 /*return*/, handleAsset(req, res)];
        }
        else if (req.query.type === 'theme') {
            return [2 /*return*/, handleTheme(req, res)];
        }
        else {
            return [2 /*return*/, res.status(400).json({ error: 'Invalid type' })];
        }
        return [2 /*return*/];
    });
}); };
exports.handleEditor = handleEditor;
var config = { api: { bodyParser: false } };
exports.config = config;
