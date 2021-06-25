"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var Prospects = /** @class */ (function (_super) {
    __extends(Prospects, _super);
    function Prospects() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.objectName = 'prospect';
        return _this;
    }
    Prospects.prototype.query = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['query']);
                        return [4 /*yield*/, this.parent.axios.get(url, { params: params })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.create = function (email, data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['create', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, data), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.readByEmail = function (email, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['read', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.get(url, { params: params })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.readById = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['read', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.get(url, { params: params })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.readByFid = function (fid, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['read', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.get(url, { params: params })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.updateByEmail = function (email, update, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['update', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, update), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.updateById = function (id, update, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['update', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, update), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.updateByFid = function (fid, update, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['update', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, update), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.upsertByEmail = function (email, data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['upsert', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, data), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.upsertById = function (id, data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['upsert', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, data), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.upsertByFid = function (fid, data, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['upsert', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.post(url, __assign(__assign({}, data), params))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.assignByEmail = function (email, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['assign', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.assignById = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['assign', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.assignByFid = function (fid, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['assign', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.unassignByEmail = function (email, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['unassign', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.unassignById = function (id, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['unassign', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.unassignByFid = function (fid, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['unassign', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.post(url, params)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.batchCreate = function (prospects) {
        return __awaiter(this, void 0, void 0, function () {
            var url, prospectsStruct, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['batchCreate']);
                        prospectsStruct = prospects;
                        if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
                            prospectsStruct = prospects.reduce(function (struct, _a) {
                                var _b;
                                var email = _a.email, rest = __rest(_a, ["email"]);
                                if (!email) {
                                    throw 'Must specify email in each prospect for create';
                                }
                                return __assign(__assign({}, struct), (_b = {}, _b[email] = rest, _b));
                            }, {});
                        }
                        return [4 /*yield*/, this.parent.axios.post(url, {
                                prospects: JSON.stringify({ prospects: prospectsStruct }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.batchUpdate = function (prospects) {
        return __awaiter(this, void 0, void 0, function () {
            var url, prospectsStruct, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['batchUpdate']);
                        prospectsStruct = prospects;
                        if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
                            prospectsStruct = prospects.reduce(function (struct, _a) {
                                var _b, _c;
                                var id = _a.id, email = _a.email, rest = __rest(_a, ["id", "email"]);
                                var updateProspect;
                                if (id) {
                                    updateProspect = (_b = {}, _b[id] = __assign({ email: email }, rest), _b);
                                }
                                else if (email) {
                                    updateProspect = (_c = {}, _c[email] = rest, _c);
                                }
                                else {
                                    throw 'Must specify id or email in each prospect for update';
                                }
                                return __assign(__assign({}, struct), updateProspect);
                            }, {});
                        }
                        return [4 /*yield*/, this.parent.axios.post(url, {
                                prospects: JSON.stringify({ prospects: prospectsStruct }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.batchUpsert = function (prospects) {
        return __awaiter(this, void 0, void 0, function () {
            var url, prospectsStruct, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['batchUpsert']);
                        prospectsStruct = prospects;
                        if (this.parent.apiVersion === 3 && Array.isArray(prospects)) {
                            prospectsStruct = prospects.reduce(function (struct, _a) {
                                var _b, _c;
                                var id = _a.id, email = _a.email, rest = __rest(_a, ["id", "email"]);
                                var upsertProspect;
                                if (id) {
                                    upsertProspect = (_b = {}, _b[id] = __assign({ email: email }, rest), _b);
                                }
                                else if (email) {
                                    upsertProspect = (_c = {}, _c[email] = rest, _c);
                                }
                                else {
                                    throw 'Must specify id or email in each prospect for upsert';
                                }
                                return __assign(__assign({}, struct), upsertProspect);
                            }, {});
                        }
                        return [4 /*yield*/, this.parent.axios.post(url, {
                                prospects: JSON.stringify({ prospects: prospectsStruct }),
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                }
            });
        });
    };
    Prospects.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['delete', 'id', id]);
                        return [4 /*yield*/, this.parent.axios.post(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Prospects.prototype.deleteByFid = function (fid) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['delete', 'fid', fid]);
                        return [4 /*yield*/, this.parent.axios.post(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Prospects.prototype.deleteByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this.parent.getApiUrl(this.objectName, ['delete', 'email', email]);
                        return [4 /*yield*/, this.parent.axios.post(url)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Prospects;
}(base_1.default));
exports.default = Prospects;
