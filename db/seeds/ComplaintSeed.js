'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.ComplaintSeed = void 0;
var Votes_1 = require('../../src/entity/Votes');
var Complaint_1 = require('../../src/entity/Complaint');
var complaintData_1 = require('./complaintData');
var voteData_1 = require('./voteData');
var ComplaintSeed = /** @class */ (function () {
	function ComplaintSeed() {}
	ComplaintSeed.prototype.seedDatabase = function () {
		var complaints = [];
		var votes = [];
		voteData_1.voteData.forEach(function (data) {
			var vote = new Votes_1.Votes();
			vote.complaintId = data.complaintId;
			vote.typeVote = data.typeVote;
			vote.userId = data.userId;
			votes.push(vote);
		});
		complaintData_1.jsonData.forEach(function (data) {
			var complaint = new Complaint_1.Complaint();
			complaint.latitude = data.latitude;
			complaint.longitude = data.longitude;
			complaint.status = data.status;
			complaint.picture = data.picture;
			complaint.category = data.category;
			complaint.closeDate = data.closeDate;
			complaint.creationDate = data.creationDate;
			complaint.name = data.name;
			complaint.description = data.description;
			complaint.userId = data.userId;
			complaints.push(complaint);
		});
		return { complaints: complaints, votes: votes };
	};
	return ComplaintSeed;
})();
exports.ComplaintSeed = ComplaintSeed;
//# sourceMappingURL=ComplaintSeed.js.map
