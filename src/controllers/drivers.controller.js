module.exports = {
    getDrivers: async (request, response) => {
        try {
            response.status(200).json({ drivers: ["ricardo","hamilton"] });
        } catch (error) {
            response.status(404).json({
                innerMessage: error,
                message: error.message,
                file: 'drivers.controllers',
                function: 'getDrivers',
            });
        }
    },
};
