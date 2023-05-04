import { Dropbox } from 'dropbox';

const accessToken = '<your-token-from-dashboard>';

const dbx = new Dropbox({
	accessToken,
	fetch
});

export default dbx;