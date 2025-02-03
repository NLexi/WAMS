const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  let engineering = await prisma.department.findUnique({
    where: { name: "Engineering" },
  });
  if (!engineering) {
    engineering = await prisma.department.create({
      data: {
        name: "Engineering",
        permissions: JSON.stringify({
          dashboard: ["GET", "POST"],
          settings: ["GET"],
          blog: ["GET", "POST"],
        }),
      },
    });
  }

  let HR = await prisma.department.findUnique({
    where: { name: "HR" },
  });
  if (!HR) {
    HR = await prisma.department.create({
      data: {
        name: "HR",
        permissions: JSON.stringify({
          "dashboard": ["GET", "POST", "PUT"],
          settings: ["GET"],
          blog: ["GET", "POST", "PUT"],
        }),
      },
    });
  }

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      name: "admin",
    },
  });

  await prisma.user.create({
    data: {
      email: "manager@example.com",
      password: hashedPassword,
      role: "MANAGER",
      departmentId: HR.id,
      name: "managerial",
    },
  });

  await prisma.user.create({
    data: {
      email: "user@example.com",
      password: hashedPassword,
      role: "USER",
      departmentId: engineering.id,
      name: "username",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());