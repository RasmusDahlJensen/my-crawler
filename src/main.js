import { CheerioCrawler } from "crawlee";
import { URL } from "node:url";

const crawler = new CheerioCrawler({
	maxRequestsPerCrawl: 20,
	async requestHandler({ request, $ }) {
		const title = $("title").text();
		console.log(`The title of "${request.url}" is: ${title}.`);

		const links = $("a[href]")
			.map((_, el) => $(el).attr("href"))
			.get();

		const absoluteUrls = links.map(
			(link) => new URL(link, request.loadedUrl).href
		);

		await crawler.addRequests(absoluteUrls);
	},
});

await crawler.run([
	"https://www.jobindex.dk/jobsoegning/it/systemudvikling/danmark",
]);
