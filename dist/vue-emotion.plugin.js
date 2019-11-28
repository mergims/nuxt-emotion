import { hydrate } from 'emotion';
if (process.client) {
    var ids = window.$emotionSSRIds;
    hydrate(ids);
}
