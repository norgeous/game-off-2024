export default {
  registerType: 'prompt',
  injectRegister: false,

  pwaAssets: {
    disabled: false,
    config: true,
  },

  manifest: {
    name: '[SECRETS]',
    short_name: '[SECRETS]',
    description: 'Game Off 2024',
    theme_color: '#000000',
    background_color: '#000000',
    display: 'fullscreen',
    orientation: 'landscape',
  },

  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },

  devOptions: {
    enabled: false,
    navigateFallback: 'index.html',
    suppressWarnings: true,
    type: 'module',
  },
};
