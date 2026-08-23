// @ts-check

import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://strongsiganl.github.io',
	// 저장소 이름이 곧 하위 경로가 됩니다(strongsiganl.github.io/dev-blog/).
	// 나중에 자기 도메인을 붙이면 이 base 줄만 지우면 링크가 전부 뿌리 주소로 돌아옵니다.
	base: '/dev-blog',
	integrations: [mdx(), sitemap()],
	// Sätteri(기본 프로세서)는 서명 없는 네이티브 .node를 로드해
	// Windows Smart App Control에 차단된다. 순수 JS인 unified로 되돌림.
	markdown: {
		processor: unified(),
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
