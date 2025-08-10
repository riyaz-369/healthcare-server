import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminsFromDB = async (params: Record<string, unknown>) => {
  const { searchTerm, ...restParams } = params;

  const andConditions = [];
  const adminSearchableFields = ["name", "email"];

  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm as string,
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
    });
    return result;
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};

export const adminService = {
  getAllAdminsFromDB,
};
