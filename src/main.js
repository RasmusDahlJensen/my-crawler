import { CheerioCrawler } from "crawlee";

const crawler = new CheerioCrawler({
	maxRequestsPerCrawl: 20,
	async requestHandler({ request, $ }) {
		const jobPostings = [];

		$(".jobsearch-result").each((_, element) => {
			const company = $(element)
				.find(".jix-toolbar-top__company a")
				.text()
				.trim();
			const title = $(element).find("h4 a").text().trim();
			const link = new URL(
				$(element).find("h4 a").attr("href"),
				request.loadedUrl
			).href;
			const description = $(element).find(".PaidJob-inner > p").text().trim();

			jobPostings.push({
				company,
				title,
				link,
				description,
			});
		});

		// Console job information
		jobPostings.forEach((job) => {
			console.log(`Company: ${job.company}`);
			console.log(`Job Title: ${job.title}`);
			console.log(`Job Link: ${job.link}`);
			console.log(`Description: ${job.description}`);
		});
	},
});

await crawler.run([
	"https://www.jobindex.dk/jobsoegning/it/systemudvikling/danmark",
]);
