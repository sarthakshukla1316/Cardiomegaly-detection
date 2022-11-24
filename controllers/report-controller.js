const reportModel = require("../models/report-model");

class ReportController {

    async addReport(req, res) {
        try {
            const report = new reportModel({
                userId: req.user._id,
                ctr: req.body.ctr,
                link: req.body.link,
                analysis: req.body.analysis,
            })
            const newReport = await report.save();
            return res.status(200).json(newReport);
        } catch(err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async fetchReports(req, res) {
        try {
            const reports = await reportModel.find({ userId: req.user._id });
            return res.status(200).json(reports);
        } catch(err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


module.exports = new ReportController();