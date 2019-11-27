import Vue from 'vue'
import { VueEmotion } from '@egoist/vue-emotion'
import { hydrate } from 'emotion'
import createCache from '@emotion/cache'
import { emotionCache } from './';

const VueEmotionPlugin = (context, inject) => {
    Vue.mixin({
        beforeCreate () {
            this.$emotionCache = emotionCache
        }
    })
    inject('$emotionCache', emotionCache)
}

export default VueEmotionPlugin

// if (process.client) {
//   const ids = window.$emotionSSRIds

//   if (ids) {
//     hydrate(ids)
//   }
// }
