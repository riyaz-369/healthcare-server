import { adminSearchableFields } from "./admin.constant.js";
import { calculatePagination } from "../../../utils/paginationHelper.js";
import prisma from "../../../utils/prisma.js";

type SearchQuery = {
  searchableFields: Record<string, unknown>;
  options: Record<string, any>;
};

const getAllAdminsFromDB = async ({
  searchableFields,
  options,
}: SearchQuery) => {
  const { searchTerm, ...restParams } = searchableFields;
  const { take, skip, orderBy, page } = calculatePagination(options);

  const andConditions = [];

  if (searchableFields.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: searchableFields.searchTerm as string,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(restParams).length > 0) {
    andConditions.push({
      AND: Object.keys(restParams).map((key) => ({
        [key]: {
          equals: restParams[key],
          mode: "insensitive",
        },
      })),
    });
  }

  //   console.dir(andConditions, { depth: "infinite" });

  const whereConditions: Record<string, unknown> = {
    AND: andConditions,
  };

  //   console.dir(whereConditions, { depth: "infinite" });

  try {
    const result = await prisma.admin.findMany({
      where: whereConditions,
      skip,
      take,
      orderBy,
    });

    const total = await prisma.admin.count({
      where: whereConditions,
    });

    return {
      meta: {
        page,
        limit: skip,
        total,
      },
      data: result,
    };
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};

export const adminService = {
  getAllAdminsFromDB,
};
