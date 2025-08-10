export const calculatePagination = (options: {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  };
};
