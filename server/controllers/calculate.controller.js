const Hotel = require('../models/hotel.model');
const Service = require('../models/service.model');
const Visa = require('../models/visa.model');
const La = require('../models/la.model');
const Airline = require('../models/airline.model');
const { currencyRate } = require('../middlewares/currency.middleware');

const calculate = async (req, res) => {
  try {
    const { idHotelMakkah, nightInMakkah, idHotelMadinah, nightInMadinah, countVisa, idAirline } = req.body;
    let roomRatesMakkah = [];
    let ratesPerPersonMakkah = [];
    let roomRatesMadinah = [];
    let ratesPerPersonMadinah = [];
    const totalRatesHotelSar = [];
    const totalRatesHotelUsd = [];
    let usdToSar, usdToIdr, localOffice, feeB2b, feeB2c;
    const totalRatesServiceUsd = [];
    const totalRatesServiceIdr = [];
    const totalNets = [];
    const focUstads = [];
    const focTls = [];
    const totalPrices = [];
    const b2bs = [];
    const b2cs = [];

    const fetchCalculate = async () => {
      const makkahPromise = Hotel.findById(idHotelMakkah).lean();
      const madinahPromise = Hotel.findById(idHotelMadinah).lean();
      const servicePromise = Service.find().lean();
      const visaPromise = Visa.findOne({ count: countVisa }).lean();
      const laPromise = La.findOne({ count: countVisa }).lean();
      const airlinePromise = Airline.findById(idAirline).lean();

      return Promise.all([makkahPromise, madinahPromise, servicePromise, visaPromise, laPromise, airlinePromise]);
    };

    const [hotelMakkah, hotelMadinah, service, visa, la, airline] = await fetchCalculate();

    if (!hotelMakkah || !hotelMadinah) {
      return res.status(404).json({
        code: 404,
        status: 'Not Found',
        message: 'Resource not found',
      });
    } else {
      hotelMakkah.roomPrices.forEach((room) => {
        const ratePerPersonMakkah = Math.round((room.price * nightInMakkah) / (room.roomType === 'Quad' ? 4 : room.roomType === 'Triple' ? 3 : 2));

        if ((req.body && Array.isArray(req.body.roomRatesMakkah)) || Array.isArray(req.body.ratesPerPersonMakkah)) {
          roomRatesMakkah = req.body.roomRatesMakkah;
          ratesPerPersonMakkah = req.body.ratesPerPersonMakkah;
        } else {
          roomRatesMakkah.push({
            roomType: room.roomType,
            price: room.price,
          });
          ratesPerPersonMakkah.push({
            roomType: room.roomType,
            price: ratePerPersonMakkah,
          });
        }
      });

      hotelMadinah.roomPrices.forEach((room) => {
        const ratePerPersonMadinah = Math.round((room.price * nightInMadinah) / (room.roomType === 'Quad' ? 4 : room.roomType === 'Triple' ? 3 : 2));

        if ((req.body && Array.isArray(req.body.roomRatesMadinah)) || Array.isArray(req.body.ratesPerPersonMadinah)) {
          roomRatesMadinah = req.body.roomRatesMadinah;
          ratesPerPersonMadinah = req.body.ratesPerPersonMadinah;
        } else {
          roomRatesMadinah.push({
            roomType: room.roomType,
            price: room.price,
          });
          ratesPerPersonMadinah.push({
            roomType: room.roomType,
            price: ratePerPersonMadinah,
          });
        }
      });

      ratesPerPersonMakkah.forEach((makkahRoom) => {
        const madinahRoom = ratesPerPersonMadinah.find((madinahRoom) => {
          return madinahRoom.roomType === makkahRoom.roomType;
        });
        const totalRates = madinahRoom ? makkahRoom.price + madinahRoom.price : makkahRoom.price;

        totalRatesHotelSar.push({
          roomType: makkahRoom.roomType,
          price: totalRates,
        });
      });
    }

    if (totalRatesHotelSar.length !== 0) {
      const fetchCurrency = async () => {
        const sarPromise = currencyRate('USD', 'SAR');
        const idrPromise = currencyRate('USD', 'IDR');

        const [sarRate, idrRate] = await Promise.all([sarPromise, idrPromise]);

        if (service !== null) {
          if (req.body && req.body.usdToSar) {
            usdToSar = req.body.usdToSar;
            usdToIdr = req.body.usdToIdr;
          } else {
            usdToSar = sarRate !== null ? sarRate / 100 : service[0].usdToSar;
            usdToIdr = idrRate !== null ? parseFloat(idrRate.toString().replace(/\./g, '')) : service[0].usdToIdr;
          }
        } else {
          return res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: 'Resource not found',
          });
        }
      };

      await fetchCurrency();

      totalRatesHotelSar.forEach((total) => {
        const totalRateHotelUsd = Math.ceil(total.price / usdToSar);

        totalRatesHotelUsd.push({
          roomType: total.roomType,
          price: totalRateHotelUsd,
        });
      });

      totalRatesHotelUsd.forEach((total) => {
        const totalRateServiceUsd = total.price + visa.price + la.price;
        const totalRateServiceIdr = Math.round(totalRateServiceUsd * usdToIdr);

        totalRatesServiceUsd.push({
          roomType: total.roomType,
          price: totalRateServiceUsd,
        });
        totalRatesServiceIdr.push({
          roomType: total.roomType,
          price: totalRateServiceIdr,
        });
      });

      totalRatesServiceIdr.forEach((total) => {
        const totalNet = total.price + airline.price + service[0].localOffice;
        localOffice = service[0].localOffice;

        totalNets.push({
          roomType: total.roomType,
          price: totalNet,
        });
      });

      totalNets.forEach((total) => {
        const focUstad = Math.round(total.price / (countVisa === 30 ? 30 : countVisa === 20 ? 20 : countVisa === 15 ? 15 : countVisa === 10 ? 10 : 0));

        focUstads.push({
          roomType: total.roomType,
          price: focUstad,
        });
        focTls.push({
          roomType: total.roomType,
          price: focUstad,
        });
      });

      totalNets.forEach((total) => {
        const { roomType, price: amount } = total;
        const existingCost = totalPrices.find((cost) => cost.roomType === roomType);

        if (existingCost) {
          existingCost.total += amount;
        } else {
          totalPrices.push({
            roomType: total.roomType,
            price: amount,
          });
        }
      });

      focUstads.forEach((foc) => {
        const { roomType, price: amount } = foc;
        const existingCost = totalPrices.find((cost) => cost.roomType === roomType);

        if (existingCost) {
          existingCost.price += amount;
        } else {
          totalPrices.push({
            roomType: foc.roomType,
            price: amount,
          });
        }
      });

      focTls.forEach((foc) => {
        const { roomType, price: amount } = foc;
        const existingCost = totalPrices.find((cost) => cost.roomType === roomType);

        if (existingCost) {
          existingCost.price += amount;
        } else {
          totalPrices.push({
            roomType: foc.roomType,
            price: amount,
          });
        }
      });

      totalPrices.forEach((total) => {
        const b2b = Math.round(total.price + service[0].b2b);
        feeB2b = service[0].b2b;

        b2bs.push({
          roomType: total.roomType,
          price: b2b,
        });
      });

      b2bs.forEach((b2b) => {
        const b2c = Math.round(b2b.price + service[0].b2c);
        feeB2c = service[0].b2c;

        b2cs.push({
          roomType: b2b.roomType,
          price: b2c,
        });
      });

      console.log({
        data: {
          HotelMakkah: hotelMakkah.name,
          nightInMakkah: nightInMakkah,
          ratesHotelMakkah: hotelMakkah.roomPrices,
          ratesPerPersonMakkah: ratesPerPersonMakkah,
          HotelMadinah: hotelMadinah.name,
          nightInMadinah: nightInMadinah,
          ratesHotelMadinah: hotelMadinah.roomPrices,
          ratesPerPersonMadinah: ratesPerPersonMadinah,
          totalRatesHotelSar: totalRatesHotelSar,
          totalRatesHotelUsd: totalRatesHotelUsd,
          countVisa: countVisa,
          priceVisa: visa.price,
          countLa: countVisa,
          priceLa: la.price,
          totalRatesServiceUsd: totalRatesServiceUsd,
          totalRatesServiceIdr: totalRatesServiceIdr,
          Airline: airline.name,
          priceAirline: airline.price,
          localOffice: localOffice,
          totalNets: totalNets,
          countFocUstad: countVisa,
          focUstads: focUstads,
          countFocTl: countVisa,
          focTls: focTls,
          feeB2b: feeB2b,
          b2bs: b2bs,
          feeB2c: feeB2c,
          b2cs: b2cs,
        },
      });

      res.status(201).json({
        code: 201,
        data: {
          HotelMakkah: hotelMakkah.name,
          nightInMakkah: nightInMakkah,
          ratesHotelMakkah: hotelMakkah.roomPrices,
          ratesPerPersonMakkah: ratesPerPersonMakkah,
          HotelMadinah: hotelMadinah.name,
          nightInMadinah: nightInMadinah,
          ratesHotelMadinah: hotelMadinah.roomPrices,
          ratesPerPersonMadinah: ratesPerPersonMadinah,
          totalRatesHotelSar: totalRatesHotelSar,
          totalRatesHotelUsd: totalRatesHotelUsd,
          countVisa: countVisa,
          priceVisa: visa.price,
          countLa: countVisa,
          priceLa: la.price,
          totalRatesServiceUsd: totalRatesServiceUsd,
          totalRatesServiceIdr: totalRatesServiceIdr,
          Airline: airline.name,
          priceAirline: airline.price,
          localOffice: localOffice,
          totalNets: totalNets,
          countFocUstad: countVisa,
          focUstads: focUstads,
          countFocTl: countVisa,
          focTls: focTls,
          feeB2b: feeB2b,
          b2bs: b2bs,
          feeB2c: feeB2c,
          b2cs: b2cs,
        },
      });
    } else {
      return res.status(400).json({
        code: 400,
        status: 'Bad Request',
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err) => err.message);

      res.status(400).json({
        code: 400,
        status: 'Bad Request',
        message: errors.join(', '),
      });
    } else {
      res.status(500).json({
        code: 500,
        status: 'Internal Server Error',
        message: error.message,
      });
    }
  }
};

module.exports = { calculate };
