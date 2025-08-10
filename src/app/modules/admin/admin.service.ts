import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminsFromDB = async (params: Record<string, unknown>) => {
  try {
    const result = await prisma.admin.findMany({
      where: {
        OR: [
          {
            name: {
              contains: params.searchTerm as string,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: params.searchTerm as string,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return result;
  } catch (error) {
    console.error("Error fetching admins:", error);
  }
};

export const adminService = {
  getAllAdminsFromDB,
};
