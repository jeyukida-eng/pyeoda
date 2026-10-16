# 은하 방어선 Android 등록 준비판

상태: 네이티브 Android 프로젝트 + 스토어 소개/개인정보 초안.
공개 Play 등록 완료본이 아닙니다. 개인정보 문의 연락처, 서버 보유기간 및 삭제 절차,
업로드용 서명, 기기 테스트 및 Play Console 심사가 아직 필요합니다.

## 앱 구성
- com.pyoda.galaxydefense (정식 패키지 후보), 디버그판은 .preview 추가
- Java 17 / Android Gradle Plugin 8.13.2 / Gradle 8.13
- Android 16 API 36 target/compile, 최소 Android 8 API 26
- 최종 1.2.2 게임 파일(우주방어전·별자리 잇기·별빛대작전)을 앱에 포함하여 기본 플레이는 오프라인 가능
- 온라인 순위는 기본 꺼짐, 이용자가 전송 안내를 확인하면 활성화
- 기존 캐릭터 아이콘 사용, 카메라/위치/연락처 권한 없음
- WebViewAssetLoader의 HTTPS 가상 주소로 로컬 파일 제공
- 앱 전환 시 일시정지, Android 뒤로가기 및 화면 여백 처리

## 빌드
Android Studio에서 android 폴더를 열고 SDK 36을 설치합니다.
Gradle 8.13 설치 환경에서는:

    gradle :app:assembleDebug :app:bundleRelease :app:lintDebug

디버그 APK: app/build/outputs/apk/debug/
AAB: app/build/outputs/bundle/release/
서명 설정을 하지 않은 release AAB는 서명 전 파일입니다. 그대로 Play에 제출할 수 없습니다.

업로드용 키는 Android Studio > Build > Generate Signed App Bundle/APK에서
사용자 소유로 생성·보관하세요. 키/비밀번호를 코드 저장소에 넣지 마세요.
아래 환경변수 네 개가 설정된 경우만 release 서명이 활성화됩니다:
PYODA_UPLOAD_STORE, PYODA_UPLOAD_STORE_PASSWORD, PYODA_UPLOAD_KEY_ALIAS, PYODA_UPLOAD_KEY_PASSWORD.

## 최초 등록 순서 (2026-10-15 공식 문서 확인)
1. Play Console 개발자 계정 생성, 개인/조직 유형 선택, 본인확인 및 25 USD 1회 결제.
2. 신규 개인 계정은 Play Console 모바일 앱으로 실제 Android 기기 보유 확인.
3. 앱 만들기: 은하 방어선 / 한국어 / 게임 / 가격과 배포 국가 설정.
4. 개인정보 문의 이메일 확정, 공개 개인정보처리방침과 삭제 요청 경로 마련.
5. 서명된 AAB 준비. 아이콘·배너·실제 휴대폰 스크린샷과 스토어 소개 입력.
6. 앱 콘텐츠·데이터 안전·콘텐츠 등급·대상 연령 답변.
7. 내부 테스트로 설치/플레이/뒤로가기/앱 전환/오프라인/기록·랭킹 확인.
8. 신규 개인 계정은 최소 12명 테스터가 14일 연속 참여하는 비공개 테스트.
9. 테스트 결과를 바탕으로 프로덕션 권한 신청 후 심사·공개 출시.

12명·14일 조건 충족만으로 공개 승인이 자동 보장되는 것은 아닙니다.
현재 환경에는 Android SDK가 없어 로컬 기기 빌드·실행은 검증하지 못했습니다.
GitHub Actions에서 빌드 결과를 별도로 확인해야 합니다.

## 공식 참고
- https://support.google.com/googleplay/android-developer/answer/6112435
- https://support.google.com/googleplay/android-developer/answer/14151465
- https://support.google.com/googleplay/android-developer/answer/11926878
- https://support.google.com/googleplay/android-developer/answer/10787469
- https://developer.android.com/build/releases/agp-8-13-0-release-notes
- https://developer.android.com/develop/ui/views/layout/webapps/load-local-content
