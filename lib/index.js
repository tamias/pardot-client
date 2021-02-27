"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var simple_oauth2_1 = require("simple-oauth2");
var qs_1 = require("qs");
var axios_1 = require("axios");
var campaigns_1 = require("./lib/campaigns");
var PardotClient = /** @class */ (function () {
    function PardotClient(_a) {
        var clientId = _a.clientId, clientSecret = _a.clientSecret, redirectUri = _a.redirectUri, token = _a.token, businessUnitId = _a.businessUnitId, baseUrl = _a.baseUrl, apiVersion = _a.apiVersion;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.businessUnitId = businessUnitId;
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : 'https://pi.pardot.com';
        // default to v4 if no version is specified
        this.apiVersion = apiVersion !== null && apiVersion !== void 0 ? apiVersion : 4;
        this.oauthClient = new simple_oauth2_1.AuthorizationCode({
            auth: {
                authorizePath: '/services/oauth2/authorize',
                tokenHost: 'https://login.salesforce.com',
                tokenPath: '/services/oauth2/token',
            },
            client: {
                id: this.clientId,
                secret: this.clientSecret,
            },
        });
        if (token) {
            this.token = this.oauthClient.createToken(token);
        }
        this.campaigns = new campaigns_1.default(this);
    }
    PardotClient.prototype.authorizeUrl = function (props) {
        return this.oauthClient.authorizeURL(__assign(__assign({}, props), { redirect_uri: this.redirectUri }));
    };
    PardotClient.prototype.getAccessToken = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.oauthClient.getToken({ code: code, redirect_uri: this.redirectUri })];
                    case 1:
                        _a.token = _b.sent();
                        // simple-oauth2 defines AccessToken['token'] as { [x: string]: any; }
                        // assume that Pardot will return a response containing the expected fields
                        return [2 /*return*/, this.token.token];
                }
            });
        });
    };
    Object.defineProperty(PardotClient.prototype, "axios", {
        get: function () {
            var _this = this;
            if (!this.axiosInstance) {
                if (!this.token) {
                    throw new Error('Cannot instantiate axios without token');
                }
                this.axiosInstance = axios_1.default.create();
                this.axiosInstance.interceptors.request.use(function (config) {
                    var data = config.data;
                    if (data && typeof data === 'object') {
                        data = qs_1.stringify(data);
                    }
                    return __assign(__assign({}, config), { data: data, headers: __assign({ Authorization: "Bearer " + _this.token.token.access_token, 'Pardot-Business-Unit-Id': _this.businessUnitId }, config.headers), params: __assign({ format: 'json' }, config.params) });
                });
            }
            return this.axiosInstance;
        },
        enumerable: false,
        configurable: true
    });
    PardotClient.prototype.getApiUrl = function (object, path) {
        return this.baseUrl + "/api/" + object + "/version/" + this.apiVersion + "/do/" + path;
    };
    return PardotClient;
}());
exports.default = PardotClient;
