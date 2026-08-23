// 사이트 이름과 소개 문구는 여기 두 줄만 고치면 사이트 전체에 반영됩니다.
// (제목 표시줄, 목록, 구독 파일, 검색결과 미리보기까지 전부 여기를 봅니다)

export const SITE_TITLE = 'AI 삽질 일지';
export const SITE_DESCRIPTION =
	'AI로 이것저것 만들어 보다 막힌 자리를 그대로 적어 둡니다. 성공담보다 에러 메시지가 많습니다.';

/** 바닥글 저작권 표시에 쓰는 이름 */
export const AUTHOR = '쿤신';

/**
 * 사이트가 하위 경로에 얹혀 있어도(지금은 /dev-blog/) 링크가 깨지지 않게
 * 앞에 기본 경로를 붙여 줍니다. 내부 링크는 전부 이 함수를 거칩니다.
 * 자기 도메인을 붙여 뿌리 주소로 옮기면 astro.config.mjs의 base만 지우면 됩니다.
 */
export function url(path = '/') {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	return base + (path.startsWith('/') ? path : `/${path}`);
}
