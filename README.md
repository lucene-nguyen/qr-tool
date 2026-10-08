![1791481053776](image/README/1791481053776.png)

# QR Code Generator

A NestJS tool for generating QR codes with custom logos and streaming the generated PNG directly to the client.

## Features

* Generate QR codes from text or URLs
* Add a custom logo to the QR code
* Stream PNG directly to the client
* No temporary image files

## Tech Stack

* **Node.js**
* **NestJS**
* **TypeScript**
* **QRCode** — QR code generation
* **Sharp** — image processing and logo compositing
* **Multer** — file upload
* **Node.js Streams** — data streaming

## API

```http
POST /qr
Content-Type: multipart/form-data
```

| Field    | Type   |
| -------- | ------ |
| `text` | string |
| `logo` | file   |

### Example

```bash
curl -X POST http://localhost:3000/qr \
  -F "text=https://lucene.dev" \
  -F "logo=@./logo.png" \
  --output qr.png
```

## Flow

```text
Client
  ↓
NestJS + Multer
  ↓
QRCode Stream
  ↓
Sharp + Logo
  ↓
PNG Stream
  ↓
Client
```
