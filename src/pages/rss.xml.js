import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE, url } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// 구독 파일의 대표 주소도 하위 경로(/dev-blog/)까지 포함해야 합니다.
		site: new URL(url("/"), context.site),
		items: posts.map((post) => ({
			...post.data,
			link: url(`/blog/${post.id}/`),
		})),
	});
}
