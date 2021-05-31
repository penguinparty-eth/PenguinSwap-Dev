import { skipWaiting, clientsClaim } from "workbox-core"
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute, Route } from 'workbox-routing';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheFirst } from 'workbox-strategies';
skipWaiting()
clientsClaim()

const CACHE_PREFIX = 'workbox-penguinswap'
//const CACHE_OFFLINE_NAME = `${CACHE_PREFIX}-offline`
const CACHE_SCRIPT_NAME = `${CACHE_PREFIX}-scripts`
const CACHE_STYLES_NAME = `${CACHE_PREFIX}-styles`
const CACHE_DOCUMENTS_NAME = `${CACHE_PREFIX}-documents`
const CACHE_FONTS_NAME = `${CACHE_PREFIX}-fonts`
const CACHE_IMAGES_NAME = `${CACHE_PREFIX}-images`

/*
const OFFLINE_PAGE_URL = '/offline.html'
const OFFLINE_PAGE_NO_NETWORK_IMAGE_URL = '/assets/images/no-wifi.png'
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST)
self.addEventListener('install', (event: ExtendableEvent) => {
    /*
    const offlineUrls = [
      OFFLINE_PAGE_URL,
      OFFLINE_PAGE_NO_NETWORK_IMAGE_URL
    ];
    */
    event.waitUntil(
      Promise.all([
        caches.delete(CACHE_DOCUMENTS_NAME),
        caches.delete(CACHE_SCRIPT_NAME),
        caches.delete(CACHE_STYLES_NAME),
        caches.delete(CACHE_FONTS_NAME),
        caches.delete(CACHE_IMAGES_NAME),
        //caches.open(CACHE_OFFLINE_NAME).then((cache) => cache.addAll(offlineUrls))
      ])
    );
  })

const stylesScriptsExpirationPlugin = new ExpirationPlugin({
  maxEntries: 10,
  maxAgeSeconds: 15 * 24 * 60 * 60,
  purgeOnQuotaError: true
})
const fontsExpirationPlugin = new ExpirationPlugin({ maxEntries: 5, maxAgeSeconds: 180 * 24 * 60 * 60 })
const imagesExpirationPlugin = new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 })
const documentExpirationPlugin = new ExpirationPlugin({
  maxEntries: 50,
  maxAgeSeconds: 60 * 24 * 60 * 60,
  purgeOnQuotaError: true
})

//...other code...

const registerCacheFirstRouteUsing = (
  destination: RequestDestination,
  cacheName: string,
  expirationPlugin: ExpirationPlugin
): Route => registerRoute(
  ({ request }) => request.destination === destination,
  new CacheFirst({
    cacheName: cacheName,
    plugins: [expirationPlugin],
  })
)

registerCacheFirstRouteUsing('style', CACHE_STYLES_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('script', CACHE_SCRIPT_NAME, stylesScriptsExpirationPlugin)
registerCacheFirstRouteUsing('document', CACHE_DOCUMENTS_NAME, documentExpirationPlugin)
registerCacheFirstRouteUsing('font', CACHE_FONTS_NAME, fontsExpirationPlugin)
registerCacheFirstRouteUsing('image', CACHE_IMAGES_NAME, imagesExpirationPlugin)

