const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

class Barcode {
  constructor({
    bcid = 'code128',
    text = 'MDK-0',
    scale = 3,
    height = 10,
    includetext = true,
    textxalign = 'center',
  }) {
    this.bcid = bcid;
    this.text = text;
    this.scale = scale;
    this.height = height;
    this.includetext = includetext;
    this.textxalign = textxalign;
  }

  async save() {
    try {
      bwipjs.toBuffer(
        {
          bcid: this.bcid,
          text: this.text,
          scale: this.scale,
          height: this.height,
          includetext: this.includetext,
          textxalign: this.textxalign,
        },
        (err, png) => {
          if (err) {
            throw err;
          } else {
            const pathFile = `${path.dirname(
              __dirname
            )}/public/uploads/barcode/${this.text}.png`;
            fs.writeFileSync(pathFile, png);
          }
        }
      );
      return `${process.env.APP_URI}/static/uploads/barcode/${this.text}.png`;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = { Barcode };
