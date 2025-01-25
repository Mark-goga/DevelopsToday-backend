export default function calculatePaginationData(page:number , perPage:number , count:number) {
	const totalPages = Math.ceil(count/perPage);
	const hasNextPage = page < totalPages;
	const hasPreviousPage = page !== 1;

	return {
		totalPages, hasNextPage, hasPreviousPage
	};
}
