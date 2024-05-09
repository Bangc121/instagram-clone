"use client";

import { ChangeEvent, useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import FileUpload from "@/components/FileUpload";

export type PostForm = {
  content: string;
  image: string | undefined;
};

export default function WritePage() {
  const [file, setFile] = useState<string>();
  const [form, setForm] = useState<PostForm>({
    content: "",
    image: undefined,
  });
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log("filewefwefwefwef", file);
  }, [file]);

  return (
    <section>
      <form className="container px-4 max-w-5xl mx-auto" onSubmit={onSubmit}>
        <FileUpload file={file} setFile={setFile} />
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
    </section>
  );
}
