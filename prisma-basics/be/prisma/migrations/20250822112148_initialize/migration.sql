-- CreateTable
CREATE TABLE "public"."User2" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User2_username_key" ON "public"."User2"("username");
