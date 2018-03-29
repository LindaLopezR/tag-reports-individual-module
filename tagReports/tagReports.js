import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { LeanCards } from 'meteor/igoandsee:lean-cards-collection';
import { TagCategories } from 'meteor/igoandsee:tag-categories-collection';
import { Locations } from 'meteor/igoandsee:locations-collection';

import moment from 'moment';

import './tagReports.html';

Template.tagReports.onCreated(function(){
	this.now = new ReactiveVar();
	this.now.set(moment().valueOf());

	this.interval = setInterval(() => {
		this.now.set(moment().valueOf());
	}, 10000);

});

Template.tagReports.events({

	'click #btnLocations'(e) {
		e.preventDefault();
		Router.go('tagListLocations');
	},

	'click #btnCategories'(e) {
		e.preventDefault();
		Router.go('tagReportCategories');
	},

});

/*
const CARD_STATUS = {
		OPEN 		: 1,
		CLOSED 	: 2,
		PENDING : 3
};
*/
Template.tagReports.helpers({

	getActiveCount() {
		let now = Template.instance().now.get();
		return LeanCards.find({status : {$ne:2}, expired: false}).count();
	},

	getClosedCount() {
		return LeanCards.find({status : 2}).count();
	},

	getExpiredCount() {
		let now = Template.instance().now.get();
		return LeanCards.find({status : {$ne:2}, expired: true}).count();
	},

	getUrgentCount() {
		let now = Template.instance().now.get();
		return LeanCards.find({status : {$ne:2}, criticalDate:{$lt:now}}).count();
	},

	getDeletedCount() {
		return LeanCards.find({enable:false}).count();
	},

	getCompliance() {
		let allCount = LeanCards.find({status : {$ne:2}}).count();
		let closedCount = LeanCards.find({status : 2}).count();
		if (allCount > 0) {
			return Math.round( (closedCount * 100) / allCount );
		}
		return 0;
	},

	getHighestLocation() {
		let object = getMaxByProperty('location');

		if (!object) {
			return {name:'----', count: '----'};
		}

		return {
			name : Locations.findOne(object.key).name,
			count : object.value
		}
	},

	getHighestCategory() {
		let object = getMaxByProperty('category');

		if (!object) {
			return {name:'----', count: '----'};
		}

		return {
			name : TagCategories.findOne(object.key).name,
			count : object.value
		}
	},

});

function getMaxByProperty(property) {

	let cursor = LeanCards.find();

	if (cursor.count() < 1) {
		return null;
	}

	let data = cursor.map(card => card[property]);
	let ocurrences = _.countBy(data);

	let keys = Object.keys(ocurrences);
	let object = {
		key : keys[0],
		value : ocurrences[keys[0]]
	};

	keys.forEach((key) => {
		if (ocurrences[key] > object.value) {
			object = {
				key : key,
				value : object.value
			}
		}
	});

	return object;
}
