const mongoose = require("mongoose");

const visaSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: [true, "Jumlah (count) wajib diisi"],
      enum: [10, 15, 20, 30],
      validate: {
        validator: function (value) {
          return [10, 15, 20, 30].includes(value);
        },
        message: (props) => `${props.value} adalah jumlah yang tidak valid!`,
      },
    },
    price: {
      type: Number,
      required: [true, "Harga wajib diisi"],
      min: [0, "Harga harus lebih besar dari 0"],
    },
  },
  {
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

const Visa = mongoose.model("visas", visaSchema);

module.exports = Visa;
