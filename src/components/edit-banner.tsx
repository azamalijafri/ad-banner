import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Banner } from "./banner";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";

interface EditBannerProps {
  bannerId: number;
  onclose: () => void;
  isopen: boolean;
  title: string;
  description: string;
  action: string;
  image: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setImage: (value: string) => void;
  setAction: (value: string) => void;
  template: string;
}

const UNSPLASH_ACCESS_KEY = "ekY0B3ocDMLA_ieO-kp2wa2exWglAMSEc0E7aupCXE8";

export const EditBanner = ({
  bannerId,
  onclose,
  isopen,
  title,
  description,
  action,
  image,
  setTitle,
  setDescription,
  setImage,
  setAction,
  template,
}: EditBannerProps) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?count=5&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data.map((img: any) => img.urls.small));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  const changeImage = (src: string) => {
    setImage(src);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/update/${bannerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          action,
          image,
          template,
        }),
      });

      if (response.ok) {
        onclose();
      } else {
        alert("Failed to update banner.");
      }
    } catch (error) {
      console.error("Error saving banner:", error);
      alert("Error saving banner.");
    }
  };

  return (
    <Dialog open={isopen} onOpenChange={onclose}>
      <DialogContent>
        <div className="relative w-full h-64">
          <Banner
            id={bannerId}
            title={title}
            description={description}
            action={action}
            image={image}
            template={template}
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-3">
            <Label>Images</Label>
            <div className="flex gap-2">
              {images.map((img, index) => (
                <div
                  className="size-16 relative cursor-pointer"
                  key={index}
                  onClick={() => changeImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Random ${index}`}
                    className="object-cover rounded-full border-2 border-gray-300"
                    fill
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Description</Label>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Action</Label>
            <Input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
