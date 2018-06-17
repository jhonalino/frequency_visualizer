export default class AudioBuffer {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadAll() {
    return new Promise(resolve => {
      this.urls.forEach((url, index) => {
        let request = new XMLHttpRequest();
        request.open("get", url, true);
        request.responseType = "arraybuffer";
        request.onload = () => {
          this.context.decodeAudioData(request.response, buffer => {
            this.buffer[index] = buffer;
            if (index == this.urls.length - 1) {
              resolve();
            }
          });
        };
        request.send();
      });
    });
  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }
}
