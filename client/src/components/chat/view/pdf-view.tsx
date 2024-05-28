type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdf_url)}&embedded=true`;

  return (
    <iframe
      src={googleDocsUrl}
      style={{ width: "100%", height: "100%" }}
    ></iframe>
  );
};

export default PDFViewer;
