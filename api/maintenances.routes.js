//Maintenance routes
var express = require('express');
var routes = express.Router();

const Maintenance = require('../model/maintenance.model');
const API = require('../config/api_requester');

//Retrieve Maintenance data
routes.post('', function(req, res) {
    const maintenance = req.body;
    
    //POST een maintenance naar de NoSql database
    const newMaintenance = new Maintenance(maintenance);

    newMaintenance.save()
        .then(() => {
            res.status(200).json(newMaintenance);
        }).catch((error) => {
        res.status(400).json(error);
    });
});

//Update maintenance data from a maintenance id
routes.put('/:maintenanceId', function(req, res) {
    const maintenanceId = req.params.maintenanceId;
    const maintenance = req.body;
    Maintenance.findByIdAndUpdate({_id: maintenanceId}, maintenance)
        .then((maintenance) => Maintenance.findById({_id: maintenanceId})
        .then((maintenance) => res.status(200).json(maintenance)))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Retrieve maintenances
routes.get('', function(req, res) {

    Maintenance.find({})
        .then((maintenances) => {
            res.status(200).json(maintenances);
        })
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Retrieve one maintenance
routes.get('/:maintenanceId', function(req, res) {
    
    const maintenanceId = req.params.maintenanceId;

    Maintenance.findById(maintenanceId)
        .then((maintenance) => {
            res.status(200).json(maintenance);
        })
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

routes.delete('/:maintenanceId', function(req,res) {

    const maintenanceId = req.params.maintenanceId;

    Maintenance.findByIdAndRemove(maintenanceId)
        .then((maintenance) => {
            res.status(200).json(maintenance);
        })
        .catch(error => {
            res.status(400).json(error);
            console.log(error);
        })
});
module.exports = routes;
