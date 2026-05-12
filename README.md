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

`data/continents-countries.json`은 5대륙 모델에 따른 국가 분류 DB입니다.

- 대륙: 아시아, 유럽, 아프리카, 아메리카, 오세아니아
- 범위: UN 회원국 193개국 + UN 총회 옵서버 2개국
- 제외: 남극, 속령, 해외 영토, 준주
- 기준: UN M49 대륙권역, ISO 3166 국가 코드, UN 회원국/옵서버 목록

## 실행

이 프로젝트 폴더에서:

```bash
python -m http.server 8000
```

브라우저:

```text
http://127.0.0.1:8000/
```
