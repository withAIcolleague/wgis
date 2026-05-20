# WGIS

World Geometry Information System.

기존 `khistory` 연도별 타임라인 앱과 분리한 독립 프로젝트입니다.

## 핵심 컨셉

과거의 지명, 사건, 유물·유적을 검색하면 해당 대상이 오늘날 어느 지역명과 좌표에 대응되는지 보여주는 세계사 지리지형 정보 시스템입니다.

지도는 기본적으로 Esri World Imagery 위성지도를 사용하고, 현재 지명·경계 라벨을 위성지도 위에 겹쳐 표시합니다.

## 데이터 구조

`data/entries.json`의 각 항목은 아래 축을 기준으로 작성합니다.

- `title`: 사용자가 볼 대표 명칭
- `type`: `place`, `event`, `artifact`
- `historicalName`: 과거 명칭
- `modernName`: 현재 지명
- `modernAdmin`: 현재 행정구역
- `country`: 현재 국가
- `worldRegion`: 한국사, 중국사, 일본사, 유럽사 등
- `period`: 역사 시대나 문명권
- `yearLabel`: 검색 보조용 시대 표기
- `coordinates`: 현재 지도에 표시할 좌표
- `aliases`: 검색 별칭
- `summary`: 짧은 설명
- `confidence`: `high`, `medium`, `approximate`
- `sourceNote`: 위치 대응 기준
- `sources`: 선택 항목. 출처 제목과 URL 목록
- `curationBatch`: 선택 항목. 집중 수집 단위 ID

`data/continents-countries.json`은 5대륙 모델에 따른 국가 분류 DB입니다.

- 대륙: 아시아, 유럽, 아프리카, 아메리카, 오세아니아
- 범위: UN 회원국 193개국 + UN 총회 옵서버 2개국
- 제외: 남극, 속령, 해외 영토, 준주
- 기준: UN M49 대륙권역, ISO 3166 국가 코드, UN 회원국/옵서버 목록

`data/curation-batches.json`은 DB를 한 번에 대량으로 섞어 넣지 않기 위한 수집 단위 기록입니다.
각 배치는 하나의 국가, 문화권, 또는 연구 주제에 집중해서 `data/entries.json`에 추가합니다.

`data/taxonomy.json`은 공간, 시간, 문화권, 유형 축을 분리한 분류 기준입니다.
현대 국가와 대륙은 지도 검색용 색인으로 두고, 원천 데이터의 주 분류는 역사 지역, 문화권, 시대, 주제 배치로 관리합니다.

`data/records/` 아래 파일은 원천 DB입니다.
예를 들어 `data/records/africa/ethiopia/human-origins.json`은 에티오피아 인류 기원 배치의 원천 레코드이고, `data/entries.json`은 앱이 읽기 위한 통합 표시용 파일입니다.

`data/PROJECT_STATE.md`는 긴 프로젝트를 여러 context에 걸쳐 이어가기 위한 상태 문서입니다.
새 세션을 시작할 때 이 파일을 먼저 읽고, 배치 완료 후에는 진행 상태와 다음 후보를 갱신합니다.

데이터 검증은 아래 명령으로 실행합니다.

```bash
node scripts/validate-data.js
```

또는 npm 스크립트로 실행할 수 있습니다.

```bash
npm run validate
```

Windows PowerShell 실행 정책으로 `npm.ps1`이 막히는 환경에서는 아래처럼 실행합니다.

```bash
npm.cmd run validate
```

## 실행

이 프로젝트 폴더에서:

```bash
python -m http.server 8000
```

브라우저:

```text
http://127.0.0.1:8000/
```
