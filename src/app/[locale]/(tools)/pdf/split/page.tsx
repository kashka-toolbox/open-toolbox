"use client"

import DropArea from "@/components/ui/droparea";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  BlobReader,
  BlobWriter,
  ZipWriter,
} from "@zip.js/zip.js";
import { saveBlobToFileWithDialog } from "@/lib/files/saveBlobToFileWithDialog";



export default function PDFSampleGenerator() {
  const t = useTranslations("pdfSplit"); //TODO adjust translation key
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesAdded = (files: File[]) => {
    setFiles(files);
  }

  const splitPDF = async (file: File) => {
    const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
    const splittedPDFs = await Promise.all(pdfDoc.getPages().map(async (page, i) => {
      const splittedPdfDoc = await PDFDocument.create();
      splittedPdfDoc.setTitle((pdfDoc.getTitle() ?? "") + ` - ${i + 1}`);

      const copiedPages = await splittedPdfDoc.copyPages(pdfDoc, [i]);
      splittedPdfDoc.addPage(copiedPages[0]);

      return splittedPdfDoc;
    }));

    const zipFileWriter = new BlobWriter();

    const zipWriter = new ZipWriter(zipFileWriter);

    for (let i = 0; i < splittedPDFs.length; i++) {
      const pdf = splittedPDFs[i];
      const pdfBytes = await pdf.save();
      const pdfReader = new BlobReader(new Blob([pdfBytes]));
      await zipWriter.add(`split-${i + 1}.pdf`, pdfReader);
    }

    await zipWriter.close();
    const zipFileBlob = await zipFileWriter.getData();

    saveBlobToFileWithDialog(zipFileBlob, "splitted.zip", [{ description: 'ZIP Archive', accept: { 'application/zip': ['.zip'] } }]);
  }

  return <Section variant={"default"} className="flex flex-col gap-4 lg:gap-8 pt-2">
    <h1 className="header-section-1">{t("title")}</h1>

    <DropArea onFilesAdded={setFiles} />

    {files.map((file, index) =>
      <div key={index} className="">
        <span>{file.name}</span>
        <Button onClick={() => splitPDF(file)}>
          Split
        </Button>
      </div>
    )}
  </Section>
}