#!/bin/bash

# 사용자에게 커밋 메시지 입력 요청
read -p "Enter commit message: " commit_message

# 기본 메시지 설정 (사용자가 입력하지 않았을 경우)
if [ -z "$commit_message" ]; then
    commit_message="Auto commit - $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Git 명령어 실행
git add .
git commit -m "$commit_message"
git push origin main

echo "✅ Successfully committed and pushed to GitHub!"
