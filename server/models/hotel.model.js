const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      required: [true, 'Provider wajib diisi'],
    },
    from: {
      type: Date,
      required: [true, 'Tanggal Awal wajib diisi'],
    },
    to: {
      type: Date,
      required: [true, 'Tanggal Akhir wajib diisi'],
    },
    name: {
      type: String,
      required: [true, 'Nama Hotel wajib diisi'],
    },
    city: {
      type: String,
      required: [true, 'Kota wajib diisi'],
      enum: ['Makkah', 'Madinah'],
    },
    distance: {
      type: Number,
      required: [true, 'Jarak wajib diisi'],
    },
    address: {
      type: String,
      required: [true, 'Alamat wajib diisi'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating minimal 1'],
      max: [5, 'Rating maksimal 5'],
    },
    roomPrices: [
      {
        _id: false,
        roomType: {
          type: String,
          required: [true, 'Tipe Kamar wajib diisi'],
          enum: ['Quad', 'Triple', 'Double'],
        },
        price: {
          type: Number,
          required: [true, 'Harga wajib diisi'],
          min: [0, 'Harga harus lebih besar dari 0'],
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
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

const Hotel = mongoose.model('hotels', hotelSchema);

module.exports = Hotel;
