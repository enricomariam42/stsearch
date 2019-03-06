#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

const archiver = require('archiver');

const pkg = require('../package.json');

const isProduction = process.env.NODE_ENV === 'production';

const zipDir = path.join(__dirname, `../dist/${isProduction ? 'prod' : 'dev'}/`);
const zipPath = path.join(__dirname, `../dist/${isProduction ? 'prod' : 'dev'}.zip`);
const zipStream = fs.createWriteStream(zipPath);
const zipArchiver = archiver('zip');

zipArchiver.pipe(zipStream);
zipArchiver.directory(zipDir, pkg.name);

zipStream.on('close', () => {
	let mvn = spawn('mvn', [
		'deploy:deploy-file',
		'-Dpackaging=zip',
		`-Dfile=${zipPath}`,
		`-DgroupId=${pkg.maven.group}`,
		`-DartifactId=${pkg.name}`,
		`-Dversion=${isProduction ? pkg.version : `${pkg.version}-SNAPSHOT`}`,
		`-DrepositoryId=${isProduction ? pkg.maven.repository.release.id : pkg.maven.repository.snapshot.id}`,
		`-Durl=${isProduction ? pkg.maven.repository.release.url : pkg.maven.repository.snapshot.url}`
	]);

	mvn.stdout.on('data', data => {
		console.log(data.toString());
	});

	mvn.stderr.on('data', data => {
		console.error(data.toString());
	});

	mvn.on('exit', () => {
		fs.unlinkSync(zipPath);
	});
});

zipArchiver.on('error', error => {
	throw error;
});

zipArchiver.on('warning', error => {
	if (error.code !== 'ENOENT') {
		throw error;
	}
});

zipArchiver.finalize();
