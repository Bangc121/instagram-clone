"use client";

import { ChangeEvent, useEffect, useState } from "react";

import Button from "@/components/Button/Button";
import FileUpload from "@/components/FileUpload";

export type PostForm = {
  content: string;
  file: any;
};

export default function WritePage() {
  return (
    <section>
      <FileUpload />
    </section>
  );
}
