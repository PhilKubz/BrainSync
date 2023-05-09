document.addEventListener('DOMContentLoaded', async () => {
	// Add your Dropbox access token here
	const accessToken = process.env.DROPBOX_API_KEY;


	// Initialize Dropbox API client
	const dbx = new Dropbox.Dropbox({ accessToken, fetch });

	// List folders
	const listFolders = async (path = '') => {
		const response = await dbx.filesListFolder({ path });
		const entries = response.entries.filter(entry => entry['.tag'] === 'folder');
		const folderSelect = document.getElementById('folder-select');

		folderSelect.innerHTML = '<option value="" selected>Choose a folder...</option>';

		entries.forEach(folder => {
			const folderOption = document.createElement('option');
			folderOption.value = folder.path_display;
			folderOption.textContent = folder.name;
			folderSelect.appendChild(folderOption);
		});
	};

	// List files
	const listFiles = async (path = '') => {
		const response = await dbx.filesListFolder({ path });
		const files = response.entries.filter(entry => entry['.tag'] === 'file');
		const filesContainer = document.getElementById('files-container');
		filesContainer.innerHTML = '';

		files.forEach(file => {
			const fileElement = document.createElement('div');
			fileElement.textContent = file.name;
			filesContainer.appendChild(fileElement);
		});
	};

	listFolders();
	listFiles();

	// Folder selection
	document.getElementById('folder-select').addEventListener('change', (event) => {
		listFiles(event.target.value);
	});

	// Create folder
	document.getElementById('create-folder-btn').addEventListener('click', async () => {
		const folderName = prompt('Enter the name of the new folder:');
		if (!folderName) return;

		try {
			await dbx.filesCreateFolderV2({ path: `/${folderName}` });
			alert('Folder created successfully');
			listFolders();
		} catch (error) {
			alert(`Error creating folder: ${error.message}`);
		}
	});

	// Upload file
	document.getElementById('upload-button').addEventListener('click', () => {
		document.getElementById('upload-input').click();
	});

	document.getElementById('upload-input').addEventListener('change', async (event) => {
		const file = event.target.files[0];

		if (!file) {
			alert('No file selected');
			return;
		}

		try {
			const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/octet-stream',
					'Dropbox-API-Arg': JSON.stringify({
						path: `/${file.name}`,
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

			const result = await response.json();
			alert(`File uploaded successfully: ${result.name}`);
			listFiles();
		} catch (error) {
			alert(`Error uploading file: ${error.message}`);
		}
	});

	// Create file
	document.getElementById('create-file-btn').addEventListener('click', async () => {
		const fileName = prompt('Enter the name of the new file:');
		if (!fileName) return;

		document.getElementById('create-file-btn').addEventListener('click', async () => {
			const fileName = prompt('Enter the name of the new file:');
			if (!fileName) return;

			try {
				const response = await dbx.filesUpload({
					path: `/${fileName}`,
					contents: '',
					autorename: true
				});

				alert('File created successfully');
				listFiles();
			} catch (error) {
				alert(`Error creating file: ${error.message}`);
			}
		});
	});
});
