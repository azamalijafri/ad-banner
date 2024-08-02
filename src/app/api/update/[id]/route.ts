import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description, action, image, template } = await req.json();

    console.log(`Current working directory: ${process.cwd()}`);
    console.log(`Data file path: ${dataFilePath}`);

    if (!fs.existsSync(dataFilePath)) {
      throw new Error("Data file does not exist.");
    }

    const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

    const updatedData = data.map((item: any) =>
      item.id === parseInt(id)
        ? { ...item, title, description, action, image, template }
        : item
    );

    fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

    return NextResponse.json({ message: "Banner updated successfully" });
  } catch (error) {
    console.error("Error saving banner:", error);
    return NextResponse.error();
  }
}
