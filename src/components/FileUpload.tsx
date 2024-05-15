"use client";

import { ChangeEvent, useEffect, useState } from "react";

import Button from "./Button/Button";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { PostForm } from "@/app/write/page";
import { uploadImage } from "@/services/posts";
import { useSession } from "next-auth/react";

export default function FileUpload() {
  const { data: session } = useSession();
  const [fileEnter, setFileEnter] = useState(false);
  const [file, setFile] = useState<File>();

  const [form, setForm] = useState<PostForm>({
    content: "",
    file: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let files = e.target.files;
    if (files && files[0]) {
      let blobUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setForm((prev) => ({ ...prev, [name]: blobUrl }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session?.user?.email) {
      const fileUploadRes = await uploadImage({
        author: session?.user?.email,
        content: form.content,
        image: file!,
      });

      if (fileUploadRes.state) {
        console.log("post was created");
      }
    }
  };

  return (
    <>
      <form className="container px-4 max-w-5xl mx-auto" onSubmit={onSubmit}>
        <div className="container max-w-5xl mx-auto mb-5 h-96">
          {!form.file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setFileEnter(true);
              }}
              onDragLeave={(e) => {
                setFileEnter(false);
              }}
              onDragEnd={(e) => {
                e.preventDefault();
                setFileEnter(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setFileEnter(false);
                if (e.dataTransfer.items) {
                  [...e.dataTransfer.items].forEach((item, i) => {
                    if (item.kind === "file") {
                      const file = item.getAsFile();
                      if (file) {
                        let blobUrl = URL.createObjectURL(file);
                        setForm((prev) => ({ ...prev, file: blobUrl }));
                      }
                      console.log(`items file[${i}].name = ${file?.name}`);
                    }
                  });
                } else {
                  [...e.dataTransfer.files].forEach((file, i) => {
                    console.log(`… file[${i}].name = ${file.name}`);
                  });
                }
              }}
              className={`${
                fileEnter ? "border-4" : "border-2"
              } mx-auto  bg-white flex flex-col w-full border-dashed items-center justify-center h-96`}
            >
              <label
                htmlFor="file"
                className="h-full flex flex-col justify-center text-center"
              >
                Click to upload or drag and drop
              </label>
              <input
                id="file"
                type="file"
                name="file"
                className="hidden"
                onChange={onChange}
              />
            </div>
          ) : (
            <div className="relative flex flex-col max-w-5xl mx-auto items-center bg-black">
              <object
                className="max-w-5xl h-96"
                data={form.file}
                type="image/png" //need to be updated based on type of file
              />
              <IoIosCloseCircleOutline
                className="absolute right-4 top-4 w-9 h-9"
                color="white"
                onClick={() => setForm((prev) => ({ ...prev, file: "" }))}
              ></IoIosCloseCircleOutline>
            </div>
          )}
        </div>
        <textarea
          rows={10}
          placeholder="write a caption"
          id="content"
          name="content"
          required
          value={form.content}
          onChange={onChange}
          className="w-full h-500 border-2 border-gray-300 text-black"
        />
        <Button
          variant={"primary"}
          color="bg-red-400"
          fullWidth={true}
          rounded="md"
        >
          <span className="text-white font-bold">Publish</span>
        </Button>
      </form>
    </>
  );
}
