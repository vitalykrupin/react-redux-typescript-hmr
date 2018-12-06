'use strict';

module.exports = {
	paths: {
		root: './',
		sources: {
			manifest: 'manifest.json',
			releaseNotes: 'ReleaseNotes.txt',
			compile: {
				src: 'app/',
                jsEntry: 'boot.tsx',
                custom: 'custom.ts',
				jsSrcs: '/',
                htmlEntry: 'index.html',
                htmlEntryAfter: '',
				docs: [
                    'core/utils.ts'
                ],
			}
		},
		output: {
            dest: 'build/',
            dist: 'dist',
			docs: '/docs'
		},
		bundleNames: {
			vendor: 'vendor',
			main: 'bundle'
		}
    },
    isUsedHotReloading: false,
    port: 3502
};
