import Link from "next/link";

function Pagination({ page, total, pageSize, totalPages }) {
	return (
		<section className="container mx-auto flex justify-center items-center my-8">
			<div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-lg shadow-md">
				{page > 1 ? (
					<Link
						href={`/properties?page=${page - 1}`}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200">
						Previous
					</Link>
				) : (
					<button
						disabled
						className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
						Previous
					</button>
				)}

				<div className="flex items-center gap-2">
					<span className="px-3 py-1 text-blue-600 bg-blue-50 rounded-md font-medium">
						{page}
					</span>
					<span className="text-gray-500">of</span>
					<span className="px-3 py-1 text-gray-700">{totalPages}</span>
				</div>

				{page < totalPages ? (
					<Link
						href={`/properties?page=${page + 1}`}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-all duration-200">
						Next
					</Link>
				) : (
					<button
						disabled
						className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
						Next
					</button>
				)}
			</div>
		</section>
	);
}

export default Pagination;
