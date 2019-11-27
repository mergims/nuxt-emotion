import createCache from '@emotion/cache'
import { resolve } from 'path'
import createEmotionServer from 'create-emotion-server'
export const emotionCache = Object.assign(createCache(), { compat: true })
const { extractCritical } = createEmotionServer(emotionCache)

export { styled } from './styled'
// export { createGlobalStyle } from './global'

export default function () {
    this.nuxt.hook('build:before', () => {
        if (this.options.mode !== 'spa') {
            this.addPlugin({
                src: resolve(__dirname, 'vue-emotion.plugin.js'),
                fileName: 'vue-emotion.js',
                ssr: true
            })
        }
    })

    this.nuxt.hook('vue-renderer:ssr:templateParams', (params) => {
        const { ids, css } = extractCritical(params.APP)
        console.log('ids', ids);
        console.log('css', css);
        params.HEAD += `<style>${css}</style>`
        params.HEAD += `<script>window.$emotionSSRIds = ${JSON.stringify(ids)}</script>`
    })
}