import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const isDevelopment = process.env.NODE_ENV === "development";
const dataFilePath = isDevelopment
  ? path.join(process.cwd(), "data.json")
  : path.join("/tmp", "data.json");

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, description, action, image, template } = await req.json();

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
