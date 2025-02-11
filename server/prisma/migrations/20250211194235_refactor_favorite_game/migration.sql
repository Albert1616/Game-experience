/*
  Warnings:

  - You are about to drop the column `image` on the `FavoriteGame` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `FavoriteGame` table. All the data in the column will be lost.
  - Added the required column `background_image` to the `FavoriteGame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FavoriteGame` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteGame" DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "background_image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
