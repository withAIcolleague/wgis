# WGIS 데이터 작성 가이드

이 문서는 WGIS DB를 생성하거나 확장하는 AI agent가 따라야 하는 기본 양식과 작업 절차를 정의한다. WGIS 데이터 작업은 항상 `source record first` 원칙을 따른다.

## AI Agent 진입 파일

이 가이드가 DB 작성 규칙의 기준 문서다. 각 에이전트별 파일은 이 문서로 연결하는 얇은 어댑터로만 유지한다.

- `AGENTS.md`: Codex, OpenAI 계열, 범용 agent용 공통 진입점.
- `CLAUDE.md`: Claude Code용 진입점.
- `GEMINI.md`: Gemini CLI 및 Gemini 계열 agent용 진입점.
- `.github/copilot-instructions.md`: GitHub Copilot 및 VS Code Copilot용 저장소 공통 지침.
- `.github/instructions/wgis-data.instructions.md`: Copilot의 data 경로 전용 지침.
- `.cursor/rules/wgis-data-authoring.mdc`: Cursor용 data 작성 rule.
- `.windsurf/rules/wgis-data-authoring.md`: Windsurf Cascade용 workspace rule.
- `.windsurfrules`: Windsurf 구버전 호환용 rule.
- `.agent/rules/wgis-data-authoring.md`: 기타 오픈 소스 agent가 참조할 수 있는 범용 fallback.

규칙이 충돌하면 `AGENTS.md`와 이 문서를 우선한다.

## 핵심 원칙

- 한 번에 하나의 집중 배치만 작업한다.
- 배치 단위는 하나의 국가, 문화권, 시대, 교역권, 제국, 사건군, 연구 주제 중 하나로 좁힌다.
- 권장 배치 크기는 8-15개 항목이다.
- 먼저 `data/records/.../*.json` source record를 만들고, 그다음 `data/entries.json` 앱 표시 인덱스에 반영한다.
- 모든 source record는 `data/curation-batches.json`의 batch와 연결되어야 한다.
- 배치 완료 후 `data/PROJECT_STATE.md`를 갱신한다.
- 마지막에는 반드시 `node scripts/validate-data.js`를 통과시킨다.

## 작업 순서

1. `data/PROJECT_STATE.md`를 읽고 다음 후보 배치를 확인한다.
2. `git status -sb`로 워크트리 상태를 확인한다.
3. 후보 항목 ID가 이미 `data/entries.json` 또는 `data/records/**.json`에 있는지 확인한다.
4. source record 파일을 만든다.
5. source record의 앱 표시 필드만 `data/entries.json`에 추가하거나, 기존 항목이면 정확히 같은 값으로 업그레이드한다.
6. `data/curation-batches.json`에 batch 메타데이터를 추가한다.
7. `data/PROJECT_STATE.md`의 현재 상태, 완료 목록, 다음 후보를 갱신한다.
8. `node scripts/validate-data.js`를 실행한다.
9. 검증 통과 후 커밋하고 push한다.

## 파일 역할

### `data/records/.../*.json`

원천 큐레이션 파일이다. 확장 필드와 출처, 분류, 날짜, 공간 색인을 포함한다.

경로 예시:

```text
data/records/asia/east-asia/early-modern-ports-treaty-cities.json
data/records/atlantic/modern/revolutions-independence-capitals.json
data/records/global/modern/imperial-chokepoints-canal-port-cities.json
```

### `data/entries.json`

앱이 직접 읽는 표시 인덱스다. source record의 기본 표시 필드와 `aliases`, `sources`, `curationBatch`가 정확히 일치해야 한다.

### `data/curation-batches.json`

각 source record 파일을 하나의 검증 가능한 batch로 등록한다.

### `data/PROJECT_STATE.md`

다른 agent가 이어받기 위한 상태 문서다. 배치 완료 후 반드시 갱신한다.

## Source Record 파일 기본 양식

```json
{
  "schemaVersion": 1,
  "id": "batch-topic-id",
  "titleKo": "배치 제목",
  "curationBatch": "batch-topic-id-v1",
  "taxonomyFile": "data/taxonomy.json",
  "appIndexFile": "data/entries.json",
  "scope": {
    "continentId": "asia",
    "modernCountryIso2": "KR-JP-CN",
    "modernCountryKo": "대한민국·일본·중국",
    "historicalRegionKo": "역사 지역 설명",
    "cultureAreaKo": "문화권·정치권·교역권 설명",
    "periodBand": "early-modern",
    "topicKo": "배치 주제"
  },
  "records": [
    {
      "id": "entry-id",
      "title": "표시 제목",
      "type": "place",
      "historicalName": "과거 명칭",
      "modernName": "현재 지명 또는 유적명",
      "modernAdmin": "현재 행정구역",
      "country": "현재 국가",
      "worldRegion": "세부 역사·지리 권역",
      "period": "시대 또는 정치체",
      "yearLabel": "지도와 리스트에 표시할 짧은 연대 설명",
      "date": { "startYear": 1500, "endYear": 1800, "precision": "approximate" },
      "spatial": {
        "continentId": "asia",
        "modernCountryIso2": "KR",
        "historicalRegionKo": "세부 역사 지역",
        "cultureAreaKo": "세부 문화권 또는 주제권"
      },
      "classification": { "periodBand": "early-modern", "selectionTier": "core" },
      "coordinates": { "lat": 37.5665, "lng": 126.9780 },
      "aliases": ["Latin name", "Alternative name", "Local name"],
      "summary": "지도 팝업과 상세 패널에 표시할 독립 작성 한국어 요약문.",
      "confidence": "high",
      "sourceNote": "좌표와 위치 판단 기준.",
      "curationBatch": "batch-topic-id-v1",
      "sources": [
        { "title": "Source title", "url": "https://example.com/source" }
      ]
    }
  ]
}
```

## Record 필드 규칙

필수 기본 필드는 `data/taxonomy.json`의 `recordShape.requiredLegacyFields`와 일치한다.

- `id`: 영어 kebab-case. 전역 중복 금지.
- `title`: 한국어 표시 제목.
- `type`: 앱 표시 안정성을 위해 현재는 `place`, `site`, `event`, `artifact`를 우선 사용한다.
- `historicalName`: 과거 명칭. 여러 이름은 `/`로 구분한다.
- `modernName`: 현재 지도에서 이해 가능한 지명, 유적명, 박물관명, 항구명 등.
- `modernAdmin`: 현재 행정구역.
- `country`: 현재 국가명. `data/entries.json`의 기존 한국어 국가명 스타일과 맞춘다.
- `worldRegion`: 세부 권역명. UI 필터가 아니라 검색·맥락용이다.
- `period`: 시대, 왕조, 제국, 문화권, 사건군.
- `yearLabel`: 짧은 연대 설명. 예: `1571-1585년 무굴 수도`.
- `coordinates`: WGS84 위도/경도 숫자. 추정이면 `confidence`와 `sourceNote`에 명시한다.
- `aliases`: 검색용 별칭. 영문명, 원어명, 다른 표기, 관련 키워드를 넣는다.
- `summary`: WGIS용 독립 한국어 요약. 출처 문장을 복사하지 않는다.
- `confidence`: `high`, `medium`, `approximate` 중 하나.
- `sourceNote`: 좌표 선택 기준과 불확실성을 짧게 설명한다.
- `curationBatch`: source file의 `curationBatch`와 정확히 일치해야 한다.
- `sources`: 최소 1개 이상 필수다. 2-4개 정도의 신뢰 가능한 URL을 권장한다.

확장 필드:

- `date.precision`: `exact`, `year`, `range`, `minimum`, `century`, `approximate`, `disputed`.
- `spatial.continentId`: `data/continents-countries.json`에 있는 continent id.
- `spatial.modernCountryIso2`: ISO 3166-1 alpha-2 코드. 해당 파일에 존재해야 한다.
- `classification.periodBand`: `prehistory`, `ancient`, `medieval`, `early-modern`, `modern`, `contemporary`.
- `classification.selectionTier`: `core`, `context`, `extended`.

## `data/entries.json` 반영 양식

`entries.json`에는 앱 표시 필드만 넣는다. 아래 필드는 source record와 정확히 같아야 한다.

```json
{
  "id": "entry-id",
  "title": "표시 제목",
  "type": "place",
  "historicalName": "과거 명칭",
  "modernName": "현재 지명",
  "modernAdmin": "현재 행정구역",
  "country": "현재 국가",
  "worldRegion": "세부 권역",
  "period": "시대",
  "yearLabel": "연대 설명",
  "coordinates": { "lat": 37.5665, "lng": 126.978 },
  "aliases": ["Alias 1", "Alias 2"],
  "summary": "한국어 요약문.",
  "confidence": "high",
  "sourceNote": "위치 판단 기준.",
  "curationBatch": "batch-topic-id-v1",
  "sources": [
    { "title": "Source title", "url": "https://example.com/source" }
  ]
}
```

주의:

- source record에 있는 `date`, `spatial`, `classification`은 `entries.json`에 넣지 않는다.
- 기존 항목 ID를 batch에 포함하면 source record와 `entries.json` 값이 정확히 일치해야 한다.
- 하나의 ID가 여러 source record 파일에 중복 소유되면 검증 실패한다.
- 현재 구조에서는 한 항목을 여러 batch가 동시에 소유하지 않는다.
- 모든 `entries.json` 항목은 `curationBatch`와 1개 이상의 `sources`를 가져야 한다.

## `data/curation-batches.json` 배치 양식

```json
{
  "id": "batch-topic-id-v1",
  "status": "completed",
  "completedAt": "2026-05-20",
  "continentId": "asia",
  "countryIso2": "KR-JP-CN",
  "countryKo": "대한민국·일본·중국",
  "worldRegion": "동아시아",
  "focusKo": "배치 초점",
  "scopeKo": "배치 범위 설명",
  "sourceFile": "data/records/asia/east-asia/topic-file.json",
  "appIndexFile": "data/entries.json",
  "entryIds": ["entry-id-1", "entry-id-2"],
  "sourceBasis": [
    "UNESCO World Heritage references",
    "Britannica references",
    "Official museum, city, port, archive, or academic references"
  ]
}
```

## 출처 정책

- 공식 기관, UNESCO, 박물관, 대학, 학술 프로젝트, 정부·도시·항만·문화재 기관, Britannica를 우선한다.
- World History Encyclopedia는 참고 출처로 사용할 수 있지만 bulk crawl 또는 문장 복사는 금지한다.
- 요약문은 항상 독립적으로 한국어로 작성한다.
- 좌표, 연대, 지명, 행정구역은 가능하면 서로 다른 신뢰 출처로 교차 확인한다.
- 출처 URL은 `http` 또는 `https`여야 한다.

## 배치 선정 기준

좋은 배치:

- 같은 역사 흐름으로 설명되는 8-15개 항목.
- 지도에서 위치 비교가 의미 있는 항목.
- 세계사 학습자가 검색할 가능성이 높은 핵심 장소, 사건, 유적, 유물.
- 현재 지형·항구·강·산지·도시 구조와 역사 해석이 연결되는 항목.

피해야 할 배치:

- 여러 대륙과 여러 시대를 무리하게 한 파일에 섞은 배치.
- 출처가 빈약한 항목만 모은 배치.
- 좌표를 지나치게 임의로 찍어야 하는 항목.
- 앱이 아직 지원하지 않는 복잡한 선형 경로·면적형 영역을 억지로 점 좌표 하나에 넣는 항목.

## 검증 규칙

반드시 실행한다.

```bash
node scripts/validate-data.js
```

검증 스크립트가 확인하는 주요 항목:

- JSON 파싱 가능 여부.
- `entries.json` 중복 ID.
- source record 전체 중복 ID.
- 좌표 숫자와 범위.
- `type`, `confidence`, `periodBand`, `selectionTier`, `date.precision`, `continentId`, ISO2 코드가 taxonomy와 국가 DB에 존재하는지.
- source record의 `curationBatch`가 batch 파일에 있는지.
- batch의 `sourceFile`, `entryIds`가 source record와 맞는지.
- source record와 `entries.json`의 필수 표시 필드, `aliases`, `sources`, `curationBatch`가 정확히 같은지.
- 모든 앱 항목과 source record에 `curationBatch`와 1개 이상의 `sources`가 있는지.

## PROJECT_STATE 갱신 양식

배치 완료 후 아래를 갱신한다.

- `Last updated`
- `Current entry count`
- `Completed curation batches`
- `Latest completed batch`
- `Completed` 섹션에 새 batch 추가
- `Next Batch Candidates` 갱신

완료 항목 예시:

```md
- Example batch name
  - Batch ID: `example-batch-v1`
  - Source file: `data/records/.../example.json`
  - Entries added: 8
  - Entry IDs:
    - `entry-id-1`
    - `entry-id-2`
```

## 커밋 전 체크리스트

- source record 파일이 있다.
- `entries.json`에 앱 표시 항목이 있다.
- `curation-batches.json`에 batch가 있다.
- `PROJECT_STATE.md`가 최신이다.
- `node scripts/validate-data.js`가 통과한다.
- 의도하지 않은 포맷 변경이나 unrelated diff가 없다.

## 현재 진행 지표

현재 1차 목표는 약 150-250개 고가치 항목이다. 진행률은 `data/PROJECT_STATE.md`의 `Current entry count` 기준으로 계산한다.
