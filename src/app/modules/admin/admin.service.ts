import { PrismaClient } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant.js";

type SearchQuery = {
  searchableFields: Record<string, unknown>;
  paginationQuery: Record<string, unknown>;
};

const prisma = new PrismaClient();

const getAllAdminsFromDB = async ({
  searchableFields,
  paginationQuery,
}: SearchQuery) => {
  const { searchTerm, ...restParams } = searchableFields;
  const page = Number(paginationQuery.page) || 1;
  const limit = Number(paginationQuery.limit) || 10;

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
      skip: (page - 1) * limit,
      take: limit,
    });
    return result;
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};

export const adminService = {
  getAllAdminsFromDB,
};
