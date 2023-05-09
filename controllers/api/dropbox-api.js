async function fetchDropboxFiles(accessToken, path) {
	const response = await fetch('https://api.dropboxapi.com/2/files/list_folder', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ path: path })
	});

	if (!response.ok) {
		throw new Error(`Error fetching files: ${response.statusText}`);
	}

	const data = await response.json();
	return data.entries;
}

function createFileElement(file) {
	const fileElement = document.createElement('div');
	fileElement.classList.add('file');
	fileElement.textContent = file.name;
	return fileElement;
}

function createFolderElement(folder) {
	const folderElement = document.createElement('div');
	folderElement.classList.add('folder');
	folderElement.textContent = folder.name;
	return folderElement;
}

function displayDropboxFiles(filesContainer, files, folders) {
	filesContainer.innerHTML = '';

	folders.forEach(folder => {
		const folderElement = createFolderElement(folder);
		filesContainer.appendChild(folderElement);
	});

	files.forEach(file => {
		const fileElement = createFileElement(file);
		filesContainer.appendChild(fileElement);
	});
}

document.addEventListener('DOMContentLoaded', async () => {
	const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace this with the actual access token
	const path = ''; // Root path

	try {
		const entries = await fetchDropboxFiles(accessToken, path);
		const files = entries.filter(entry => entry['.tag'] === 'file');
		const folders = entries.filter(entry => entry['.tag'] === 'folder');
		const filesContainer = document.getElementById('files-container');
		displayDropboxFiles(filesContainer, files, folders);
	} catch (error) {
		console.error('Error loading Dropbox files:', error);
	}
});

async function uploadFileToDropbox(accessToken, file, path) {
	const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/octet-stream',
			'Dropbox-API-Arg': JSON.stringify({
				path: `${path}/${file.name}`,
				mode: 'add',
				autorename: true,
				mute: false
			})
		},
		body: file
	});

	if (!response.ok) {
		throw new Error(`Error uploading file: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

document.getElementById('upload-button').addEventListener('click', () => {
	document.getElementById('upload-input').click();
});

document.getElementById('upload-input').addEventListener('change', async (event) => {
	const file = event.target.files[0];
	if (!file) return;

	const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace this with the actual access token
	const path = ''; // Root path

	try {
		await uploadFileToDropbox(accessToken, file, path);
		event.target.value = ''; // Reset the file input
		const entries = await fetchDropboxFiles(accessToken, path);
		const files = entries.filter(entry => entry['.tag'] === 'file');
		const folders = entries.filter(entry => entry['.tag'] === 'folder');
		const filesContainer = document.getElementById('files-container');
		displayDropboxFiles(filesContainer, files, folders);
	} catch (error) {
		console.error('Error uploading file:', error);
	}
});

// update the folder dropdown options
function updateFolderDropdown(folders) {
	const folderSelect = document.getElementById('folder-select');
	folderSelect.innerHTML = '<option value="" selected>Choose a folder...</option>';
	folders.forEach(folder => {
		const option = document.createElement('option');
		option.value = folder.path_lower;
		option.textContent = folder.name;
		folderSelect.appendChild(option);
	});
}

//  folder selection change event
document.getElementById('folder-select').addEventListener('change', async (event) => {
	const selectedFolderPath = event.target.value;
	if (!selectedFolderPath) return;

	const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace this with the actual access token

	try {
		const entries = await fetchDropboxFiles(accessToken, selectedFolderPath);
		const files = entries.filter(entry => entry['.tag'] === 'file');
		const folders = entries.filter(entry => entry['.tag'] === 'folder');
		const filesContainer = document.getElementById('files-container');
		displayDropboxFiles(filesContainer, files, folders);
	} catch (error) {
		console.error('Error fetching files:', error);
	}
});

async function createDropboxFolder(accessToken, path) {
	const response = await fetch('https://api.dropboxapi.com/2/files/create_folder_v2', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ path })
	});

	if (!response.ok) {
		throw new Error(`Error creating folder: ${response.statusText}`);
	}

	return await response.json();
}

document.getElementById('create-folder-btn').addEventListener('click', async () => {
	const folderName = prompt('Enter the name of the new folder:');
	if (!folderName) return;

	const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace this with the actual access token
	const selectedFolderPath = document.getElementById('folder-select').value;
	const newFolderPath = selectedFolderPath ? `${selectedFolderPath}/${folderName}` : `/${folderName}`;

	try {
		await createDropboxFolder(accessToken, newFolderPath);
		alert('Folder created successfully');
		const entries = await fetchDropboxFiles(accessToken, selectedFolderPath);
		const files = entries.filter(entry => entry['.tag'] === 'file');
		const folders = entries.filter(entry => entry['.tag'] === 'folder');
		const filesContainer = document.getElementById('files-container');
		displayDropboxFiles(filesContainer, files, folders);
	} catch (error) {
		console.error('Error creating folder:', error);
		alert('Error creating folder. Please try again.');
	}
});

async function uploadDropboxFile(accessToken, file, path) {
	const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${accessToken}`,
			'Content-Type': 'application/octet-stream',
			'Dropbox-API-Arg': JSON.stringify({
				path,
				mode: 'add',
				autorename: true,
				mute: false
			})
		},
		body: file
	});

	if (!response.ok) {
		throw new Error(`Error uploading file: ${response.statusText}`);
	}

	return await response.json();
}

document.getElementById('upload-file-btn').addEventListener('click', async () => {
	const fileInput = document.getElementById('file-input');
	if (!fileInput.files.length) {
		alert('Please select a file to upload');
		return;
	}

	const file = fileInput.files[0];
	const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace this with the actual access token
	const selectedFolderPath = document.getElementById('folder-select').value;
	const filePath = selectedFolderPath ? `${selectedFolderPath}/${file.name}` : `/${file.name}`;

	try {
		await uploadDropboxFile(accessToken, file, filePath);
		alert('File uploaded successfully');
		const entries = await fetchDropboxFiles(accessToken, selectedFolderPath);
		const files = entries.filter(entry => entry['.tag'] === 'file');
		const folders = entries.filter(entry => entry['.tag'] === 'folder');
		const filesContainer = document.getElementById('files-container');
		displayDropboxFiles(filesContainer, files, folders);
	} catch (error) {
		console.error('Error uploading file:', error);
		alert('Error uploading file. Please try again.');
	}
});
