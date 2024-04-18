import Property from '../models/property.model.js';
import { errorHandler } from '../utils/error.js';

export const getProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return next(errorHandler(404, 'Property not found!'));
        }
        res.status(200).json(property);
    } catch (error) {
        next(error);
    }
};

export const getProperties = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['funding', 'donation'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const properties = await Property.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(properties);
    } catch (error) {
        next(error);
    }
};