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
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = require("fs");
var imagesFullPath = path_1.default.resolve(__dirname, '../assets/images/full');
var imagesThumbPath = path_1.default.resolve(__dirname, '../assets/images/thumb');
var images = express_1.default.Router();
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, width, height, filePathThumb, filePathFull, filePath, _a, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                filename = req.query.filename;
                width = parseInt(req.query.width, 10);
                height = parseInt(req.query.height, 10);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 11, , 12]);
                if (!filename || typeof filename !== 'string') {
                    throw new Error('Invalid filename');
                }
                if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                    throw new Error('Invalid width or height');
                }
                filePathThumb = path_1.default.resolve(imagesThumbPath, "".concat(req.query.filename, "-").concat(width, "x").concat(height, ".jpg"));
                filePathFull = path_1.default.resolve(imagesFullPath, "".concat(req.query.filename, ".jpg"));
                filePath = width && height
                    ? path_1.default.resolve(imagesThumbPath, "".concat(req.query.filename, "-").concat(width, "x").concat(height, ".jpg"))
                    : path_1.default.resolve(imagesFullPath, "".concat(req.query.filename, ".jpg"));
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 9]);
                return [4 /*yield*/, fs_1.promises.access(filePathThumb)];
            case 3:
                _c.sent();
                return [3 /*break*/, 9];
            case 4:
                _a = _c.sent();
                _c.label = 5;
            case 5:
                _c.trys.push([5, 7, , 8]);
                return [4 /*yield*/, (0, sharp_1.default)(filePathFull)
                        .resize(width, height)
                        .toFormat('jpeg')
                        .toFile(filePathThumb)];
            case 6:
                _c.sent();
                return [3 /*break*/, 8];
            case 7:
                _b = _c.sent();
                res.send('Resizing failed.');
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 9];
            case 9: return [4 /*yield*/, fs_1.promises.access(filePath)];
            case 10:
                _c.sent();
                if (filePath) {
                    res.sendFile(filePath);
                }
                else {
                    res.send('Image not found');
                }
                return [3 /*break*/, 12];
            case 11:
                error_1 = _c.sent();
                console.error('Error processing image request:', error_1);
                res.status(500).send('Internal server error');
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); });
exports.default = images;
