# COADS Case Study SVG Assets

밝은 사례연구 상세 페이지 시안에 맞춘 SVG 에셋 세트입니다. 모든 파일은 벡터이므로 Figma로 가져오거나 웹에서 바로 사용할 수 있습니다.

## 파일 구성

### 부엉이

- `owl/owl-layered.svg` — 애니메이션용 통합 SVG. 그룹 ID가 포함돼 있습니다.
- `owl/poses/owl-magnifier.svg` — 검색·원문 확인 장면용 완성 포즈.
- `owl/poses/owl-clipboard.svg` — 작업 단계·기록 장면용 완성 포즈.
- `owl/layers/owl-base.svg`
- `owl/layers/owl-eyes.svg`
- `owl/layers/owl-wing-left.svg`
- `owl/layers/owl-wing-right.svg`
- `owl/layers/owl-magnifier.svg`
- `owl/layers/owl-clipboard.svg`

레이어 파일은 모두 `viewBox="0 0 512 512"` 기준이므로 같은 위치에 겹치면 정렬됩니다.

### 연결선

- `connectors/search-branch.svg` — 최초 글에서 여러 채널로 갈라지는 선.
- `connectors/process-path.svg` — 네 개 작업 단계를 잇는 곡선.
- `connectors/curved-arrow.svg` — 짧은 주석·비교용 곡선 화살표.
- `connectors/coral-underline.svg` — 추가되거나 바뀐 표현 강조용 밑줄.

## 웹 사용

완성 포즈는 일반 이미지처럼 사용할 수 있습니다.

```html
<img src="/assets/coads/owl/poses/owl-magnifier.svg" alt="게시물을 확인하는 COADS 부엉이" />
```

부위별 애니메이션은 `owl-layered.svg`를 React 컴포넌트 또는 인라인 SVG로 가져와 그룹 ID를 선택합니다.

```js
gsap.to("#owl-pupil-left, #owl-pupil-right", {
  x: 7,
  y: 3,
  duration: 0.45,
  ease: "power2.out"
});

gsap.to("#owl-magnifier", {
  rotation: 6,
  transformOrigin: "288px 293px",
  yoyo: true,
  repeat: -1,
  duration: 1.2,
  ease: "sine.inOut"
});
```

연결선은 인라인 SVG로 넣고 `stroke-dashoffset`을 애니메이션합니다.

```css
.flow-path {
  stroke-dasharray: 1800;
  stroke-dashoffset: 1800;
}
```

```js
gsap.to(".flow-path", {
  strokeDashoffset: 0,
  duration: 1.15,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".case-process",
    start: "top 65%"
  }
});
```

## Figma 사용

SVG 파일을 Figma 캔버스로 드래그하면 벡터 레이어로 들어옵니다. 부위별 편집이 필요하면 `owl-layered.svg`를 가져온 뒤 그룹 해제하거나 `layers` 폴더의 파일을 각각 가져오세요.

## 디자인 토큰

- Cobalt: `#245BFF`
- Butter yellow: `#FFE36E`
- Warm ivory: `#FFF9E8`
- Pale sky: `#EAF2FF`
- Coral: `#FF796D`
- Ink: `#151515`

## 미리보기

`demo/index.html`을 브라우저에서 열면 포즈와 연결선의 기본 동작을 확인할 수 있습니다.
