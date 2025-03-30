

import {S3} from 'aws-sdk';

export const prepareToPutObject = key => {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      signatureVersion: 'v4',
      region: process.env.AWS_REGION,
    });
    return new Promise((resolve, reject) => {
      s3.getSignedUrl(
        'putObject',
        {
          Bucket: process.env.AWS_BUCKET,
          Key: key,
          ACL: 'public-read',
        },
        (err: any, url: string) => {
          if (err) {
            return reject(err);
          }
          resolve({ key, url });
        },
      );
    });
  };