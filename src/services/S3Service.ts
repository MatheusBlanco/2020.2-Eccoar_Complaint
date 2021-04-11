import 'dotenv/config';
import { S3 } from 'aws-sdk';

export class S3Service {
	private readonly s3: S3;
	private readonly bucket: string;

	constructor() {
		this.s3 = new S3();
		this.bucket = process.env.AWS_BUCKET_NAME;
	}

	public async uploadImage(
		picture: string,
	): Promise<S3.ManagedUpload.SendData> {
		const date = new Date();
		const hash = this._genRanHex(16);
		const buf = Buffer.from(
			picture.replace(/^data:image\/\w+;base64,/, ''),
			'base64',
		);
		const type = picture.split(';')[0].split('/')[1];

		const params = {
			Key: `${date.getMonth()}-${date.getFullYear()}-${hash}`,
			Body: buf,
			Bucket: this.bucket,
			ContentType: `image/${type}`,
			ContentEncoding: 'base64',
			ACL: 'public-read',
		};

		const upload = this.s3.upload(params).promise();
		return upload;
	}

	private _genRanHex(size: number) {
		return `Ec${[...Array(size)]
			.map(() => Math.floor(Math.random() * 16).toString(16))
			.join('')}Ec`;
	}
}
