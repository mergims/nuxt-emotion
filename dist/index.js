"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cache_1 = __importDefault(require("@emotion/cache"));
var path_1 = require("path");
var create_emotion_server_1 = __importDefault(require("create-emotion-server"));
exports.emotionCache = Object.assign(cache_1.default(), { compat: true });
var extractCritical = create_emotion_server_1.default(exports.emotionCache).extractCritical;
var styled_1 = require("./styled");
exports.styled = styled_1.styled;
// export { createGlobalStyle } from './global'
function default_1() {
    var _this = this;
    this.nuxt.hook('build:before', function () {
        if (_this.options.mode !== 'spa') {
            _this.addPlugin({
                src: path_1.resolve(__dirname, 'vue-emotion.plugin.js'),
                fileName: 'vue-emotion.js',
                ssr: true
            });
        }
    });
    this.nuxt.hook('vue-renderer:ssr:templateParams', function (params) {
        var _a = extractCritical(params.APP), ids = _a.ids, css = _a.css;
        console.log('ids', ids);
        console.log('css', css);
        params.HEAD += "<style>" + css + "</style>";
        params.HEAD += "<script>window.$emotionSSRIds = " + JSON.stringify(ids) + "</script>";
    });
}
exports.default = default_1;
