export default {
  name: 'IconGenerator',

  methods: {

    async generate(iconsData) {
      return new Promise(async (resolve, reject) => {
        try {
          var interval = 3500; // how much time should the delay between two iterations be (in milliseconds)?
          var promise = Promise.resolve();
          var vm = this;
          vm.isLoading = true;
          iconsData.forEach((iconData, index) => {

            promise = promise.then(async function () {
              var imageData = await vm.getMarkerImageDataAtIndex(iconData.id);
              vm.downloadURI(imageData.imageUrl, iconData.name && iconData.name.length > 0 ? `${iconData.name}.png` : `marker-${index + 1}.png`);

              return new Promise(function (resolve) {
                setTimeout(() => {
                  if (index === (iconsData.length - 1)) {
                    vm.isLoading = false;
                  }
                  resolve();
                }, interval);
              });
            });

          });

        } catch (error) {
          console.log('Error: ', error);
          reject(error);
        }
      });
    },

    downloadURI(uri, name) {
      const link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    getMarkerImageDataAtIndex(assembledIconId) {
      return new Promise((resolve) => {
        const placeholderElementId = `holder-${assembledIconId}`;
        const placeholderSelector = `#${placeholderElementId}`;
        const placeholder = document.createElement('div');
        placeholder.setAttribute('id', placeholderElementId);
        placeholder.classList.add('holder');

        document.body.appendChild(placeholder);

        const element = document.querySelector(`#${assembledIconId}`);
        const elementSvg = element.querySelector('svg');
        const elementLabel = element.querySelector('.label');
        const maxWidth = Math.max(elementSvg.clientWidth, elementLabel ? (elementLabel.clientWidth) : 0) + 6; // +4 mert 2px border van rajta

        setTimeout(() => {

            const clonedElement = element.cloneNode(true);
            clonedElement.setAttribute('style', `width: ${maxWidth}px; height: ${element.clientHeight}px`);
            clonedElement.classList.add('toPrint');
            document.querySelector(placeholderSelector).appendChild(clonedElement);

            setTimeout(() => {
                this.$html2canvas(clonedElement, {
                    backgroundColor: null,
                    useCORS: true,
                    height: element.clientHeight,
                    width: maxWidth,
                }).then((canvas) => {
                    const base64image = canvas.toDataURL('image/png');
                    resolve({
                        imageUrl: base64image,
                    });
                    placeholder.parentNode.removeChild(placeholder);
                });
            }, 2500);

        }, 500);

      });
    },

  },

};
