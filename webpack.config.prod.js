'use strict';

const path = require('path');
const semver = require('semver');
const fs = require('fs');
const merge = require('webpack-merge');
const base = require('./webpack.config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');
const manifestFile = require('./manifest.json');

module.exports = (env = {}) => {
    const {
        sources: { manifest, releaseNotes, compile: compile },
        output,
        root,
        cwd
    } = config.paths;
    const ROOT = path.join(__dirname, root);

	if (env.dist) {
		const parsed = JSON.parse(fs.readFileSync(manifest)),
			newManifestData = Object.assign({}, parsed, {
				version: semver.inc(manifestFile.version, env.type),
				created: new Date().toLocaleString()
			});
		fs.writeFileSync(manifest, JSON.stringify(newManifestData, null , 2));
	}
	
    const webpackConfig = merge(base(config), {
		plugins: [
            new CleanWebpackPlugin(output.dest, {
				root:     ROOT,
				exclude:  [],
				verbose:  true,
				dry:      false
			}),
			new TypedocWebpackPlugin({
                out: path.join(ROOT, output.dest, output.docs),
				target: 'es6',
				ignoreCompilerErrors: true
			}, path.join([ROOT, compile.src, compile.jsSrcs, compile.docs].join(''))),
			new CopyWebpackPlugin([
				{from: path.join(ROOT, manifest), to: './' },
				{from: path.join(ROOT, releaseNotes), to: './' }
			], undefined)
		]
	});
	
	return webpackConfig;
};