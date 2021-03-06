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
var accounts_1 = require("./objects/accounts");
var axios_1 = require("axios");
var campaigns_1 = require("./objects/campaigns");
var axios_auth_refresh_1 = require("axios-auth-refresh");
var custom_fields_1 = require("./objects/custom-fields");
var custom_redirects_1 = require("./objects/custom-redirects");
var dynamic_content_1 = require("./objects/dynamic-content");
var email_clicks_1 = require("./objects/email-clicks");
var emails_1 = require("./objects/emails");
var email_templates_1 = require("./objects/email-templates");
var forms_1 = require("./objects/forms");
var lifecycle_histories_1 = require("./objects/lifecycle-histories");
var lifecycle_stages_1 = require("./objects/lifecycle-stages");
var list_memberships_1 = require("./objects/list-memberships");
var lists_1 = require("./objects/lists");
var opportunities_1 = require("./objects/opportunities");
var prospect_accounts_1 = require("./objects/prospect-accounts");
var prospects_1 = require("./objects/prospects");
var tag_objects_1 = require("./objects/tag-objects");
var tags_1 = require("./objects/tags");
var users_1 = require("./objects/users");
var visitor_activities_1 = require("./objects/visitor-activities");
var visitors_1 = require("./objects/visitors");
var visits_1 = require("./objects/visits");
var PardotClient = /** @class */ (function () {
    function PardotClient(_a) {
        var clientId = _a.clientId, clientSecret = _a.clientSecret, redirectUri = _a.redirectUri, token = _a.token, businessUnitId = _a.businessUnitId, baseUrl = _a.baseUrl, apiVersion = _a.apiVersion, refreshCallback = _a.refreshCallback;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.businessUnitId = businessUnitId;
        this.baseUrl = baseUrl !== null && baseUrl !== void 0 ? baseUrl : 'https://pi.pardot.com';
        this.refreshCallback = refreshCallback;
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
            this.accessToken = this.oauthClient.createToken(token);
        }
        this.accounts = new accounts_1.default(this);
        this.campaigns = new campaigns_1.default(this);
        this.customFields = new custom_fields_1.default(this);
        this.customRedirects = new custom_redirects_1.default(this);
        this.dynamicContent = new dynamic_content_1.default(this);
        this.emails = new emails_1.default(this);
        this.emailClicks = new email_clicks_1.default(this);
        this.emailTemplates = new email_templates_1.default(this);
        this.forms = new forms_1.default(this);
        this.lifecycleHistories = new lifecycle_histories_1.default(this);
        this.lifecycleStages = new lifecycle_stages_1.default(this);
        this.lists = new lists_1.default(this);
        this.listMemberships = new list_memberships_1.default(this);
        this.opportunities = new opportunities_1.default(this);
        this.prospects = new prospects_1.default(this);
        this.prospectAccounts = new prospect_accounts_1.default(this);
        this.tags = new tags_1.default(this);
        this.tagObjects = new tag_objects_1.default(this);
        this.users = new users_1.default(this);
        this.visitors = new visitors_1.default(this);
        this.visitorActivities = new visitor_activities_1.default(this);
        this.visits = new visits_1.default(this);
    }
    PardotClient.prototype.authorizeUrl = function (props) {
        return this.oauthClient.authorizeURL(__assign(__assign({}, props), { redirect_uri: this.redirectUri }));
    };
    Object.defineProperty(PardotClient.prototype, "token", {
        get: function () {
            if (!this.accessToken) {
                throw new Error('Attempt to use missing token');
            }
            return this.accessToken;
        },
        enumerable: false,
        configurable: true
    });
    PardotClient.prototype.getAccessToken = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.oauthClient.getToken({ code: code, redirect_uri: this.redirectUri })];
                    case 1:
                        _a.accessToken = _b.sent();
                        // simple-oauth2 defines AccessToken['token'] as { [x: string]: any; }
                        // assume that Pardot will return a response containing the expected fields
                        return [2 /*return*/, this.token.token];
                }
            });
        });
    };
    PardotClient.prototype.convertRequestValues = function (data, isQueryParams) {
        // When creating or updating objects, false is stored as true,
        // presumably because the API is treating the value as a string rather than a boolean
        // As a workaround, pass booleans as 1 or 0 instead
        return Object.entries(data).reduce(function (acc, _a) {
            var _b;
            var key = _a[0], value = _a[1];
            var updatedValue;
            if (typeof value === 'boolean') {
                updatedValue = isQueryParams ? value : +value;
            }
            else if (isQueryParams && Array.isArray(value)) {
                updatedValue = value.join(',');
            }
            else {
                updatedValue = value;
            }
            return __assign(__assign({}, acc), (_b = {}, _b[key] = updatedValue, _b));
        }, {});
    };
    Object.defineProperty(PardotClient.prototype, "axios", {
        get: function () {
            var _this = this;
            if (!this.axiosInstance) {
                if (!this.accessToken) {
                    throw new Error('Cannot instantiate axios without token');
                }
                this.axiosInstance = axios_1.default.create();
                this.axiosInstance.interceptors.request.use(function (config) {
                    var data = config.data, params = config.params;
                    if (data && typeof data === 'object') {
                        data = qs_1.stringify(_this.convertRequestValues(data, false));
                    }
                    if (params && typeof params === 'object') {
                        params = _this.convertRequestValues(params, true);
                    }
                    return __assign(__assign({}, config), { data: data, headers: __assign({ Authorization: "Bearer " + _this.token.token.access_token, 'Pardot-Business-Unit-Id': _this.businessUnitId }, config.headers), params: __assign({ format: 'json' }, params) });
                });
                axios_auth_refresh_1.default(this.axiosInstance, function (failedRequest) { return __awaiter(_this, void 0, void 0, function () {
                    var newToken;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, this.token.refresh()];
                            case 1:
                                newToken = _b.sent();
                                this.accessToken = this.oauthClient.createToken(__assign({ refresh_token: this.token.token.refresh_token }, newToken.token));
                                return [4 /*yield*/, ((_a = this.refreshCallback) === null || _a === void 0 ? void 0 : _a.call(this, this.token.token))];
                            case 2:
                                _b.sent();
                                failedRequest.config.headers['Authorization'] = "Bearer " + this.token.token.access_token;
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            return this.axiosInstance;
        },
        enumerable: false,
        configurable: true
    });
    PardotClient.prototype.getApiUrl = function (object, pathParts) {
        return (this.baseUrl + "/api/" + object + "/version/" + this.apiVersion + "/do/" +
            pathParts.map(encodeURIComponent).join('/'));
    };
    return PardotClient;
}());
exports.default = PardotClient;
