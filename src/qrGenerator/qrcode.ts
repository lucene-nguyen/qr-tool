import QRCode from 'qrcode';
import sharp, { Sharp } from 'sharp';
import { PassThrough } from 'stream';
export async function generatorQrUtility(
  text: string,
  logo: Buffer,
): Promise<Sharp> {
  // PassThrough: type of Transformation Stream - pass data through - not modifying it
  const qrStream = new PassThrough();

  // generate qr code and write it to the stream
  QRCode.toFileStream(qrStream, text, {
    errorCorrectionLevel: 'H',
    width: 500,
    margin: 2,
  });

  // resize logo
  const resizedLogo = await resizeLogo(logo);

  // config logo -> return output as stream
  const resultStream = sharp()
    .composite([
      {
        input: resizedLogo,
        gravity: 'center',
      },
    ])
    .png();

  //readable.pipe(writable)
  qrStream.pipe(resultStream);

  return resultStream;
}

async function resizeLogo(logo: Buffer): Promise<Buffer> {
  return sharp(logo)
    .resize({
      height: 150,
      width: 150,
    })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: 'white',
    })
    .png()
    .toBuffer();
}
