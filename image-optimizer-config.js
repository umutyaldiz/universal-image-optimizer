export default {
    imageOptimize: [
        {
            source: 'source/images',
            destination: 'dist/images',
            preserveFolders: true,
            clean: true,
            images: [
                {
                    type: 'jpeg',
                    quality: 80,
                    grayscale: true,
                    stripMetadata: false,
                },
                {
                    type: 'png',
                    quality: 80,
                    grayscale: false,
                    stripMetadata: true,
                }
            ]
        }
    ]
};
