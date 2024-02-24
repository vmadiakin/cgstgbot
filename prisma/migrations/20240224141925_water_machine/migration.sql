-- AlterTable
ALTER TABLE "User" ADD COLUMN     "water_machine_id" INTEGER;

-- CreateTable
CREATE TABLE "WaterMachine" (
    "id" SERIAL NOT NULL,
    "model" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "WaterMachine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_water_machine_id_fkey" FOREIGN KEY ("water_machine_id") REFERENCES "WaterMachine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
