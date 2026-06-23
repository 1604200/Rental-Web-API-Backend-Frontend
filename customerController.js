const Customer = require("../models/Customer");

exports.getAllCustomer = (req,res)=>{

    Customer.getAll((err,result)=>{

        if(err){
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.getCustomerById = (req,res)=>{

    Customer.getById(
        req.params.id,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json(result);

        }
    );

};

exports.createCustomer = (req,res)=>{

    Customer.create(
        req.body,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                success:true,
                message:"Customer added successfully"
            });

        }
    );

};

exports.updateCustomer = (req,res)=>{

    Customer.update(
        req.params.id,
        req.body,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                success:true,
                message:"Customer updated successfully"
            });

        }
    );

};

exports.deleteCustomer = (req,res)=>{

    Customer.delete(
        req.params.id,
        (err,result)=>{

            if(err){
                return res.status(500).json(err);
            }

            res.json({
                success:true,
                message:"Customer deleted successfully"
            });

        }
    );

};