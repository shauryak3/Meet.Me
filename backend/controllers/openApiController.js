/* eslint-disable max-len */
const Boom = require('boom');
const fs = require('fs');
const Path = require('path');
const _ = require('lodash');
const sequelize = require('sequelize');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { mailer } = require('../helpers');
const { openApiService } = require('../services');
const { db } = require('../dbconnection'); 

module.exports = {
    booking: async(req,res,next) => {
        try{
            logger.info('Add Booking Request: ', req.body);
            const addBookingResult = await openApiService.booking(req.body);
            if (!addBookingResult) {
                next(Boom.conflict('Error while booking'));
            }
            res.message = `Succesfully booked`;
            next();
        }catch(err){
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
        }
    },
    getPrices: async(req,res,next) => {
        try {
            logger.info('Get Prices Request: ', req.params);
            const getPricesResult = await openApiService.getPrices(req.params.id);
            if (!getPricesResult) {
                next(Boom.conflict('Error while getting prices'));
            }
            res.data = getPricesResult;
            next();
        } catch (err) {
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
        }
	},
	getServices: async(req,res,next) => {
		try {
			logger.info('Get Services Request: ', req.params);
            const getServicesResult = await openApiService.getServices(req.params.id);
            if (!getServicesResult) {
                next(Boom.conflict('Error while getting services'));
            }
            res.data = getServicesResult;
            next();
		} catch (err) {
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
		}
	},
	getTimings: async(req,res,next) => {
		try {
			logger.info('Get Timings Request: ', req.params);
            const getTimingsResult = await openApiService.getTimings(req.params.id);
            if (!getTimingsResult) {
                next(Boom.conflict('Error while getting timings'));
            }
            res.data = getTimingsResult;
            next();
		} catch (err) {
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
		}
    },
    getPracticeDetails: async(req,res,next) => {
        try {
			logger.info('Get Practice Details Request: ', req.params);
            const getPracticeDetailsResult = await openApiService.getPracticeDetails(req.params.id);
            if (!getPracticeDetailsResult) {
                next(Boom.conflict('Error while getting practice details'));
            }
            res.data = getPracticeDetailsResult;
            next();
		} catch (err) {
            logger.error(err);
            next(Boom.conflict('Something went wrong'));
        }
    }
}