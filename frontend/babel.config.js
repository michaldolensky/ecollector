/* eslint-env node */

module.exports = api => {
  return {
    presets: [
      [
        require.resolve('@quasar/babel-preset-app', { paths: [require.resolve('@quasar/app/package.json')] }),
        api.caller(caller => caller && caller.target === 'node')
          ? { targets: { node: 'current' } }
          : {}
      ]
    ]
  }
}

