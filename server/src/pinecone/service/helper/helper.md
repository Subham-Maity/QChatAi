
- `fileStream` will return
```markdown
pdf-1716727468213.pdf
```

- `pdf_loader` will return
```json
{
  "filePathOrBlob": "C:\\Github\\second_brain_labs\\server\\temp-s3\\pdf-1716727814748.pdf",
  "splitPages": true,
  "parsedItemSeparator": ""
}
```


- `page` will return
```json
[
  {
    "pageContent": "Name : Xam  \nLet’s Test S ",
    "metadata": {
      "source": "C:\\Github\\second_brain_labs\\server\\temp-s3\\pdf-1716727774552.pdf",
      "pdf": {
        "version": "1.10.100",
        "info": {
          "PDFFormatVersion": "1.7",
          "IsAcroFormPresent": false,
          "IsXFAPresent": false,
          "Author": "Subham Maity",
          "Creator": "Microsoft® Word LTSC",
          "Producer": "Microsoft® Word LTSC",
          "CreationDate": "D:20240526181208+05'30'",
          "ModDate": "D:20240526181208+05'30'"
        },
        "metadata": {
          "_metadata": {
            "pdf:producer": "Microsoft® Word LTSC",
            "dc:creator": "Subham Maity",
            "xmp:creatortool": "Microsoft® Word LTSC",
            "xmp:createdate": "2024-05-26T18:12:08+05:30",
            "xmp:modifydate": "2024-05-26T18:12:08+05:30",
            "xmpmm:documentid": "uuid:F781AE33-F444-43DC-BAF2-4EFB7A70354A",
            "xmpmm:instanceid": "uuid:F781AE33-F444-43DC-BAF2-4EFB7A70354A"
          }
        },
        "totalPages": 1
      },
      "loc": {
        "pageNumber": 1
      }
    }
  }
]
```
- `documents` will return
```json
[
  {
    "pageContent": "Name : Xam  Let’s Test S",
    "metadata": {
      "pageNumber": 1,
      "text": "Name : Xam  Let’s Test S ",
      "loc": {
        "lines": {
          "from": 1,
          "to": 1
        }
      }
    }
  }
]
```