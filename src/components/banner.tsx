"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { EditBanner } from "./edit-banner";
import { Pencil } from "lucide-react";

interface BannerInterface {
  id: number;
  title: string;
  description: string;
  template: string;
  image: string;
  action: string;
  isEditModal?: boolean;
}

export const Banner = ({
  id,
  title,
  description,
  image,
  action,
  template,
  isEditModal,
}: BannerInterface) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [_title, setTitle] = useState(title);
  const [_description, setDescription] = useState(description);
  const [_action, setAction] = useState(action);
  const [_image, setImage] = useState(image);

  const openDialog = () => setDialogOpen(true);

  const closeDialog = () => setDialogOpen(false);

  return (
    <div className="h-full relative">
      {isEditModal && (
        <Pencil
          className="absolute right-4 top-4 text-white size-6 z-10 cursor-pointer"
          onClick={openDialog}
        />
      )}
      <div className="size-full relative">
        <Image src={template} alt="template" fill />
      </div>
      <div className="absolute top-1/4 left-10 flex">
        <div className="flex flex-col gap-5 text-white">
          <h1
            className={`font-extrabold ${
              !isEditModal ? "text-xl" : "text-3xl"
            }`}
          >
            {title}
          </h1>
          <span className={`${!isEditModal ? "text-sm" : "text-base"}`}>
            {description}
          </span>
          <Button
            variant={"secondary"}
            className={`${!isEditModal ? "text-sm p-0" : "text-base"}`}
            // size={"sm"}
          >
            {action}
          </Button>
        </div>
      </div>
      <div
        className={`absolute top-1/4 ${!isEditModal ? "right-10" : "right-20"}`}
      >
        <div className={`relative ${!isEditModal ? "size-32" : "size-40"}`}>
          <Image
            src={image}
            alt="template"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      {isDialogOpen && isEditModal && (
        <EditBanner
          bannerId={id}
          onclose={closeDialog}
          isopen={isDialogOpen}
          title={_title}
          description={_description}
          action={_action}
          image={_image}
          setTitle={setTitle}
          setDescription={setDescription}
          setImage={setImage}
          setAction={setAction}
          template={template}
        />
      )}
    </div>
  );
};
