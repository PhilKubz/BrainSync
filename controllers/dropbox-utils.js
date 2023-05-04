import dbx from './dropbox';


const listFiles = async () => {
	const response = await dbx.filesListFolder({ path: '' });
	console.log(response);
};

listFiles();
