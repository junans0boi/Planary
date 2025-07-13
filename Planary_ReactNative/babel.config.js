module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // (다른 바벨 플러그인들)
    'react-native-reanimated/plugin',     // ← 무조건 배열 마지막!
  ],
};