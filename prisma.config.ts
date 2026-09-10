import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: "postgresql://postgres:Yaritza15%2A@localhost:5432/autofix_express?schema=public",
  },
});