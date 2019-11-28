import { resolve } from 'path';
import createCache from '@emotion/cache';
import createEmotionServer from 'create-emotion-server';
export var emotionCache = Object.assign(createCache(), { compat: true });
var extractCritical = createEmotionServer(emotionCache).extractCritical;
export { styled } from './styled';
export default function () {
    var _this = this;
    this.nuxt.hook('build:before', function () {
        if (_this.options.mode !== 'spa') {
            _this.addPlugin({
                src: resolve(__dirname, 'vue-emotion.plugin.js'),
                ssr: true
            });
        }
    });
    this.nuxt.hook('vue-renderer:ssr:templateParams', function (params) {
        var _a = extractCritical(params.APP), ids = _a.ids, css = _a.css;
        params.HEAD += "<style>" + css + "</style>";
        params.HEAD += "<script>window.$emotionSSRIds = " + JSON.stringify(ids) + "</script>";
    });
}
