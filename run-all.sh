#!/usr/bin/env bash
# run-all.sh

# ——— 설정: 자신의 경로로 수정하세요 ———
BACKEND_DIR="$HOME/Documents/GitHub/Todo-List/Planary_Backend"
FRONTEND_DIR="$HOME/Documents/GitHub/Todo-List/Planary_ReactNative"

# ——— 백엔드 실행 ———
echo "🔧 Starting Spring Boot (backend)..."
(
  cd "$BACKEND_DIR" \
  && echo "→ $BACKEND_DIR" \
  && ./gradlew bootRun
) &

# ——— 프론트엔드 실행 ———
echo "🔧 Starting Expo (React Native web)..."
(
  cd "$FRONTEND_DIR" \
  && echo "→ $FRONTEND_DIR" \
  && npx expo start --web
)

# 백그라운드로 띄운 gradlew 프로세스가 죽지 않도록
wait